
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Calendar, Download, PieChart as PieChartIcon } from 'lucide-react';
import PaymentChart from './PaymentChart';
import AmortizationTable from './AmortizationTable';
import SavingsComparison from './SavingsComparison';

interface EnhancedEMIResultsProps {
  results: {
    basicEMI: number;
    standardScenario: any;
    withPrepaymentScenario: any;
    totalSavings: number;
    tenureReduction: number;
  } | null;
}

const EnhancedEMIResults = ({ results }: EnhancedEMIResultsProps) => {
  if (!results) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Ready to Calculate
          </h3>
          <p className="text-gray-600">
            Enter your loan details and prepayment options to see your EMI breakdown and savings analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  const pieData = [
    {
      name: 'Principal',
      value: results.withPrepaymentScenario.totalPrincipal,
      color: '#10B981'
    },
    {
      name: 'Interest',
      value: results.withPrepaymentScenario.totalInterest,
      color: '#F59E0B'
    },
    {
      name: 'Prepayments',
      value: results.withPrepaymentScenario.totalPrepayments,
      color: '#8B5CF6'
    }
  ];

  const comparisonData = [
    {
      name: 'Without Prepayment',
      interest: results.standardScenario.totalInterest,
      tenure: results.standardScenario.actualTenure
    },
    {
      name: 'With Prepayment',
      interest: results.withPrepaymentScenario.totalInterest,
      tenure: results.withPrepaymentScenario.actualTenure
    }
  ];

  const exportToPDF = () => {
    // This would typically use a library like jsPDF
    console.log('Exporting to PDF...');
    alert('PDF export functionality would be implemented here');
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-4 md:p-6">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-green-700 mb-2">
                ₹{results.basicEMI.toLocaleString('en-IN')}
              </div>
              <div className="text-xs md:text-sm text-green-600 font-medium">Monthly EMI</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-amber-100">
          <CardContent className="p-4 md:p-6">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-orange-700 mb-2">
                ₹{results.totalSavings.toLocaleString('en-IN')}
              </div>
              <div className="text-xs md:text-sm text-orange-600 font-medium">Interest Saved</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
          <CardContent className="p-4 md:p-6">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-blue-700 mb-2">
                {results.tenureReduction.toFixed(1)}
              </div>
              <div className="text-xs md:text-sm text-blue-600 font-medium">Years Saved</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-violet-100">
          <CardContent className="p-4 md:p-6">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-purple-700 mb-2">
                ₹{results.withPrepaymentScenario.totalPrepayments.toLocaleString('en-IN')}
              </div>
              <div className="text-xs md:text-sm text-purple-600 font-medium">Total Prepayments</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-blue-600" />
              Payment Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Comparison Chart */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Interest & Tenure Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number, name: string) => [
                    name === 'interest' ? `₹${value.toLocaleString('en-IN')}` : `${value} years`,
                    name === 'interest' ? 'Total Interest' : 'Tenure'
                  ]}
                />
                <Legend />
                <Bar dataKey="interest" fill="#F59E0B" name="Total Interest" />
                <Bar dataKey="tenure" fill="#10B981" name="Tenure (Years)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Export Button */}
      <div className="flex justify-center">
        <Button onClick={exportToPDF} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export to PDF
        </Button>
      </div>

      {/* Savings Comparison */}
      <SavingsComparison 
        standardScenario={results.standardScenario}
        withPrepaymentScenario={results.withPrepaymentScenario}
        totalSavings={results.totalSavings}
        tenureReduction={results.tenureReduction}
      />

      {/* Payment Chart */}
      <PaymentChart data={results.withPrepaymentScenario.schedule} />

      {/* Amortization Table */}
      <AmortizationTable 
        schedule={results.withPrepaymentScenario.schedule}
        scenario={results.withPrepaymentScenario}
      />
    </div>
  );
};

export default EnhancedEMIResults;
