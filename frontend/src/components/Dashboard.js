import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { BarChart3, Users, ShieldCheck, TrendingUp, Leaf, Zap, Droplets, Recycle } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const mockData = {
    carbonEmissions: '12,450 tCO2e',
    energyConsumption: '2.4 GWh',
    waterUsage: '185,000 L',
    wasteReduction: '23%',
    esgScore: '78/100',
    compliance: '94%'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ESG</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">ESGone Platform</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {user?.name || 'User'}</span>
            <Button onClick={handleLogout} variant="outline">
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ESG Dashboard</h2>
          <p className="text-gray-600">Monitor your environmental, social, and governance performance</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Carbon Emissions</CardTitle>
              <Leaf className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{mockData.carbonEmissions}</div>
              <p className="text-xs text-green-600">-5.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Energy Consumption</CardTitle>
              <Zap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{mockData.energyConsumption}</div>
              <p className="text-xs text-blue-600">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-cyan-800">Water Usage</CardTitle>
              <Droplets className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-900">{mockData.waterUsage}</div>
              <p className="text-xs text-cyan-600">-8.3% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Waste Reduction</CardTitle>
              <Recycle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{mockData.wasteReduction}</div>
              <p className="text-xs text-purple-600">Target: 30% reduction</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">ESG Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{mockData.esgScore}</div>
              <p className="text-xs text-orange-600">Industry average: 65</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-50 to-teal-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-teal-800">Compliance Rate</CardTitle>
              <ShieldCheck className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-teal-900">{mockData.compliance}</div>
              <p className="text-xs text-teal-600">All standards met</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button className="h-24 bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700 hover:text-teal-600 flex-col space-y-2">
            <BarChart3 className="h-6 w-6" />
            <span>Generate Report</span>
          </Button>
          
          <Button className="h-24 bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700 hover:text-teal-600 flex-col space-y-2">
            <Users className="h-6 w-6" />
            <span>Team Management</span>
          </Button>
          
          <Button className="h-24 bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700 hover:text-teal-600 flex-col space-y-2">
            <ShieldCheck className="h-6 w-6" />
            <span>Compliance Check</span>
          </Button>
          
          <Button className="h-24 bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700 hover:text-teal-600 flex-col space-y-2">
            <TrendingUp className="h-6 w-6" />
            <span>Analytics</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Carbon emissions report generated</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Energy audit completed</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Compliance review scheduled</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;