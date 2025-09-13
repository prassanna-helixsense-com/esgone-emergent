#!/bin/bash

# ESGone Platform Docker Setup Script
# This script sets up the complete Docker environment for the ESGone Platform

set -e

echo "🐳 ESGone Platform Docker Setup"
echo "==============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_status "Docker and Docker Compose found!"

# Check if Docker is running
if ! docker info &> /dev/null; then
    print_error "Docker daemon is not running. Please start Docker first."
    exit 1
fi

print_status "Docker daemon is running!"

# Create necessary directories
print_step "Creating necessary directories..."
mkdir -p data/mongodb
mkdir -p logs
mkdir -p backups

# Set permissions
chmod 755 data/mongodb

print_status "Directories created successfully!"

# Stop existing containers if running
print_step "Stopping existing containers..."
docker-compose down -v 2>/dev/null || true

# Remove existing volumes if they exist
print_step "Cleaning up existing volumes..."
docker volume rm esgone_mongodb_data 2>/dev/null || true

# Build and start services
print_step "Building and starting services..."
docker-compose build --no-cache

print_step "Starting services..."
docker-compose up -d

# Wait for services to be healthy
print_step "Waiting for services to be ready..."

# Function to wait for service
wait_for_service() {
    local service_name=$1
    local url=$2
    local max_attempts=30
    local attempt=1

    print_status "Waiting for $service_name to be ready..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "$url" > /dev/null 2>&1; then
            print_status "$service_name is ready!"
            return 0
        fi
        
        echo -n "."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name failed to start within expected time"
    return 1
}

# Wait for MongoDB
print_status "Waiting for MongoDB to be ready..."
sleep 10

# Wait for Backend API
wait_for_service "Backend API" "http://localhost:8001/api/"

# Wait for Frontend
wait_for_service "Frontend" "http://localhost:3000/"

# Create admin user and initialize sample data
print_step "Initializing admin user and sample data..."

# Wait a bit more for backend to fully initialize
sleep 5

# Test if we can connect to the API
if curl -f -s "http://localhost:8001/api/" > /dev/null; then
    print_status "Backend API is responding!"
    
    # Create admin user via API (if registration is open) or direct database insertion
    print_status "Creating admin user..."
    
    # Try to register admin user via API
    admin_response=$(curl -s -X POST "http://localhost:8001/api/auth/register" \
        -H "Content-Type: application/json" \
        -d '{
            "email": "admin@esgone.ai",
            "password": "Welcome#1", 
            "name": "ESGone Administrator",
            "company": "ESGone Platform"
        }' || echo "failed")
    
    if [[ $admin_response == *"access_token"* ]]; then
        print_status "Admin user created successfully via API!"
    else
        print_warning "Admin user might already exist or API registration failed. This is normal if running setup multiple times."
    fi
else
    print_error "Backend API is not responding. Please check the logs."
    docker-compose logs backend
    exit 1
fi

# Display service status
print_step "Checking service status..."
docker-compose ps

print_status "Setup completed successfully! 🎉"
echo ""
echo "==============================="
echo "🌟 ESGone Platform is Ready!"
echo "==============================="
echo ""
echo "📍 Access Points:"
echo "   • Frontend:      http://localhost:3000"
echo "   • Backend API:   http://localhost:8001" 
echo "   • API Docs:      http://localhost:8001/docs"
echo "   • MongoDB Admin: http://localhost:8081"
echo ""
echo "🔑 Login Credentials:"
echo "   • Email:    admin@esgone.ai"
echo "   • Password: Welcome#1"
echo ""
echo "🛠️  MongoDB Admin (Mongo Express):"
echo "   • Username: admin"
echo "   • Password: admin123"
echo ""
echo "📋 Useful Commands:"
echo "   • View logs:     docker-compose logs -f"
echo "   • Stop services: docker-compose down"
echo "   • Restart:       docker-compose restart"
echo ""
print_status "Happy ESG monitoring! 🌱"