// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the application database
db = db.getSiblingDB('esgone_platform');

// Create collections with initial indexes
db.createCollection('users');
db.createCollection('assets');
db.createCollection('projects');
db.createCollection('sustainability_goals');
db.createCollection('monitoring_data');
db.createCollection('reports');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.assets.createIndex({ "status": 1, "category": 1 });
db.projects.createIndex({ "status": 1, "priority": 1 });
db.monitoring_data.createIndex({ "timestamp": -1, "type": 1 });
db.reports.createIndex({ "framework": 1, "type": 1 });

print('ESGone Platform database initialized successfully!');