import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { DollarSign, Wrench, RefreshCw, Building2, Leaf, Trash2, TrendingDown, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // Mock data based on the real ESGone portal
  const portfolioData = {
    totalRepairCost: { value: 330800, items: 19, color: 'green' },
    totalRetrofitCost: { value: 396960, description: 'Estimated retrofit investment', color: 'purple' },
    totalReplaceCost: { value: 1501000, percentage: '354% more than repair', color: 'yellow' },
    totalRAV: { value: 704092, description: 'Replacement Asset Value', color: 'blue' },
    manufacturingAvoided: { value: 750500, unit: 'kg', description: 'By repairing instead of replacing', color: 'green' },
    endOfLifeCO2: { value: 86550, unit: 'kg', description: 'When equipment is scrapped', color: 'orange' }
  };

  const co2Analysis = {
    operationalSavings: { value: 64260, unit: 'kg/year', description: 'From replacing with efficient equipment' },
    manufacturingAvoided: { value: 750500, unit: 'kg', description: 'By repairing instead of replacing' },
    scrappingImpact: { value: 86550, unit: 'kg', description: 'When equipment reaches end of life' },
    netBenefit: { value: 663950, unit: 'kg', description: 'Manufacturing avoided minus scrapping' }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Summary</h1>
          <p className="text-gray-600">Equipment repair, retrofit, and replacement strategies with CO2 impact analysis</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          ESG Optimized
        </Badge>
      </div>

      {/* Portfolio Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Repair Cost */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold text-green-600">
                {formatCurrency(portfolioData.totalRepairCost.value)}
              </CardTitle>
              <p className="text-sm text-gray-600">Across {portfolioData.totalRepairCost.items} items</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Wrench className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-gray-900">Total Repair Cost</p>
          </CardContent>
        </Card>

        {/* Total Retrofit Cost */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold text-purple-600">
                {formatCurrency(portfolioData.totalRetrofitCost.value)}
              </CardTitle>
              <p className="text-sm text-gray-600">{portfolioData.totalRetrofitCost.description}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-gray-900">Total Retrofit Cost</p>
          </CardContent>
        </Card>

        {/* Total Replace Cost */}
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold text-yellow-600">
                {formatCurrency(portfolioData.totalReplaceCost.value)}
              </CardTitle>
              <p className="text-sm text-gray-600">{portfolioData.totalReplaceCost.percentage}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-gray-900">Total Replace Cost</p>
          </CardContent>
        </Card>

        {/* Total RAV (CMMS) */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold text-blue-600">
                {formatCurrency(portfolioData.totalRAV.value)}
              </CardTitle>
              <p className="text-sm text-gray-600">{portfolioData.totalRAV.description}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-gray-900">Total RAV (CMMS)</p>
          </CardContent>
        </Card>

        {/* Manufacturing CO2 Avoided */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold text-green-600">
                {formatNumber(portfolioData.manufacturingAvoided.value)} {portfolioData.manufacturingAvoided.unit}
              </CardTitle>
              <p className="text-sm text-gray-600">{portfolioData.manufacturingAvoided.description}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-gray-900">Manufacturing CO2 Avoided</p>
          </CardContent>
        </Card>

        {/* End-of-Life CO2 */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-2xl font-bold text-orange-600">
                {formatNumber(portfolioData.endOfLifeCO2.value)} {portfolioData.endOfLifeCO2.unit}
              </CardTitle>
              <p className="text-sm text-gray-600">{portfolioData.endOfLifeCO2.description}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Trash2 className="h-6 w-6 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-gray-900">End-of-Life CO2</p>
          </CardContent>
        </Card>
      </div>

      {/* Complete CO2 Impact Analysis */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <CardTitle className="text-xl text-green-800">Complete CO2 Impact Analysis</CardTitle>
          </div>
          <p className="text-green-700">Environmental benefits of repair vs. replacement strategies</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Operational CO2 Savings */}
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatNumber(co2Analysis.operationalSavings.value)} {co2Analysis.operationalSavings.unit}
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Operational CO2 Savings</h4>
              <p className="text-xs text-gray-600">{co2Analysis.operationalSavings.description}</p>
            </div>

            {/* Manufacturing Avoided */}
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {formatNumber(co2Analysis.manufacturingAvoided.value)} {co2Analysis.manufacturingAvoided.unit}
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Manufacturing Avoided</h4>
              <p className="text-xs text-gray-600">{co2Analysis.manufacturingAvoided.description}</p>
            </div>

            {/* Scrapping Impact */}
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {formatNumber(co2Analysis.scrappingImpact.value)} {co2Analysis.scrappingImpact.unit}
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Scrapping Impact</h4>
              <p className="text-xs text-gray-600">{co2Analysis.scrappingImpact.description}</p>
            </div>

            {/* Net Environmental Benefit */}
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {formatNumber(co2Analysis.netBenefit.value)} {co2Analysis.netBenefit.unit}
              </div>
              <h4 className="font-medium text-gray-900 mb-1">Net Environmental Benefit</h4>
              <p className="text-xs text-gray-600">{co2Analysis.netBenefit.description}</p>
            </div>
          </div>

          {/* Summary Banner */}
          <div className="bg-blue-600 text-white p-6 rounded-lg text-center">
            <div className="text-4xl font-bold mb-2">
              {formatNumber(co2Analysis.netBenefit.value)} kg CO2 saved
            </div>
            <p className="text-blue-100">Net Environmental Benefit (Repair Strategy)</p>
            <p className="text-sm text-blue-200 mt-2">
              Manufacturing avoided minus scrapping impact
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;