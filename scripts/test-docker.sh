#!/bin/bash

# ESGone Platform Docker Test Script
# This script tests all Docker services and functionality

set -e

echo "🧪 ESGone Platform Docker Testing"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_test() {
    echo -e "${BLUE}[TEST]${NC} $1"
}

print_pass() {
    echo -e "${GREEN}[PASS]${NC} $1"
}

print_fail() {
    echo -e "${RED}[FAIL]${NC} $1"
}

test_count=0
pass_count=0
fail_count=0

# Function to run test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_pattern="$3"
    
    test_count=$((test_count + 1))
    print_test "$test_name"
    
    if result=$(eval "$test_command" 2>&1); then
        if [[ -z "$expected_pattern" ]] || echo "$result" | grep -q "$expected_pattern"; then
            print_pass "$test_name"
            pass_count=$((pass_count + 1))
            return 0
        else
            print_fail "$test_name - Expected pattern not found: $expected_pattern"
            echo "Got: $result"
            fail_count=$((fail_count + 1))
            return 1
        fi
    else
        print_fail "$test_name - Command failed: $result"
        fail_count=$((fail_count + 1))
        return 1
    fi
}

# Test Docker and Docker Compose
run_test "Docker installed" "docker --version" "Docker version"
run_test "Docker Compose installed" "docker-compose --version" "docker-compose version"
run_test "Docker daemon running" "docker info" ""

# Test if services are running
run_test "MongoDB container running" "docker-compose ps mongodb | grep -c Up" "1"
run_test "Backend container running" "docker-compose ps backend | grep -c Up" "1"  
run_test "Frontend container running" "docker-compose ps frontend | grep -c Up" "1"

# Test service health
run_test "MongoDB health check" "docker inspect --format='{{.State.Health.Status}}' esgone_mongodb" "healthy"
run_test "Backend health check" "docker inspect --format='{{.State.Health.Status}}' esgone_backend" "healthy"
run_test "Frontend health check" "docker inspect --format='{{.State.Health.Status}}' esgone_frontend" "healthy"

# Test API endpoints
run_test "Backend API root endpoint" "curl -f -s http://localhost:8001/api/" "Hello World"
run_test "Backend API docs accessible" "curl -f -s -o /dev/null -w '%{http_code}' http://localhost:8001/docs" "200"
run_test "Frontend loading" "curl -f -s -o /dev/null -w '%{http_code}' http://localhost:3000/" "200"

# Test authentication
print_test "Testing authentication..."
auth_response=$(curl -s -X POST "http://localhost:8001/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@esgone.ai","password":"Welcome#1"}' || echo "failed")

if [[ $auth_response == *"access_token"* ]]; then
    print_pass "Authentication works"
    pass_count=$((pass_count + 1))
    
    # Extract token for further testing
    token=$(echo "$auth_response" | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
    
    # Test protected endpoints
    run_test "Dashboard API (protected)" "curl -f -s -H 'Authorization: Bearer $token' http://localhost:8001/api/dashboard/summary" "total_repair_cost"
    run_test "Assets API (protected)" "curl -f -s -H 'Authorization: Bearer $token' http://localhost:8001/api/assets" "\[\]"
else
    print_fail "Authentication failed"
    fail_count=$((fail_count + 1))
fi

test_count=$((test_count + 1))

# Test MongoDB connection
print_test "Testing MongoDB connection..."
if docker-compose exec -T mongodb mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    print_pass "MongoDB connection works"
    pass_count=$((pass_count + 1))
else
    print_fail "MongoDB connection failed"
    fail_count=$((fail_count + 1))
fi
test_count=$((test_count + 1))

# Test Mongo Express
run_test "Mongo Express accessible" "curl -f -s -o /dev/null -w '%{http_code}' http://localhost:8081/" "200"

# Test container logs (check for errors)
print_test "Checking container logs for errors..."
backend_errors=$(docker-compose logs backend 2>&1 | grep -i "error\|exception\|failed" | wc -l)
frontend_errors=$(docker-compose logs frontend 2>&1 | grep -i "error\|exception\|failed" | wc -l)

if [ "$backend_errors" -eq 0 ] && [ "$frontend_errors" -eq 0 ]; then
    print_pass "No critical errors in logs"
    pass_count=$((pass_count + 1))
else
    print_fail "Found errors in logs - Backend: $backend_errors, Frontend: $frontend_errors"
    fail_count=$((fail_count + 1))
fi
test_count=$((test_count + 1))

# Test resource usage
print_test "Checking resource usage..."
memory_usage=$(docker stats --no-stream --format "{{.MemUsage}}" | head -3 | cut -d'/' -f1 | sed 's/MiB//' | awk '{sum+=$1} END {print sum}')
if [ "${memory_usage%.*}" -lt 2000 ]; then
    print_pass "Memory usage is reasonable (${memory_usage}MiB)"
    pass_count=$((pass_count + 1))
else
    print_fail "High memory usage: ${memory_usage}MiB"
    fail_count=$((fail_count + 1))
fi
test_count=$((test_count + 1))

# Summary
echo ""
echo "==============================="
echo "🏁 Test Results Summary"
echo "==============================="
echo "Total Tests: $test_count"
echo "Passed: $pass_count"
echo "Failed: $fail_count"
echo ""

if [ $fail_count -eq 0 ]; then
    echo "🎉 All tests passed! ESGone Platform is working correctly."
    echo ""
    echo "✅ Services Status:"
    docker-compose ps
    echo ""
    echo "📊 Resource Usage:"
    docker stats --no-stream
    exit 0
else
    echo "❌ Some tests failed. Please check the output above."
    echo ""
    echo "🔍 Debugging Information:"
    echo "Service Status:"
    docker-compose ps
    echo ""
    echo "Recent Logs (last 10 lines):"
    docker-compose logs --tail=10
    exit 1
fi