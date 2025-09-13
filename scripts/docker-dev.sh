#!/bin/bash

# ESGone Platform Development Docker Script
# This script sets up the development environment with live reload

set -e

echo "🚀 ESGone Platform Development Setup"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Stop production services if running
print_step "Stopping production services..."
docker-compose down 2>/dev/null || true

# Start development services
print_step "Starting development services with live reload..."
docker-compose -f docker-compose.dev.yml down -v 2>/dev/null || true
docker-compose -f docker-compose.dev.yml build --no-cache
docker-compose -f docker-compose.dev.yml up -d

print_step "Waiting for services to be ready..."
sleep 15

# Check service status
print_step "Checking service status..."
docker-compose -f docker-compose.dev.yml ps

print_status "Development environment ready! 🎉"
echo ""
echo "==============================="
echo "🛠️  Development Environment"
echo "==============================="
echo ""
echo "📍 Access Points:"
echo "   • Frontend (Dev):  http://localhost:3000"
echo "   • Backend (Dev):   http://localhost:8001" 
echo "   • API Docs:        http://localhost:8001/docs"
echo "   • MongoDB Admin:   http://localhost:8081"
echo ""
echo "🔄 Live Reload Features:"
echo "   • Frontend: Changes auto-refresh browser"
echo "   • Backend:  API restarts on code changes"
echo "   • Hot reload enabled for rapid development"
echo ""
echo "📋 Development Commands:"
echo "   • View logs:     docker-compose -f docker-compose.dev.yml logs -f"
echo "   • Stop dev:      docker-compose -f docker-compose.dev.yml down"
echo "   • Restart:       docker-compose -f docker-compose.dev.yml restart"
echo "   • Shell access:  docker-compose -f docker-compose.dev.yml exec backend bash"
echo ""
print_status "Happy developing! 💻"