
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Receipt, Calculator, PiggyBank } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const TaxCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState<number>(1200000);
  const [taxRegime, setTaxRegime] = useState<'old' | 'new'>('new');
  const [deductions, setDeductions] = useState<number>(150000);
  const [results, setResults] = useState<any>(null);

  const calculateTax = () => {
    let taxableIncome = annualIncome;
    let totalDeductions = 0;

    if (taxRegime === 'old') {
      totalDeductions = Math.min(deductions, 150000); // Standard deduction + 80C
      taxableIncome = Math.max(0, annualIncome - totalDeductions);
    }

    let tax = 0;
    let cess = 0;

    if (taxRegime === 'new') {
      // New Tax Regime (2023-24)
      if (taxableIncome <= 300000) tax = 0;
      else if (taxableIncome <= 600000) tax = (taxableIncome - 300000) * 0.05;
      else if (taxableIncome <= 900000) tax = 15000 + (taxableIncome - 600000) * 0.10;
      else if (taxableIncome <= 1200000) tax = 45000 + (taxableIncome - 900000) * 0.15;
      else if (taxableIncome <= 1500000) tax = 90000 + (taxableIncome - 1200000) * 0.20;
      else tax = 150000 + (taxableIncome - 1500000) * 0.30;
    } else {
      // Old Tax Regime
      if (taxableIncome <= 250000) tax = 0;
      else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.20;
      else tax = 112500 + (taxableIncome - 1000000) * 0.30;
    }

    cess = tax * 0.04; // 4% Health and Education Cess
    const totalTax = tax + cess;
    const netIncome = annualIncome - totalTax;

    const pieData = [
      { name: 'Net Income', value: netIncome, color: '#10b981' },
      { name: 'Income Tax', value: tax, color: '#ef4444' },
      { name: 'Cess', value: cess, color: '#f59e0b' }
    ];

    setResults({
      grossIncome: annualIncome,
      taxableIncome,
      totalDeductions,
      incomeTax: Math.round(tax),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax),
      netIncome: Math.round(netIncome),
      pieData,
      effectiveTaxRate: ((totalTax / annualIncome) * 100).toFixed(2)
    });
  };

  const COLORS = ['#10b981', '#ef4444', '#f59e0b'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Receipt className="h-10 w-10 text-blue-600" />
            Income Tax Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your income tax for FY 2023-24 under both tax regimes
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-blue-600" />
                  Tax Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome" className="text-sm font-medium text-gray-700">
                    Annual Income (₹)
                  </Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="text-lg font-medium"
                    placeholder="12,00,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Tax Regime
                  </Label>
                  <Select value={taxRegime} onValueChange={(value: 'old' | 'new') => setTaxRegime(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Tax Regime</SelectItem>
                      <SelectItem value="old">Old Tax Regime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {taxRegime === 'old' && (
                  <div className="space-y-2">
                    <Label htmlFor="deductions" className="text-sm font-medium text-gray-700">
                      Total Deductions (₹)
                    </Label>
                    <Input
                      id="deductions"
                      type="number"
                      value={deductions}
                      onChange={(e) => setDeductions(Number(e.target.value))}
                      className="text-lg font-medium"
                      placeholder="1,50,000"
                    />
                    <p className="text-xs text-gray-500">
                      Include 80C, 80D, Standard Deduction etc. (Max: ₹1,50,000)
                    </p>
                  </div>
                )}

                <Button 
                  onClick={calculateTax}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate Tax
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-green-700 mb-2">
                        ₹{results.netIncome.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-green-600 font-medium">Net Annual Income</div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-red-700 mb-2">
                        ₹{results.totalTax.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-red-600 font-medium">Total Tax Liability</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Tax Breakdown */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Tax Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gross Income:</span>
                          <span className="font-semibold">₹{results.grossIncome.toLocaleString('en-IN')}</span>
                        </div>
                        {taxRegime === 'old' && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Deductions:</span>
                            <span className="font-semibold">₹{results.totalDeductions.toLocaleString('en-IN')}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taxable Income:</span>
                          <span className="font-semibold">₹{results.taxableIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Income Tax:</span>
                          <span className="font-semibold">₹{results.incomeTax.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Health & Education Cess:</span>
                          <span className="font-semibold">₹{results.cess.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="text-gray-900 font-medium">Effective Tax Rate:</span>
                          <span className="font-bold text-blue-600">{results.effectiveTaxRate}%</span>
                        </div>
                      </div>
                      
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={results.pieData}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                            >
                              {results.pieData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Receipt className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Ready to Calculate
                  </h3>
                  <p className="text-gray-600">
                    Enter your income details to calculate tax liability under different regimes.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
