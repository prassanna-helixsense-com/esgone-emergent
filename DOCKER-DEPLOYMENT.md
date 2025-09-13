# 🚀 ESGone Platform - Complete Docker Deployment Guide

## 📋 Quick Start Commands

### 🏁 One-Command Setup (Recommended)
```bash
# Clone the repository
git clone <your-repo-url>
cd esgone-platform

# Run the automated setup script
chmod +x scripts/setup-docker.sh
./scripts/setup-docker.sh
```

### 🛠️ Manual Setup
```bash
# 1. Build and start services
docker-compose up -d --build

# 2. Check service status
docker-compose ps

# 3. View logs
docker-compose logs -f
```

### 🔧 Development Mode
```bash
# Start development environment with live reload
chmod +x scripts/docker-dev.sh
./scripts/docker-dev.sh
```

### 🧪 Run Tests
```bash
# Test all services and functionality
chmod +x scripts/test-docker.sh
./scripts/test-docker.sh
```

## 📦 What Gets Deployed

### Services Overview
| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| **MongoDB** | mongo:7.0 | 27017 | Database storage |
| **Backend** | Custom FastAPI | 8001 | API server |
| **Frontend** | Custom React + Nginx | 3000 | Web application |
| **Mongo Express** | mongo-express | 8081 | Database admin UI |

### Networking
- All services communicate via `esgone_network` bridge network
- Frontend proxies `/api/*` requests to backend
- Persistent volumes for MongoDB data

## 🌐 Access Points

After successful deployment:

| Service | URL | Credentials |
|---------|-----|-------------|
| **ESGone App** | http://localhost:3000 | admin@esgone.ai / Welcome#1 |
| **API Docs** | http://localhost:8001/docs | Same as above |
| **API Root** | http://localhost:8001/api/ | - |
| **MongoDB Admin** | http://localhost:8081 | admin / admin123 |

## 📁 Project Structure

```
esgone-platform/
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration
├── mongo-init.js               # Database initialization
├── .dockerignore               # Docker ignore patterns
├── scripts/
│   ├── setup-docker.sh         # Automated setup script
│   ├── docker-dev.sh          # Development setup
│   └── test-docker.sh          # Testing script
├── backend/
│   ├── Dockerfile              # Backend container config
│   ├── server.py               # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── .dockerignore          # Backend ignore patterns
└── frontend/
    ├── Dockerfile              # Production frontend config
    ├── Dockerfile.dev          # Development frontend config
    ├── nginx.conf              # Nginx configuration
    ├── package.json            # Node.js dependencies
    └── .dockerignore          # Frontend ignore patterns
```

## 🔧 Configuration Options

### Environment Variables

#### Backend Configuration
```yaml
environment:
  - MONGO_URL=mongodb://esgone_admin:esgone_password_2024@mongodb:27017/esgone_platform?authSource=admin
  - DB_NAME=esgone_platform
  - JWT_SECRET=your-super-secret-jwt-key-for-production-change-this
  - ENVIRONMENT=docker
```

#### Frontend Configuration
```yaml
environment:
  - REACT_APP_BACKEND_URL=http://localhost:8001
  - NODE_ENV=production
```

### Customizing Ports
Edit `docker-compose.yml` to change ports:
```yaml
services:
  frontend:
    ports:
      - "8080:80"  # Change from default 3000 to 8080
  backend:
    ports:
      - "8002:8001"  # Change from default 8001 to 8002
```

## 🔐 Security Configuration

### Production Security Checklist

1. **Change Default Passwords**
   ```yaml
   environment:
     MONGO_INITDB_ROOT_USERNAME: your_secure_username
     MONGO_INITDB_ROOT_PASSWORD: your_secure_password
     JWT_SECRET: your-256-bit-secret-key
   ```

2. **Use Environment Files**
   ```bash
   # Create .env file
   cat > .env << EOF
   MONGO_USERNAME=your_secure_username
   MONGO_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret
   EOF
   
   # Reference in docker-compose.yml
   environment:
     - MONGO_URL=mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongodb:27017/esgone_platform?authSource=admin
   ```

3. **Enable SSL/HTTPS** (for production)
   ```yaml
   frontend:
     volumes:
       - ./ssl:/etc/nginx/ssl:ro
   ```

### Network Security
```yaml
networks:
  esgone_network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

## 📊 Monitoring & Logging

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Last 100 lines
docker-compose logs --tail=100 -f
```

### Monitor Resources
```bash
# Real-time resource usage
docker stats

# Service health status
docker-compose ps

# Individual container health
docker inspect --format='{{.State.Health.Status}}' esgone_backend
```

### Log Management
```yaml
# Add to docker-compose.yml for log rotation
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## 🚀 Deployment Scenarios

### 1. Local Development
```bash
# Use development setup with live reload
docker-compose -f docker-compose.dev.yml up -d
```

### 2. Production Deployment
```bash
# Use production setup with optimized builds
docker-compose up -d --build
```

### 3. CI/CD Pipeline
```bash
# Build and tag images
docker build -t esgone/backend:latest ./backend
docker build -t esgone/frontend:latest ./frontend

# Push to registry
docker push esgone/backend:latest
docker push esgone/frontend:latest

# Deploy from registry
docker-compose pull
docker-compose up -d
```

### 4. Cloud Deployment

#### AWS ECS
```bash
# Install ECS CLI
ecs-cli configure --cluster esgone-cluster --region us-west-2

# Deploy
ecs-cli compose up --create-log-groups
```

#### Google Cloud Run
```bash
# Build and push
docker build -t gcr.io/your-project/esgone-backend ./backend
docker push gcr.io/your-project/esgone-backend

# Deploy
gcloud run deploy esgone-backend --image gcr.io/your-project/esgone-backend
```

## 🛠️ Maintenance Tasks

### Regular Maintenance
```bash
# Update images
docker-compose pull
docker-compose up -d

# Clean up unused resources
docker system prune -f

# Backup database
docker-compose exec mongodb mongodump --out=/data/backup/$(date +%Y%m%d)
```

### Troubleshooting
```bash
# Reset everything
docker-compose down -v
docker system prune -a -f
docker-compose up -d --build

# Check container status
docker-compose ps -a

# Inspect specific container
docker inspect esgone_backend

# Execute commands in container
docker-compose exec backend bash
docker-compose exec mongodb mongosh
```

### Database Backup & Restore
```bash
# Backup
docker-compose exec mongodb mongodump \
  --uri="mongodb://esgone_admin:esgone_password_2024@localhost:27017/esgone_platform?authSource=admin" \
  --out=/data/backup

# Restore
docker-compose exec mongodb mongorestore \
  --uri="mongodb://esgone_admin:esgone_password_2024@localhost:27017/esgone_platform?authSource=admin" \
  /data/backup/esgone_platform
```

## 🎯 Performance Optimization

### Resource Limits
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

### Scaling Services
```bash
# Scale backend horizontally
docker-compose up -d --scale backend=3

# Use load balancer (nginx) for multiple instances
```

### Caching Configuration
The nginx configuration includes:
- Static asset caching (1 year)
- Gzip compression
- Security headers

## 🏁 Success Verification

Run the test script to verify everything is working:
```bash
./scripts/test-docker.sh
```

Expected results:
- ✅ All containers healthy
- ✅ API endpoints responding
- ✅ Authentication working
- ✅ Database connected
- ✅ Frontend loading correctly

## 📞 Support & Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in docker-compose.yml
2. **Permission issues**: Run with `sudo` or fix Docker permissions
3. **Memory issues**: Increase Docker Desktop memory allocation
4. **Network issues**: Check firewall and Docker network settings

### Getting Help
1. Check logs: `docker-compose logs -f`
2. Run tests: `./scripts/test-docker.sh`
3. Review this documentation
4. Check Docker and Docker Compose versions

Happy deploying! 🐳🚀