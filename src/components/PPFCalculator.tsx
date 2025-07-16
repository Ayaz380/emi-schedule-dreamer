
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Shield, Calculator, TrendingUp } from 'lucide-react';

const PPFCalculator = () => {
  const [yearlyInvestment, setYearlyInvestment] = useState<number>(150000);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [results, setResults] = useState<any>(null);

  const calculatePPF = () => {
    const ppfRate = 7.1; // Current PPF rate
    const tenure = 15; // PPF lock-in period
    
    // PPF calculation with compounding
    let totalAmount = 0;
    let totalInvestment = 0;
    
    for (let year = 1; year <= tenure; year++) {
      totalInvestment += yearlyInvestment;
      totalAmount = (totalAmount + yearlyInvestment) * (1 + ppfRate / 100);
    }
    
    const interestEarned = totalAmount - totalInvestment;
    const maturityAge = currentAge + tenure;
    
    // Calculate tax savings (assuming 30% tax bracket)
    const taxSaved = totalInvestment * 0.3;

    setResults({
      yearlyInvestment,
      totalInvestment: Math.round(totalInvestment),
      maturityAmount: Math.round(totalAmount),
      interestEarned: Math.round(interestEarned),
      taxSaved: Math.round(taxSaved),
      maturityAge,
      tenure
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          PPF Calculator
        </h1>
        <p className="text-lg text-gray-600">Calculate your Public Provident Fund returns</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              PPF Investment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="yearlyInvestment">Yearly Investment (₹500 - ₹1.5L)</Label>
              <Input
                id="yearlyInvestment"
                type="number"
                value={yearlyInvestment}
                onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                min={500}
                max={150000}
                placeholder="1,50,000"
              />
              <div className="text-xs text-gray-500">
                Maximum ₹1.5 lakh per year for tax benefit under Section 80C
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input
                id="currentAge"
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                placeholder="30"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">PPF Features:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 15-year lock-in period</li>
                <li>• Current interest rate: 7.1% p.a.</li>
                <li>• Tax-free returns (EEE status)</li>
                <li>• Loan facility after 7th year</li>
              </ul>
            </div>

            <Button onClick={calculatePPF} className="w-full">
              Calculate PPF Returns
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardHeader>
              <CardTitle className="text-blue-700 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                PPF Calculation Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-xl font-bold text-gray-900">
                    ₹{results.totalInvestment.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600">Total Investment</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-xl font-bold text-blue-700">
                    ₹{results.maturityAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600">Maturity Amount</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-xl font-bold text-green-700">
                    ₹{results.interestEarned.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600">Interest Earned</div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-xl font-bold text-orange-700">
                    ₹{results.taxSaved.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600">Tax Saved</div>
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg">
                <div className="text-lg font-semibold">
                  Maturity at age {results.maturityAge}
                </div>
                <div className="text-sm opacity-90">
                  After {results.tenure} years of investment
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PPFCalculator;
