import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { FileText, Download, Calendar, BarChart3, TrendingUp, Globe, Users, Target } from 'lucide-react';

const Reporting = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedFramework, setSelectedFramework] = useState('gri');

  const reportSummary = {
    generatedReports: 45,
    automatedReports: 32,
    complianceRate: 96,
    lastGenerated: '2024-02-15'
  };

  const availableReports = [
    {
      id: 1,
      name: 'ESG Performance Dashboard',
      type: 'Performance',
      framework: 'GRI',
      frequency: 'Monthly',
      lastGenerated: '2024-02-15',
      status: 'ready',
      description: 'Comprehensive ESG metrics and KPI tracking'
    },
    {
      id: 2,
      name: 'Carbon Footprint Analysis',
      type: 'Environmental',
      framework: 'TCFD',
      frequency: 'Quarterly',
      lastGenerated: '2024-01-31',
      status: 'generating',
      description: 'Detailed carbon emissions and reduction strategies'
    },
    {
      id: 3,
      name: 'Sustainability Goals Report',
      type: 'Strategic',
      framework: 'SDG',
      frequency: 'Annual',
      lastGenerated: '2024-01-15',
      status: 'ready',
      description: 'Progress against UN Sustainable Development Goals'
    },
    {
      id: 4,
      name: 'Stakeholder Engagement Summary',
      type: 'Social',
      framework: 'SASB',
      frequency: 'Quarterly',
      lastGenerated: '2024-02-10',
      status: 'draft',
      description: 'Community and stakeholder interaction metrics'
    }
  ];

  const complianceFrameworks = [
    {
      name: 'GRI Standards',
      code: 'GRI',
      compliance: 94,
      reports: 12,
      description: 'Global Reporting Initiative Standards'
    },
    {
      name: 'TCFD',
      code: 'TCFD',
      compliance: 88,
      reports: 8,
      description: 'Task Force on Climate-related Financial Disclosures'
    },
    {
      name: 'SASB',
      code: 'SASB',
      compliance: 92,
      reports: 10,
      description: 'Sustainability Accounting Standards Board'
    },
    {
      name: 'UN SDGs',
      code: 'SDG',
      compliance: 85,
      reports: 6,
      description: 'United Nations Sustainable Development Goals'
    }
  ];

  const keyMetrics = [
    {
      category: 'Environmental',
      metrics: [
        { name: 'Carbon Emissions', value: '12,450 tCO2e', trend: 'down', change: '-8.2%' },
        { name: 'Energy Consumption', value: '2.4 GWh', trend: 'down', change: '-5.1%' },
        { name: 'Water Usage', value: '185,000 L', trend: 'down', change: '-12.3%' },
        { name: 'Waste Reduction', value: '23%', trend: 'up', change: '+15.7%' }
      ]
    },
    {
      category: 'Social',
      metrics: [
        { name: 'Employee Satisfaction', value: '87%', trend: 'up', change: '+3.2%' },
        { name: 'Diversity Index', value: '0.78', trend: 'up', change: '+5.4%' },
        { name: 'Training Hours', value: '2,840 hrs', trend: 'up', change: '+22.1%' },
        { name: 'Community Investment', value: '$125K', trend: 'up', change: '+8.9%' }
      ]
    },
    {
      category: 'Governance',
      metrics: [
        { name: 'Board Diversity', value: '45%', trend: 'up', change: '+12.0%' },
        { name: 'Ethics Training', value: '98%', trend: 'stable', change: '0%' },
        { name: 'Audit Score', value: '94/100', trend: 'up', change: '+2.1%' },
        { name: 'Transparency Index', value: '0.91', trend: 'up', change: '+4.3%' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
    return <div className="h-4 w-4 bg-gray-400 rounded-full"></div>;
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ESG Reporting</h1>
          <p className="text-gray-600">Generate comprehensive ESG reports and compliance documentation</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Reporting Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Generated Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reportSummary.generatedReports}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Automated</p>
                <p className="text-2xl font-bold text-green-600">{reportSummary.automatedReports}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-green-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
                <p className="text-2xl font-bold text-purple-600">{reportSummary.complianceRate}%</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Last Generated</p>
                <p className="text-2xl font-bold text-gray-900">Feb 15</p>
                <p className="text-xs text-gray-500">{reportSummary.lastGenerated}</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reporting Tabs */}
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">Available Reports</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Frameworks</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Report Generation Controls */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Reporting Period</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Framework</label>
                  <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gri">GRI Standards</SelectItem>
                      <SelectItem value="tcfd">TCFD</SelectItem>
                      <SelectItem value="sasb">SASB</SelectItem>
                      <SelectItem value="sdg">UN SDGs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-6">
                  <Button>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Custom Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Reports */}
          <div className="grid gap-6">
            {availableReports.map((report) => (
              <Card key={report.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{report.name}</CardTitle>
                      <p className="text-gray-600 mb-3">{report.description}</p>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <Badge variant="outline">
                          {report.framework}
                        </Badge>
                        <span className="text-sm text-gray-500">{report.frequency}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Last Generated</p>
                      <p className="text-sm text-gray-600">{report.lastGenerated}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm">View Report</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          {keyMetrics.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {category.category === 'Environmental' && <Globe className="h-5 w-5 text-green-600" />}
                  {category.category === 'Social' && <Users className="h-5 w-5 text-blue-600" />}
                  {category.category === 'Governance' && <Target className="h-5 w-5 text-purple-600" />}
                  <span>{category.category} Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.metrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="text-xl font-bold text-gray-900 mb-1">{metric.value}</div>
                      <div className={`text-sm ${getTrendColor(metric.trend)}`}>
                        {metric.change} vs last period
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceFrameworks.map((framework) => (
              <Card key={framework.code}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{framework.name}</CardTitle>
                      <p className="text-gray-600 text-sm">{framework.description}</p>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {framework.code}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Compliance Rate</span>
                      <span className="text-lg font-bold text-green-600">{framework.compliance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${framework.compliance}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Reports Generated: {framework.reports}</span>
                      <Button variant="outline" size="sm">View Details</Button>
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

export default Reporting;