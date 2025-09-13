# ESGone Platform - API Contracts & Integration Plan

## Overview
Full-stack ESG (Environmental, Social, Governance) platform with comprehensive tracking, monitoring, and reporting capabilities.

## API Contracts

### Authentication Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration  
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Dashboard Endpoints
- `GET /api/dashboard/summary` - Portfolio summary with CO2 impact analysis
- `GET /api/dashboard/metrics` - Key ESG performance metrics
- `GET /api/dashboard/alerts` - Recent alerts and notifications

### Planning Endpoints
- `GET /api/planning/goals` - Sustainability goals and targets
- `POST /api/planning/goals` - Create new sustainability goal
- `PUT /api/planning/goals/:id` - Update goal progress
- `GET /api/planning/milestones` - Upcoming milestones
- `GET /api/planning/projects` - Active planning projects

### Implementation Endpoints  
- `GET /api/implementation/projects` - All implementation projects
- `POST /api/implementation/projects` - Create new project
- `PUT /api/implementation/projects/:id` - Update project
- `GET /api/implementation/projects/:id/progress` - Project progress details

### Monitoring Endpoints
- `GET /api/monitoring/realtime` - Real-time sensor data (energy, water, temperature, air quality)
- `GET /api/monitoring/alerts` - Active monitoring alerts
- `GET /api/monitoring/performance` - ESG performance metrics
- `GET /api/monitoring/trends` - Historical trend data

### Asset Management Endpoints
- `GET /api/assets` - All assets inventory
- `POST /api/assets` - Add new asset
- `PUT /api/assets/:id` - Update asset information
- `GET /api/assets/:id/maintenance` - Maintenance schedule
- `POST /api/assets/:id/maintenance` - Schedule maintenance
- `GET /api/assets/lifecycle` - Lifecycle analysis data

### Reporting Endpoints
- `GET /api/reports` - Available reports list
- `POST /api/reports/generate` - Generate custom report
- `GET /api/reports/:id/download` - Download report
- `GET /api/reports/compliance` - Compliance framework data
- `GET /api/reports/metrics` - Key ESG metrics for reporting

## Data Models

### User Model
```javascript
{
  id: ObjectId,
  email: String,
  name: String,
  company: String,
  role: String,
  createdAt: Date
}
```

### Asset Model
```javascript
{
  id: String,
  name: String,
  category: String,
  status: String, // operational, maintenance, critical
  condition: String, // excellent, good, fair, poor
  location: String,
  repairCost: Number,
  replacementCost: Number,
  co2Impact: Number,
  efficiency: Number,
  lastMaintenance: Date,
  nextMaintenance: Date,
  createdAt: Date
}
```

### Project Model  
```javascript
{
  id: ObjectId,
  name: String,
  description: String,
  status: String, // planning, in-progress, completed, on-hold
  priority: String, // high, medium, low
  progress: Number, // 0-100
  budget: Number,
  spent: Number,
  startDate: Date,
  endDate: Date,
  team: [String],
  category: String,
  createdAt: Date
}
```

### Monitoring Data Model
```javascript
{
  id: ObjectId,
  type: String, // energy, water, temperature, air_quality
  value: Number,
  unit: String,
  timestamp: Date,
  location: String,
  deviceId: String
}
```

### Report Model
```javascript
{
  id: ObjectId,
  name: String,
  type: String, // performance, environmental, social, governance
  framework: String, // GRI, TCFD, SASB, SDG
  frequency: String, // weekly, monthly, quarterly, annual
  status: String, // ready, generating, draft, error
  generatedAt: Date,
  data: Object,
  filePath: String
}
```

## Mock Data Integration Points

### Frontend Mock Data Currently Used:
1. **Dashboard**: Portfolio summary with repair/retrofit/replace costs, CO2 analysis
2. **Planning**: Sustainability goals, milestones, project tracking
3. **Implementation**: Project management, progress tracking, budget management
4. **Monitoring**: Real-time metrics, alerts, performance data
5. **Asset Management**: Equipment inventory, maintenance schedules, lifecycle analysis  
6. **Reporting**: Report generation, compliance frameworks, key metrics

### Backend Implementation Plan:
1. Replace mock authentication with real user management
2. Implement MongoDB collections for all data models
3. Create API endpoints matching frontend requirements
4. Add real-time data simulation for monitoring metrics
5. Implement report generation and file storage
6. Add data aggregation for dashboard summaries

## Integration Steps:
1. Update frontend to use real API endpoints instead of mock data
2. Implement error handling and loading states
3. Add data validation on both frontend and backend
4. Implement real-time updates for monitoring data
5. Add file upload/download capabilities for reports
6. Integrate authentication across all components

## Key Features to Implement:
- Real-time monitoring data simulation
- PDF report generation
- Data export functionality  
- Advanced filtering and search
- Historical data tracking
- Automated alert system
- Multi-user support with role-based access