#!/usr/bin/env python3
"""
ESGone Platform Backend API Testing Suite
Tests all backend endpoints for authentication, dashboard, assets, planning, monitoring, and reporting
"""

import requests
import json
import uuid
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE_URL}")

class ESGoneAPITester:
    def __init__(self):
        self.session = requests.Session()
        self.auth_token = None
        self.test_results = {
            'authentication': {'passed': 0, 'failed': 0, 'details': []},
            'dashboard': {'passed': 0, 'failed': 0, 'details': []},
            'assets': {'passed': 0, 'failed': 0, 'details': []},
            'planning': {'passed': 0, 'failed': 0, 'details': []},
            'monitoring': {'passed': 0, 'failed': 0, 'details': []},
            'reporting': {'passed': 0, 'failed': 0, 'details': []},
            'data_integration': {'passed': 0, 'failed': 0, 'details': []}
        }
    
    def log_test(self, category, test_name, passed, details=""):
        """Log test results"""
        if passed:
            self.test_results[category]['passed'] += 1
            status = "✅ PASS"
        else:
            self.test_results[category]['failed'] += 1
            status = "❌ FAIL"
        
        self.test_results[category]['details'].append(f"{status}: {test_name} - {details}")
        print(f"{status}: {test_name} - {details}")
    
    def test_authentication(self):
        """Test authentication endpoints"""
        print("\n=== TESTING AUTHENTICATION ===")
        
        # Test 1: Register a new user
        try:
            register_data = {
                "email": "sarah.johnson@greentech.com",
                "password": "SecurePass123!",
                "name": "Sarah Johnson",
                "company": "GreenTech Solutions"
            }
            
            response = self.session.post(f"{API_BASE_URL}/auth/register", json=register_data)
            if response.status_code == 200:
                data = response.json()
                if 'access_token' in data and 'user' in data:
                    self.log_test('authentication', 'User Registration', True, 
                                f"Successfully registered user {data['user']['name']}")
                else:
                    self.log_test('authentication', 'User Registration', False, 
                                "Missing access_token or user in response")
            else:
                # User might already exist, try with different email
                register_data['email'] = f"test.user.{uuid.uuid4().hex[:8]}@esgone.com"
                response = self.session.post(f"{API_BASE_URL}/auth/register", json=register_data)
                if response.status_code == 200:
                    self.log_test('authentication', 'User Registration', True, 
                                "Successfully registered new user")
                else:
                    self.log_test('authentication', 'User Registration', False, 
                                f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('authentication', 'User Registration', False, f"Exception: {str(e)}")
        
        # Test 2: Login with admin credentials
        try:
            login_data = {
                "email": "admin@esgone.ai",
                "password": "Welcome#1"
            }
            
            response = self.session.post(f"{API_BASE_URL}/auth/login", json=login_data)
            if response.status_code == 200:
                data = response.json()
                if 'access_token' in data:
                    self.auth_token = data['access_token']
                    self.session.headers.update({'Authorization': f'Bearer {self.auth_token}'})
                    self.log_test('authentication', 'Admin Login', True, 
                                f"Successfully logged in as {data['user']['email']}")
                else:
                    self.log_test('authentication', 'Admin Login', False, 
                                "Missing access_token in response")
            else:
                self.log_test('authentication', 'Admin Login', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('authentication', 'Admin Login', False, f"Exception: {str(e)}")
        
        # Test 3: Test protected route without authentication
        try:
            temp_session = requests.Session()  # No auth headers
            response = temp_session.get(f"{API_BASE_URL}/dashboard/summary")
            if response.status_code == 401:
                self.log_test('authentication', 'Protected Route Security', True, 
                            "Correctly rejected unauthenticated request")
            else:
                self.log_test('authentication', 'Protected Route Security', False, 
                            f"Should return 401, got {response.status_code}")
        except Exception as e:
            self.log_test('authentication', 'Protected Route Security', False, f"Exception: {str(e)}")
    
    def test_dashboard(self):
        """Test dashboard endpoints"""
        print("\n=== TESTING DASHBOARD ===")
        
        if not self.auth_token:
            self.log_test('dashboard', 'Dashboard Summary', False, "No auth token available")
            return
        
        # Test dashboard summary
        try:
            response = self.session.get(f"{API_BASE_URL}/dashboard/summary")
            if response.status_code == 200:
                data = response.json()
                required_fields = ['total_repair_cost', 'total_replacement_cost', 'total_co2_avoided', 
                                 'assets_count', 'operational_assets', 'maintenance_assets', 'critical_assets']
                
                missing_fields = [field for field in required_fields if field not in data]
                if not missing_fields:
                    # Verify calculations make sense
                    if (data['total_repair_cost'] > 0 and data['total_replacement_cost'] > 0 and 
                        data['assets_count'] > 0):
                        self.log_test('dashboard', 'Dashboard Summary', True, 
                                    f"Assets: {data['assets_count']}, Repair: ${data['total_repair_cost']:,.2f}, "
                                    f"Replacement: ${data['total_replacement_cost']:,.2f}")
                    else:
                        self.log_test('dashboard', 'Dashboard Summary', False, 
                                    "Invalid calculation values (zeros or negatives)")
                else:
                    self.log_test('dashboard', 'Dashboard Summary', False, 
                                f"Missing fields: {missing_fields}")
            else:
                self.log_test('dashboard', 'Dashboard Summary', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('dashboard', 'Dashboard Summary', False, f"Exception: {str(e)}")
    
    def test_assets(self):
        """Test asset management endpoints"""
        print("\n=== TESTING ASSET MANAGEMENT ===")
        
        if not self.auth_token:
            self.log_test('assets', 'Asset Management', False, "No auth token available")
            return
        
        # Test 1: Get all assets
        try:
            response = self.session.get(f"{API_BASE_URL}/assets")
            if response.status_code == 200:
                assets = response.json()
                if isinstance(assets, list) and len(assets) > 0:
                    # Verify asset structure
                    asset = assets[0]
                    required_fields = ['_id', 'name', 'category', 'status', 'condition', 
                                     'location', 'repair_cost', 'replacement_cost', 'co2_impact']
                    missing_fields = [field for field in required_fields if field not in asset]
                    
                    if not missing_fields:
                        self.log_test('assets', 'Get Assets', True, 
                                    f"Retrieved {len(assets)} assets with correct structure")
                    else:
                        self.log_test('assets', 'Get Assets', False, 
                                    f"Asset missing fields: {missing_fields}")
                else:
                    self.log_test('assets', 'Get Assets', False, "No assets returned or invalid format")
            else:
                self.log_test('assets', 'Get Assets', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('assets', 'Get Assets', False, f"Exception: {str(e)}")
        
        # Test 2: Create new asset
        try:
            new_asset = {
                "id": f"TEST-{uuid.uuid4().hex[:8].upper()}",
                "name": "Solar Panel Array - Building D",
                "category": "Renewable Energy",
                "status": "operational",
                "condition": "excellent",
                "location": "Building D - Rooftop",
                "repair_cost": 5000.0,
                "replacement_cost": 45000.0,
                "co2_impact": 15000.0,
                "efficiency": 92,
                "last_maintenance": "2024-01-01",
                "next_maintenance": "2024-07-01"
            }
            
            response = self.session.post(f"{API_BASE_URL}/assets", json=new_asset)
            if response.status_code == 200:
                data = response.json()
                if 'id' in data:
                    self.log_test('assets', 'Create Asset', True, 
                                f"Successfully created asset: {new_asset['name']}")
                    
                    # Test 3: Update the created asset
                    updated_asset = new_asset.copy()
                    updated_asset['status'] = 'maintenance'
                    updated_asset['condition'] = 'good'
                    
                    update_response = self.session.put(f"{API_BASE_URL}/assets/{new_asset['id']}", 
                                                     json=updated_asset)
                    if update_response.status_code == 200:
                        self.log_test('assets', 'Update Asset', True, 
                                    f"Successfully updated asset status to maintenance")
                    else:
                        self.log_test('assets', 'Update Asset', False, 
                                    f"Update failed: {update_response.status_code}")
                else:
                    self.log_test('assets', 'Create Asset', False, "No ID returned in response")
            else:
                self.log_test('assets', 'Create Asset', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('assets', 'Create Asset', False, f"Exception: {str(e)}")
    
    def test_planning(self):
        """Test planning/sustainability goals endpoints"""
        print("\n=== TESTING PLANNING ===")
        
        if not self.auth_token:
            self.log_test('planning', 'Planning Goals', False, "No auth token available")
            return
        
        # Test 1: Get sustainability goals
        try:
            response = self.session.get(f"{API_BASE_URL}/planning/goals")
            if response.status_code == 200:
                goals = response.json()
                if isinstance(goals, list) and len(goals) > 0:
                    goal = goals[0]
                    required_fields = ['_id', 'title', 'target', 'progress', 'status', 'description']
                    missing_fields = [field for field in required_fields if field not in goal]
                    
                    if not missing_fields:
                        self.log_test('planning', 'Get Goals', True, 
                                    f"Retrieved {len(goals)} sustainability goals")
                    else:
                        self.log_test('planning', 'Get Goals', False, 
                                    f"Goal missing fields: {missing_fields}")
                else:
                    self.log_test('planning', 'Get Goals', False, "No goals returned")
            else:
                self.log_test('planning', 'Get Goals', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('planning', 'Get Goals', False, f"Exception: {str(e)}")
        
        # Test 2: Create new sustainability goal
        try:
            new_goal = {
                "id": str(uuid.uuid4()),
                "title": "Water Conservation Initiative",
                "target": "2024",
                "progress": 45,
                "status": "on-track",
                "description": "Reduce water consumption by 30% through smart irrigation and recycling",
                "metrics": [
                    {"name": "Water Usage Reduction", "value": 45, "target": 30},
                    {"name": "Recycling Rate", "value": 65, "target": 80}
                ]
            }
            
            response = self.session.post(f"{API_BASE_URL}/planning/goals", json=new_goal)
            if response.status_code == 200:
                data = response.json()
                if 'id' in data:
                    self.log_test('planning', 'Create Goal', True, 
                                f"Successfully created goal: {new_goal['title']}")
                else:
                    self.log_test('planning', 'Create Goal', False, "No ID returned")
            else:
                self.log_test('planning', 'Create Goal', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('planning', 'Create Goal', False, f"Exception: {str(e)}")
    
    def test_monitoring(self):
        """Test monitoring endpoints"""
        print("\n=== TESTING MONITORING ===")
        
        if not self.auth_token:
            self.log_test('monitoring', 'Monitoring Data', False, "No auth token available")
            return
        
        # Test 1: Get real-time data
        try:
            response = self.session.get(f"{API_BASE_URL}/monitoring/realtime")
            if response.status_code == 200:
                data = response.json()
                required_metrics = ['energy_consumption', 'water_usage', 'temperature', 'air_quality']
                missing_metrics = [metric for metric in required_metrics if metric not in data]
                
                if not missing_metrics:
                    # Verify each metric has required fields
                    valid_metrics = True
                    for metric_name, metric_data in data.items():
                        if not all(field in metric_data for field in ['current', 'unit', 'change', 'status']):
                            valid_metrics = False
                            break
                    
                    if valid_metrics:
                        self.log_test('monitoring', 'Real-time Data', True, 
                                    f"All metrics present with valid structure")
                    else:
                        self.log_test('monitoring', 'Real-time Data', False, 
                                    "Some metrics missing required fields")
                else:
                    self.log_test('monitoring', 'Real-time Data', False, 
                                f"Missing metrics: {missing_metrics}")
            else:
                self.log_test('monitoring', 'Real-time Data', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('monitoring', 'Real-time Data', False, f"Exception: {str(e)}")
        
        # Test 2: Get alerts
        try:
            response = self.session.get(f"{API_BASE_URL}/monitoring/alerts")
            if response.status_code == 200:
                alerts = response.json()
                if isinstance(alerts, list):
                    if len(alerts) > 0:
                        alert = alerts[0]
                        required_fields = ['id', 'type', 'message', 'timestamp', 'severity']
                        missing_fields = [field for field in required_fields if field not in alert]
                        
                        if not missing_fields:
                            self.log_test('monitoring', 'Alerts', True, 
                                        f"Retrieved {len(alerts)} alerts with correct structure")
                        else:
                            self.log_test('monitoring', 'Alerts', False, 
                                        f"Alert missing fields: {missing_fields}")
                    else:
                        self.log_test('monitoring', 'Alerts', True, "No alerts (system healthy)")
                else:
                    self.log_test('monitoring', 'Alerts', False, "Invalid alerts format")
            else:
                self.log_test('monitoring', 'Alerts', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('monitoring', 'Alerts', False, f"Exception: {str(e)}")
    
    def test_reporting(self):
        """Test reporting endpoints"""
        print("\n=== TESTING REPORTING ===")
        
        if not self.auth_token:
            self.log_test('reporting', 'Reporting', False, "No auth token available")
            return
        
        # Test 1: Get existing reports
        try:
            response = self.session.get(f"{API_BASE_URL}/reports")
            if response.status_code == 200:
                reports = response.json()
                if isinstance(reports, list):
                    self.log_test('reporting', 'Get Reports', True, 
                                f"Retrieved {len(reports)} reports")
                else:
                    self.log_test('reporting', 'Get Reports', False, "Invalid reports format")
            else:
                self.log_test('reporting', 'Get Reports', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('reporting', 'Get Reports', False, f"Exception: {str(e)}")
        
        # Test 2: Generate new report
        try:
            response = self.session.post(f"{API_BASE_URL}/reports/generate", 
                                       params={"report_type": "environmental", "framework": "GRI"})
            if response.status_code == 200:
                data = response.json()
                if 'id' in data and 'message' in data:
                    self.log_test('reporting', 'Generate Report', True, 
                                f"Successfully generated GRI environmental report")
                else:
                    self.log_test('reporting', 'Generate Report', False, 
                                "Missing id or message in response")
            else:
                self.log_test('reporting', 'Generate Report', False, 
                            f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test('reporting', 'Generate Report', False, f"Exception: {str(e)}")
    
    def test_data_integration(self):
        """Test data integration and MongoDB functionality"""
        print("\n=== TESTING DATA INTEGRATION ===")
        
        if not self.auth_token:
            self.log_test('data_integration', 'Data Integration', False, "No auth token available")
            return
        
        # Test sample data initialization by checking if we have expected sample assets
        try:
            response = self.session.get(f"{API_BASE_URL}/assets")
            if response.status_code == 200:
                assets = response.json()
                expected_assets = ['HVAC-001', 'PUMP-002', 'LED-003', 'BOILER-004']
                found_assets = [asset['_id'] for asset in assets if asset['_id'] in expected_assets]
                
                if len(found_assets) >= 3:  # Allow for some flexibility
                    self.log_test('data_integration', 'Sample Data Initialization', True, 
                                f"Found {len(found_assets)} expected sample assets")
                else:
                    self.log_test('data_integration', 'Sample Data Initialization', False, 
                                f"Only found {len(found_assets)} of {len(expected_assets)} expected assets")
            else:
                self.log_test('data_integration', 'Sample Data Initialization', False, 
                            "Could not retrieve assets to verify sample data")
        except Exception as e:
            self.log_test('data_integration', 'Sample Data Initialization', False, f"Exception: {str(e)}")
        
        # Test data consistency across endpoints
        try:
            # Get dashboard summary and assets to verify consistency
            dashboard_response = self.session.get(f"{API_BASE_URL}/dashboard/summary")
            assets_response = self.session.get(f"{API_BASE_URL}/assets")
            
            if dashboard_response.status_code == 200 and assets_response.status_code == 200:
                dashboard_data = dashboard_response.json()
                assets_data = assets_response.json()
                
                # Verify asset count consistency
                if dashboard_data['assets_count'] == len(assets_data):
                    # Verify cost calculations
                    calculated_repair = sum(asset['repair_cost'] for asset in assets_data)
                    calculated_replacement = sum(asset['replacement_cost'] for asset in assets_data)
                    
                    if (abs(dashboard_data['total_repair_cost'] - calculated_repair) < 0.01 and
                        abs(dashboard_data['total_replacement_cost'] - calculated_replacement) < 0.01):
                        self.log_test('data_integration', 'Data Consistency', True, 
                                    "Dashboard calculations match asset data")
                    else:
                        self.log_test('data_integration', 'Data Consistency', False, 
                                    "Dashboard calculations don't match asset data")
                else:
                    self.log_test('data_integration', 'Data Consistency', False, 
                                f"Asset count mismatch: dashboard={dashboard_data['assets_count']}, actual={len(assets_data)}")
            else:
                self.log_test('data_integration', 'Data Consistency', False, 
                            "Could not retrieve data for consistency check")
        except Exception as e:
            self.log_test('data_integration', 'Data Consistency', False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting ESGone Platform Backend API Tests")
        print(f"Backend URL: {API_BASE_URL}")
        print("=" * 60)
        
        self.test_authentication()
        self.test_dashboard()
        self.test_assets()
        self.test_planning()
        self.test_monitoring()
        self.test_reporting()
        self.test_data_integration()
        
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 60)
        print("🏁 TEST SUMMARY")
        print("=" * 60)
        
        total_passed = 0
        total_failed = 0
        
        for category, results in self.test_results.items():
            passed = results['passed']
            failed = results['failed']
            total_passed += passed
            total_failed += failed
            
            status_icon = "✅" if failed == 0 else "❌"
            print(f"{status_icon} {category.upper()}: {passed} passed, {failed} failed")
            
            # Print failed test details
            if failed > 0:
                for detail in results['details']:
                    if "❌ FAIL" in detail:
                        print(f"   {detail}")
        
        print("-" * 60)
        print(f"TOTAL: {total_passed} passed, {total_failed} failed")
        
        if total_failed == 0:
            print("🎉 ALL TESTS PASSED! Backend is production-ready.")
        else:
            print(f"⚠️  {total_failed} tests failed. Please review and fix issues.")
        
        return total_failed == 0

if __name__ == "__main__":
    tester = ESGoneAPITester()
    success = tester.run_all_tests()
    exit(0 if success else 1)