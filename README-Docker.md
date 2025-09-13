# 🐳 ESGone Platform - Docker Setup Guide

Complete Docker setup for the ESGone ESG Platform with MongoDB, FastAPI backend, and React frontend.

## 📋 Prerequisites

- **Docker** (v20.10 or higher) - [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose** (v2.0 or higher) - Usually included with Docker Desktop
- **Git** - [Install Git](https://git-scm.com/)
- **8GB+ RAM** recommended for optimal performance

## 🚀 Quick Start (Production)

### 1. Clone and Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd esgone-platform

# Make setup script executable
chmod +x scripts/setup-docker.sh
chmod +x scripts/docker-dev.sh

# Run the setup (creates admin user and initializes data)
./scripts/setup-docker.sh
```

### 2. Start All Services
```bash
# Start in production mode
docker-compose up -d

# Check service status
docker-compose ps
```

### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8001
- **MongoDB Admin**: http://localhost:8081 (admin/admin123)
- **API Docs**: http://localhost:8001/docs

### 4. Login Credentials
- **Email**: admin@esgone.ai
- **Password**: Welcome#1

## 🔧 Development Setup

For development with live reload:

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Follow logs
docker-compose -f docker-compose.dev.yml logs -f
```

## 📊 Service Overview

| Service | Container Name | Port | Description |
|---------|---------------|------|-------------|
| MongoDB | esgone_mongodb | 27017 | Database |
| Backend | esgone_backend | 8001 | FastAPI Server |
| Frontend | esgone_frontend | 3000→80 | React App |
| Mongo Express | esgone_mongo_express | 8081 | DB Admin UI |

## 🛠️ Docker Commands

### Basic Operations
```bash
# Start all services
docker-compose up -d

# Stop all services  
docker-compose down

# Restart specific service
docker-compose restart backend

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Execute commands in containers
docker-compose exec backend bash
docker-compose exec mongodb mongosh
```

### Development Commands
```bash
# Development mode (with live reload)
docker-compose -f docker-compose.dev.yml up -d

# Rebuild services after code changes
docker-compose build --no-cache

# Remove everything and start fresh
docker-compose down -v
docker system prune -f
docker-compose up -d
```

### Database Operations
```bash
# Access MongoDB shell
docker-compose exec mongodb mongosh -u esgone_admin -p esgone_password_2024

# Backup database
docker-compose exec mongodb mongodump --uri="mongodb://esgone_admin:esgone_password_2024@localhost:27017/esgone_platform?authSource=admin"

# Restore database
docker-compose exec mongodb mongorestore --uri="mongodb://esgone_admin:esgone_password_2024@localhost:27017/esgone_platform?authSource=admin" /dump
```

## 🔍 Health Checks & Monitoring

### Check Service Health
```bash
# Check all services status
docker-compose ps

# Check individual service health
docker inspect --format='{{.State.Health.Status}}' esgone_backend
docker inspect --format='{{.State.Health.Status}}' esgone_frontend
docker inspect --format='{{.State.Health.Status}}' esgone_mongodb
```

### Monitor Resources
```bash
# Monitor resource usage
docker stats

# Check container logs
docker-compose logs --tail=50 -f
```

## 🌐 Environment Configuration

### Production Environment Variables
Edit `docker-compose.yml` to customize:

```yaml
environment:
  - MONGO_URL=mongodb://esgone_admin:esgone_password_2024@mongodb:27017/esgone_platform?authSource=admin
  - DB_NAME=esgone_platform
  - JWT_SECRET=your-super-secret-jwt-key-for-production-change-this
  - REACT_APP_BACKEND_URL=http://localhost:8001
```

### Security Considerations for Production
1. **Change default passwords** in docker-compose.yml
2. **Use environment files** for sensitive data
3. **Enable SSL/TLS** with proper certificates
4. **Configure firewall** rules
5. **Use Docker secrets** for production deployments

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find and kill process using port
lsof -ti:3000 | xargs kill -9
lsof -ti:8001 | xargs kill -9
lsof -ti:27017 | xargs kill -9

# Or use different ports in docker-compose.yml
```

#### 2. MongoDB Connection Issues
```bash
# Check MongoDB logs
docker-compose logs mongodb

# Test connection
docker-compose exec backend python -c "from motor.motor_asyncio import AsyncIOMotorClient; import asyncio; asyncio.run(AsyncIOMotorClient('mongodb://esgone_admin:esgone_password_2024@mongodb:27017').admin.command('ping'))"
```

#### 3. Frontend Not Loading
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose build frontend --no-cache
docker-compose up -d frontend
```

#### 4. Backend API Errors
```bash
# Check backend logs
docker-compose logs backend

# Test API directly
curl http://localhost:8001/api/

# Check if backend container is running
docker-compose ps backend
```

### Reset Everything
```bash
# Nuclear option - remove everything and start fresh
docker-compose down -v
docker system prune -a -f
docker volume prune -f
docker-compose up -d --build
```

## 📈 Performance Optimization

### Production Optimizations
1. **Multi-stage builds** (already implemented)
2. **Nginx caching** (configured in nginx.conf)
3. **MongoDB indexes** (created via mongo-init.js)
4. **Health checks** for all services
5. **Resource limits** (can be added to docker-compose.yml)

### Add Resource Limits
```yaml
services:
  backend:
    # ... other config
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

## 🚢 Deployment Options

### Docker Swarm
```bash
docker swarm init
docker stack deploy -c docker-compose.yml esgone
```

### Kubernetes
```bash
# Convert docker-compose to k8s (using kompose)
kompose convert
kubectl apply -f .
```

### Cloud Deployment
- **AWS**: ECS with Fargate
- **Google Cloud**: Cloud Run or GKE
- **Azure**: Container Instances or AKS
- **DigitalOcean**: App Platform or Kubernetes

## 📋 Maintenance

### Regular Maintenance Tasks
```bash
# Update images
docker-compose pull
docker-compose up -d

# Clean up unused resources
docker system prune -f

# Backup database
docker-compose exec mongodb mongodump --out=/data/backup

# Monitor disk usage
docker system df
```

### Scaling Services
```bash
# Scale backend service
docker-compose up -d --scale backend=3

# Scale frontend service  
docker-compose up -d --scale frontend=2
```

## 🎯 Success Verification

After starting the services, verify everything works:

1. ✅ **Frontend loads**: http://localhost:3000
2. ✅ **Login works**: admin@esgone.ai / Welcome#1  
3. ✅ **API responds**: http://localhost:8001/api/
4. ✅ **Database accessible**: http://localhost:8081
5. ✅ **All containers healthy**: `docker-compose ps`

## 📞 Support

If you encounter issues:
1. Check the logs: `docker-compose logs -f`
2. Verify health checks: `docker-compose ps`
3. Test individual services: `curl http://localhost:8001/api/`
4. Review the troubleshooting section above

Happy containerizing! 🐳🚀