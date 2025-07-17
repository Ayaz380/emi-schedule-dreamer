
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, PiggyBank, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { numberToWords } from '@/utils/numberToWords';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(0);
  const [expectedReturn, setExpectedReturn] = useState<number>(0);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(0);
  const [results, setResults] = useState<any>(null);

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / (12 * 100);
    const months = investmentPeriod * 12;
    
    // Future Value calculation
    const futureValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = futureValue - totalInvestment;
    
    // Generate year-wise data for chart
    const chartData = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const monthsElapsed = year * 12;
      const investedAmount = monthlyInvestment * monthsElapsed;
      const maturityValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, monthsElapsed) - 1) / monthlyRate) * (1 + monthlyRate));
      
      chartData.push({
        year,
        invested: Math.round(investedAmount),
        value: Math.round(maturityValue),
        returns: Math.round(maturityValue - investedAmount)
      });
    }

    setResults({
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
      chartData
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <TrendingUp className="h-10 w-10 text-green-600" />
            SIP Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate your mutual fund SIP returns and plan your investments
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-green-600" />
                  SIP Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="monthlyInvestment" className="text-sm font-medium text-gray-700">
                    Monthly Investment (₹500 - ₹1,00,000)
                  </Label>
                  <div className="space-y-2">
                    <Slider
                      value={[monthlyInvestment]}
                      onValueChange={(value) => setMonthlyInvestment(value[0])}
                      min={500}
                      max={100000}
                      step={500}
                      className="w-full"
                    />
                    <Input
                      id="monthlyInvestment"
                      type="number"
                      value={monthlyInvestment}
                      onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                      className="text-lg font-medium"
                      placeholder="10,000"
                      min={500}
                      max={100000}
                    />
                    <p className="text-xs text-gray-500">
                      {numberToWords(monthlyInvestment)} Rupees
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="expectedReturn" className="text-sm font-medium text-gray-700">
                    Expected Annual Return (8% - 25%)
                  </Label>
                  <div className="space-y-2">
                    <Slider
                      value={[expectedReturn]}
                      onValueChange={(value) => setExpectedReturn(value[0])}
                      min={8}
                      max={25}
                      step={0.5}
                      className="w-full"
                    />
                    <Input
                      id="expectedReturn"
                      type="number"
                      step="0.1"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="text-lg font-medium"
                      placeholder="12"
                      min={8}
                      max={25}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="investmentPeriod" className="text-sm font-medium text-gray-700">
                    Investment Period (1 - 40 Years)
                  </Label>
                  <div className="space-y-2">
                    <Slider
                      value={[investmentPeriod]}
                      onValueChange={(value) => setInvestmentPeriod(value[0])}
                      min={1}
                      max={40}
                      step={1}
                      className="w-full"
                    />
                    <Input
                      id="investmentPeriod"
                      type="number"
                      value={investmentPeriod}
                      onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                      className="text-lg font-medium"
                      placeholder="10"
                      min={1}
                      max={40}
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateSIP}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 text-lg"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate SIP
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-blue-700 mb-2">
                        ₹{results.totalInvestment.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">Total Investment</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {numberToWords(results.totalInvestment)} Rupees
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-green-700 mb-2">
                        ₹{results.futureValue.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-green-600 font-medium">Maturity Value</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {numberToWords(results.futureValue)} Rupees
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl font-bold text-purple-700 mb-2">
                        ₹{results.totalReturns.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-purple-600 font-medium">Total Returns</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {numberToWords(results.totalReturns)} Rupees
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Chart */}
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Investment Growth Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={results.chartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
                            labelFormatter={(label) => `Year ${label}`}
                          />
                          <Line type="monotone" dataKey="invested" stroke="#3b82f6" strokeWidth={2} name="Invested Amount" />
                          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="Maturity Value" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Ready to Calculate
                  </h3>
                  <p className="text-gray-600">
                    Enter your SIP details to see potential returns and growth projections.
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

export default SIPCalculator;
