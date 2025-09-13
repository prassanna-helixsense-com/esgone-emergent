import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CalendarDays, Target, TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const Planning = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const planningData = {
    activeProjects: 12,
    completedGoals: 8,
    inProgress: 15,
    totalBudget: 2500000,
    spentBudget: 1650000
  };

  const sustainabilityGoals = [
    {
      id: 1,
      title: 'Carbon Neutral Operations',
      target: '2025',
      progress: 75,
      status: 'on-track',
      description: 'Achieve net-zero carbon emissions across all facilities',
      metrics: [
        { name: 'Energy Efficiency', value: 78, target: 85 },
        { name: 'Renewable Energy', value: 62, target: 80 },
        { name: 'Carbon Offset', value: 45, target: 60 }
      ]
    },
    {
      id: 2,
      title: 'Waste Reduction Initiative',
      target: '2024',
      progress: 90,
      status: 'ahead',
      description: 'Reduce operational waste by 50%',
      metrics: [
        { name: 'Recycling Rate', value: 85, target: 75 },
        { name: 'Waste Diversion', value: 92, target: 80 },
        { name: 'Circular Economy', value: 68, target: 70 }
      ]
    },
    {
      id: 3,
      title: 'Water Conservation',
      target: '2026',
      progress: 45,
      status: 'at-risk',
      description: 'Reduce water consumption by 30%',
      metrics: [
        { name: 'Usage Reduction', value: 35, target: 50 },
        { name: 'Recycling Systems', value: 25, target: 40 },
        { name: 'Smart Monitoring', value: 60, target: 70 }
      ]
    }
  ];

  const upcomingMilestones = [
    {
      id: 1,
      title: 'Q1 ESG Assessment',
      date: '2024-03-31',
      priority: 'high',
      department: 'Operations'
    },
    {
      id: 2,
      title: 'Energy Audit Completion',
      date: '2024-04-15',
      priority: 'medium',
      department: 'Facilities'
    },
    {
      id: 3,
      title: 'Supplier ESG Evaluation',
      date: '2024-05-01',
      priority: 'high',
      department: 'Procurement'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-track': return 'bg-blue-100 text-blue-800';
      case 'ahead': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-track': return <Clock className="h-4 w-4" />;
      case 'ahead': return <CheckCircle2 className="h-4 w-4" />;
      case 'at-risk': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ESG Planning</h1>
          <p className="text-gray-600">Strategic planning and goal management for sustainability initiatives</p>
        </div>
      </div>

      {/* Planning Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{planningData.activeProjects}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Goals</p>
                <p className="text-2xl font-bold text-green-600">{planningData.completedGoals}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">{planningData.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Usage</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round((planningData.spentBudget / planningData.totalBudget) * 100)}%
                </p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sustainability Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-green-600" />
            <span>Sustainability Goals & Targets</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sustainabilityGoals.map((goal) => (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                    <p className="text-gray-600 mb-2">{goal.description}</p>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(goal.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(goal.status)}
                          <span className="capitalize">{goal.status.replace('-', ' ')}</span>
                        </div>
                      </Badge>
                      <span className="text-sm text-gray-500">Target: {goal.target}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{goal.progress}%</div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Progress value={goal.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {goal.metrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                        <span className="text-sm text-gray-500">Target: {metric.target}%</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">{metric.value}%</div>
                      <Progress value={metric.value} className="h-1 mt-2" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            <span>Upcoming Milestones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMilestones.map((milestone) => (
              <div key={milestone.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    milestone.priority === 'high' ? 'bg-red-500' : 
                    milestone.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                    <p className="text-sm text-gray-600">{milestone.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{milestone.date}</p>
                  <Badge variant="outline" className={`text-xs ${
                    milestone.priority === 'high' ? 'border-red-200 text-red-700' :
                    milestone.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                    'border-green-200 text-green-700'
                  }`}>
                    {milestone.priority} priority
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outline">View All Milestones</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Planning;