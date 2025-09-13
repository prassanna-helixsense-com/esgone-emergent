import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Play, Pause, CheckCircle2, Clock, AlertTriangle, Users, Calendar, DollarSign } from 'lucide-react';

const Implementation = () => {
  const [activeProjects, setActiveProjects] = useState([
    {
      id: 1,
      name: 'Energy Management System Upgrade',
      status: 'in-progress',
      progress: 65,
      budget: 450000,
      spent: 292500,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      team: ['John Smith', 'Sarah Connor', 'Mike Johnson'],
      priority: 'high',
      description: 'Implementation of smart energy monitoring and control systems across all facilities'
    },
    {
      id: 2,
      name: 'Waste Reduction Program',
      status: 'completed',
      progress: 100,
      budget: 180000,
      spent: 175000,
      startDate: '2023-10-01',
      endDate: '2024-02-28',
      team: ['Lisa Anderson', 'David Chen'],
      priority: 'medium',
      description: 'Comprehensive waste sorting and recycling system implementation'
    },
    {
      id: 3,
      name: 'Water Conservation Initiative',
      status: 'planning',
      progress: 15,
      budget: 320000,
      spent: 48000,
      startDate: '2024-03-01',
      endDate: '2024-09-15',
      team: ['Emma Wilson', 'Robert Taylor'],
      priority: 'high',
      description: 'Installation of water recycling systems and smart leak detection'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'in-progress': return <Play className="h-4 w-4" />;
      case 'planning': return <Clock className="h-4 w-4" />;
      case 'on-hold': return <Pause className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 text-red-700 bg-red-50';
      case 'medium': return 'border-yellow-200 text-yellow-700 bg-yellow-50';
      case 'low': return 'border-green-200 text-green-700 bg-green-50';
      default: return 'border-gray-200 text-gray-700 bg-gray-50';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const completedProjects = activeProjects.filter(p => p.status === 'completed').length;
  const inProgressProjects = activeProjects.filter(p => p.status === 'in-progress').length;
  const totalBudget = activeProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = activeProjects.reduce((sum, p) => sum + p.spent, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Implementation</h1>
          <p className="text-gray-600">Track and manage ESG initiative implementations</p>
        </div>
        <Button>
          <Play className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{activeProjects.length}</p>
              </div>
              <Play className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressProjects}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedProjects}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Used</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round((totalSpent / totalBudget) * 100)}%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Overview */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Projects</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-6">
            {activeProjects.filter(p => p.status === 'in-progress').map((project) => (
              <Card key={project.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge className={getStatusColor(project.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(project.status)}
                            <span className="capitalize">{project.status.replace('-', ' ')}</span>
                          </div>
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(project.priority)}>
                          {project.priority} priority
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{project.progress}%</div>
                      <div className="text-sm text-gray-500">Complete</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={project.progress} className="h-2" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Timeline</p>
                          <p className="text-sm text-gray-600">{project.startDate} - {project.endDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Budget</p>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Team</p>
                          <p className="text-sm text-gray-600">{project.team.join(', ')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm">Update Progress</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-6">
            {activeProjects.filter(p => p.status === 'completed').map((project) => (
              <Card key={project.id} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(project.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(project.status)}
                            <span>Completed</span>
                          </div>
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Completed on {project.endDate}
                        </span>
                      </div>
                    </div>
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Final Budget</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                      </p>
                      <p className="text-sm text-green-600">
                        Saved {formatCurrency(project.budget - project.spent)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Duration</p>
                      <p className="text-lg font-semibold text-gray-900">5 months</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Team Size</p>
                      <p className="text-lg font-semibold text-gray-900">{project.team.length} members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-6">
          <div className="grid gap-6">
            {activeProjects.filter(p => p.status === 'planning').map((project) => (
              <Card key={project.id} className="border-l-4 border-l-yellow-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(project.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(project.status)}
                            <span>Planning Phase</span>
                          </div>
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(project.priority)}>
                          {project.priority} priority
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-600 mb-1">{project.progress}%</div>
                      <div className="text-sm text-gray-500">Planned</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Project in Planning Phase</span>
                      </div>
                      <p className="text-sm text-yellow-700">
                        This project is currently in the planning phase. Budget allocation and team assignments are being finalized.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Allocated Budget</p>
                        <p className="text-lg font-semibold text-gray-900">{formatCurrency(project.budget)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Expected Start</p>
                        <p className="text-lg font-semibold text-gray-900">{project.startDate}</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">Review Plan</Button>
                      <Button size="sm">Start Project</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Implementation;