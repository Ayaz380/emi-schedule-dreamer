
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PiggyBank, Calculator } from 'lucide-react';
import { numberToWords } from '@/utils/numberToWords';

const FDCalculator = () => {
  const [principal, setPrincipal] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>('quarterly');
  const [results, setResults] = useState<any>(null);

  const calculateFD = () => {
    const frequencies: { [key: string]: number } = {
      'annually': 1,
      'semi-annually': 2,
      'quarterly': 4,
      'monthly': 12
    };

    const n = frequencies[compoundingFrequency];
    const r = interestRate / 100;
    const t = tenure;

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const maturityAmount = principal * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityAmount - principal;

    setResults({
      principal,
      maturityAmount: Math.round(maturityAmount),
      interestEarned: Math.round(interestEarned),
      tenure,
      interestRate
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <PiggyBank className="h-8 w-8 text-green-600" />
          Fixed Deposit Calculator
        </h1>
        <p className="text-lg text-gray-600">Calculate your FD maturity amount and returns</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-blue-600" />
              FD Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label htmlFor="principal">Principal Amount (₹10K - ₹1Cr)</Label>
              <div className="space-y-2">
                <Slider
                  value={[principal]}
                  onValueChange={(value) => setPrincipal(value[0])}
                  min={10000}
                  max={10000000}
                  step={10000}
                  className="w-full"
                />
                <Input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  placeholder="1,00,000"
                  min={10000}
                  max={10000000}
                />
                <p className="text-xs text-gray-500">
                  {numberToWords(principal)} Rupees
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="interestRate">Interest Rate (3% - 12% p.a.)</Label>
              <div className="space-y-2">
                <Slider
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  min={3}
                  max={12}
                  step={0.1}
                  className="w-full"
                />
                <Input
                  id="interestRate"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  placeholder="7.5"
                  min={3}
                  max={12}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="tenure">Tenure (1 - 10 Years)</Label>
              <div className="space-y-2">
                <Slider
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <Input
                  id="tenure"
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  placeholder="5"
                  min={1}
                  max={10}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compounding">Compounding Frequency</Label>
              <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="annually">Annually</SelectItem>
                  <SelectItem value="semi-annually">Semi-Annually</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculateFD} className="w-full">
              Calculate FD Returns
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
            <CardHeader>
              <CardTitle className="text-green-700">FD Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{results.principal.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600">Principal Amount</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {numberToWords(results.principal)} Rupees
                  </div>
                </div>
                <div className="text-center p-4 bg-white/60 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    ₹{results.maturityAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-sm text-gray-600">Maturity Amount</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {numberToWords(results.maturityAmount)} Rupees
                  </div>
                </div>
              </div>
              
              <div className="text-center p-4 bg-white/60 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">
                  ₹{results.interestEarned.toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-gray-600">Interest Earned</div>
                <div className="text-xs text-gray-500 mt-1">
                  {numberToWords(results.interestEarned)} Rupees
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                Over {results.tenure} years at {results.interestRate}% p.a.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FDCalculator;
