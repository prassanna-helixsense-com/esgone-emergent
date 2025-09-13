import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Activity, TrendingUp, TrendingDown, Zap, Droplets, Thermometer, Wind, AlertTriangle } from 'lucide-react';

const Monitoring = () => {
  const realTimeData = {
    energyConsumption: {
      current: 2847,
      unit: 'kWh',
      change: -5.2,
      status: 'good'
    },
    waterUsage: {
      current: 1245,
      unit: 'L/hr',
      change: -8.1,
      status: 'excellent'
    },
    temperature: {
      current: 22.5,
      unit: '°C',
      change: 1.2,
      status: 'normal'
    },
    airQuality: {
      current: 85,
      unit: 'AQI',
      change: -2.3,
      status: 'good'
    }
  };

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Energy consumption spike detected in Building A',
      timestamp: '2 minutes ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      message: 'Water recycling system maintenance completed',
      timestamp: '15 minutes ago',
      severity: 'low'
    },
    {
      id: 3,
      type: 'error',
      message: 'Temperature sensor offline in Zone 3',
      timestamp: '1 hour ago',
      severity: 'high'
    }
  ];

  const performanceMetrics = [
    {
      category: 'Energy Efficiency',
      current: 78,
      target: 85,
      trend: 'up',
      change: 3.2
    },
    {
      category: 'Water Conservation',
      current: 92,
      target: 80,
      trend: 'up',
      change: 5.7
    },
    {
      category: 'Waste Reduction',
      current: 68,
      target: 75,
      trend: 'down',
      change: -2.1
    },
    {
      category: 'Carbon Footprint',
      current: 82,
      target: 90,
      trend: 'up',
      change: 4.8
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'normal': return 'text-gray-600 bg-gray-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-Time Monitoring</h1>
          <p className="text-gray-600">Live environmental and sustainability metrics monitoring</p>
        </div>
        <Button>
          <Activity className="h-4 w-4 mr-2" />
          Live Dashboard
        </Button>
      </div>

      {/* Real-Time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-gray-600">Energy</span>
              </div>
              <Badge className={getStatusColor(realTimeData.energyConsumption.status)}>
                {realTimeData.energyConsumption.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">
                {realTimeData.energyConsumption.current} {realTimeData.energyConsumption.unit}
              </div>
              <div className="flex items-center space-x-1">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">
                  {Math.abs(realTimeData.energyConsumption.change)}% vs last hour
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Water</span>
              </div>
              <Badge className={getStatusColor(realTimeData.waterUsage.status)}>
                {realTimeData.waterUsage.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">
                {realTimeData.waterUsage.current} {realTimeData.waterUsage.unit}
              </div>
              <div className="flex items-center space-x-1">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">
                  {Math.abs(realTimeData.waterUsage.change)}% vs last hour
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-600">Temperature</span>
              </div>
              <Badge className={getStatusColor(realTimeData.temperature.status)}>
                {realTimeData.temperature.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">
                {realTimeData.temperature.current}{realTimeData.temperature.unit}
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-600">
                  {realTimeData.temperature.change}% vs last hour
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Wind className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Air Quality</span>
              </div>
              <Badge className={getStatusColor(realTimeData.airQuality.status)}>
                {realTimeData.airQuality.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-gray-900">
                {realTimeData.airQuality.current} {realTimeData.airQuality.unit}
              </div>
              <div className="flex items-center space-x-1">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">
                  {Math.abs(realTimeData.airQuality.change)}% vs last hour
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ESG Performance Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-gray-900">{metric.category}</h3>
                      <div className="flex items-center space-x-1">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {metric.change > 0 ? '+' : ''}{metric.change}%
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current: {metric.current}%</span>
                        <span>Target: {metric.target}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.current >= metric.target ? 'bg-green-600' : 'bg-blue-600'
                          }`}
                          style={{ width: `${Math.min(metric.current, 100)}%` }}
                        ></div>
                      </div>
                      {metric.current >= metric.target && (
                        <p className="text-sm text-green-600 font-medium">✓ Target achieved</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span>Active Monitoring Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.severity)}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-sm opacity-75 mt-1">{alert.timestamp}</p>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        {alert.severity} priority
                      </Badge>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm">Acknowledge</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Energy Consumption</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-1">-12.5%</p>
                  <p className="text-sm text-gray-600">vs last month</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Droplets className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Water Usage</h3>
                  <p className="text-2xl font-bold text-cyan-600 mb-1">-18.2%</p>
                  <p className="text-sm text-gray-600">vs last month</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <Wind className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Carbon Emissions</h3>
                  <p className="text-2xl font-bold text-green-600 mb-1">-25.7%</p>
                  <p className="text-sm text-gray-600">vs last month</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Overall ESG Score</h3>
                  <p className="text-2xl font-bold text-purple-600 mb-1">+15.3%</p>
                  <p className="text-sm text-gray-600">vs last month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Monitoring;