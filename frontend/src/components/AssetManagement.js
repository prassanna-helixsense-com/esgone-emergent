import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Filter, Package, Wrench, AlertCircle, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const AssetManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const assets = [
    {
      id: 'HVAC-001',
      name: 'HVAC System - Building A',
      category: 'HVAC',
      status: 'operational',
      condition: 'good',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-04-15',
      repairCost: 15000,
      replacementCost: 85000,
      co2Impact: 25000,
      efficiency: 82,
      location: 'Building A - Floor 3'
    },
    {
      id: 'PUMP-002',
      name: 'Water Circulation Pump',
      category: 'Water Systems',
      status: 'maintenance',
      condition: 'fair',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-03-10',
      repairCost: 8500,
      replacementCost: 35000,
      co2Impact: 12000,
      efficiency: 75,
      location: 'Basement - Mechanical Room'
    },
    {
      id: 'LED-003',
      name: 'LED Lighting Array',
      category: 'Lighting',
      status: 'operational',
      condition: 'excellent',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-07-20',
      repairCost: 2500,
      replacementCost: 18000,
      co2Impact: 5500,
      efficiency: 95,
      location: 'Building B - All Floors'
    },
    {
      id: 'BOILER-004',
      name: 'Industrial Boiler',
      category: 'Heating',
      status: 'critical',
      condition: 'poor',
      lastMaintenance: '2023-12-01',
      nextMaintenance: '2024-02-01',
      repairCost: 45000,
      replacementCost: 180000,
      co2Impact: 75000,
      efficiency: 65,
      location: 'Building C - Basement'
    }
  ];

  const assetSummary = {
    totalAssets: assets.length,
    operational: assets.filter(a => a.status === 'operational').length,
    maintenance: assets.filter(a => a.status === 'maintenance').length,
    critical: assets.filter(a => a.status === 'critical').length,
    totalValue: assets.reduce((sum, asset) => sum + asset.replacementCost, 0),
    avgEfficiency: Math.round(assets.reduce((sum, asset) => sum + asset.efficiency, 0) / assets.length)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredAssets = assets.filter(asset =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Asset Management</h1>
          <p className="text-gray-600">Manage equipment lifecycle, maintenance, and sustainability impact</p>
        </div>
        <Button>
          <Package className="h-4 w-4 mr-2" />
          Add Asset
        </Button>
      </div>

      {/* Asset Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">{assetSummary.totalAssets}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Operational</p>
                <p className="text-2xl font-bold text-green-600">{assetSummary.operational}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Needs Attention</p>
                <p className="text-2xl font-bold text-yellow-600">{assetSummary.maintenance + assetSummary.critical}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">{formatCurrency(assetSummary.totalValue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search assets by name, ID, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Asset Management Tabs */}
      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="inventory">Asset Inventory</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance Schedule</TabsTrigger>
          <TabsTrigger value="lifecycle">Lifecycle Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          <div className="grid gap-6">
            {filteredAssets.map((asset) => (
              <Card key={asset.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{asset.name}</CardTitle>
                      <p className="text-gray-600 mb-2">ID: {asset.id}</p>
                      <div className="flex items-center space-x-4 mb-3">
                        <Badge className={getStatusColor(asset.status)}>
                          {asset.status}
                        </Badge>
                        <Badge variant="outline">
                          {asset.category}
                        </Badge>
                        <span className={`text-sm font-medium ${getConditionColor(asset.condition)}`}>
                          {asset.condition} condition
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{asset.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 mb-1">{asset.efficiency}%</div>
                      <div className="text-sm text-gray-500">Efficiency</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Repair Cost</p>
                      <p className="text-lg font-semibold text-green-600">{formatCurrency(asset.repairCost)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Replacement Cost</p>
                      <p className="text-lg font-semibold text-gray-900">{formatCurrency(asset.replacementCost)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">CO2 Impact</p>
                      <p className="text-lg font-semibold text-orange-600">{asset.co2Impact.toLocaleString()} kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Next Maintenance</p>
                      <p className="text-lg font-semibold text-blue-600">{asset.nextMaintenance}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      <Wrench className="h-4 w-4 mr-1" />
                      Schedule Maintenance
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span>Maintenance Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assets
                  .sort((a, b) => new Date(a.nextMaintenance) - new Date(b.nextMaintenance))
                  .map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          asset.status === 'critical' ? 'bg-red-500' :
                          asset.status === 'maintenance' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{asset.name}</h4>
                          <p className="text-sm text-gray-600">{asset.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{asset.nextMaintenance}</p>
                        <p className="text-sm text-gray-600">Next maintenance</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifecycle" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Repair vs Replace Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Total Repair Costs</span>
                    <span className="text-lg font-bold text-green-600">
                      {formatCurrency(assets.reduce((sum, asset) => sum + asset.repairCost, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Total Replacement Costs</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(assets.reduce((sum, asset) => sum + asset.replacementCost, 0))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Potential Savings</span>
                    <span className="text-lg font-bold text-blue-600">
                      {formatCurrency(
                        assets.reduce((sum, asset) => sum + asset.replacementCost, 0) - 
                        assets.reduce((sum, asset) => sum + asset.repairCost, 0)
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium">Total CO2 Impact</span>
                    <span className="text-lg font-bold text-orange-600">
                      {assets.reduce((sum, asset) => sum + asset.co2Impact, 0).toLocaleString()} kg
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Avg. Efficiency</span>
                    <span className="text-lg font-bold text-green-600">{assetSummary.avgEfficiency}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">ESG Score Impact</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-lg font-bold text-blue-600">+12%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetManagement;