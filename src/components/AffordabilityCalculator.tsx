
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Home, Calculator, TrendingUp, Wallet, PiggyBank } from 'lucide-react';
import { numberToWords } from '@/utils/numberToWords';

interface AffordabilityCalculatorProps {
  onAffordabilityResult: (affordableAmount: number) => void;
}

const AffordabilityCalculator: React.FC<AffordabilityCalculatorProps> = ({ onAffordabilityResult }) => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  const [existingEmi, setExistingEmi] = useState<number>(0);
  const [downPaymentRatio, setDownPaymentRatio] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [tenure, setTenure] = useState<number>(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculateAffordability = () => {
    console.log('Calculating affordability with parameters:', {
      monthlyIncome,
      monthlyExpenses,
      existingEmi,
      downPaymentRatio,
      interestRate,
      tenure
    });

    // Calculate available income for EMI
    const availableIncome = monthlyIncome - monthlyExpenses - existingEmi;
    const maxAffordableEmi = Math.min(availableIncome, monthlyIncome * 0.4); // Max 40% of income
    
    // Calculate max loan amount using EMI formula
    const monthlyRate = interestRate / (12 * 100);
    const totalMonths = tenure * 12;
    
    let maxLoanAmount = 0;
    if (monthlyRate === 0) {
      maxLoanAmount = maxAffordableEmi * totalMonths;
    } else {
      maxLoanAmount = (maxAffordableEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / 
                     (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
    }
    
    // Calculate total property value
    const downPaymentAmount = (maxLoanAmount * downPaymentRatio) / (100 - downPaymentRatio);
    const totalPropertyValue = maxLoanAmount + downPaymentAmount;
    
    setResult({
      monthlyIncome,
      monthlyExpenses,
      existingEmi,
      availableIncome,
      maxAffordableEmi,
      maxLoanAmount,
      downPaymentAmount,
      downPaymentRatio,
      totalPropertyValue,
      interestRate,
      tenure
    });
  };

  const handleProceedWithAmount = () => {
    if (result?.totalPropertyValue) {
      onAffordabilityResult(result.totalPropertyValue);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-600" />
              Calculate Affordability
            </CardTitle>
            <p className="text-sm text-gray-600">
              See what property value you can comfortably afford
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome" className="text-sm font-medium text-gray-700">
                Monthly Income (₹): {monthlyIncome > 0 && numberToWords(monthlyIncome)}
              </Label>
              <Slider
                value={[monthlyIncome]}
                onValueChange={(value) => setMonthlyIncome(value[0])}
                max={500000}
                min={0}
                step={1000}
                className="w-full"
              />
              <Input
                id="monthlyIncome"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                className="text-lg font-medium border-gray-300 focus:border-blue-500"
                placeholder="Enter monthly income"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyExpenses" className="text-sm font-medium text-gray-700">
                Monthly Expenses (₹): {monthlyExpenses > 0 && numberToWords(monthlyExpenses)}
              </Label>
              <Slider
                value={[monthlyExpenses]}
                onValueChange={(value) => setMonthlyExpenses(value[0])}
                max={200000}
                min={0}
                step={1000}
                className="w-full"
              />
              <Input
                id="monthlyExpenses"
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                className="text-lg font-medium border-gray-300 focus:border-red-500"
                placeholder="Enter monthly expenses"
              />
              <p className="text-xs text-gray-500">
                Living expenses, rent, utilities, etc.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="existingEmiAfford" className="text-sm font-medium text-gray-700">
                Existing EMIs (₹): {existingEmi > 0 && numberToWords(existingEmi)}
              </Label>
              <Slider
                value={[existingEmi]}
                onValueChange={(value) => setExistingEmi(value[0])}
                max={50000}
                min={0}
                step={500}
                className="w-full"
              />
              <Input
                id="existingEmiAfford"
                type="number"
                value={existingEmi}
                onChange={(e) => setExistingEmi(Number(e.target.value))}
                className="border-gray-300 focus:border-red-500"
                placeholder="Enter existing EMI amount"
              />
              <p className="text-xs text-gray-500">
                Car loan, personal loan, etc.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="downPaymentRatio" className="text-sm font-medium text-gray-700">
                Down Payment (%): {downPaymentRatio}%
              </Label>
              <Slider
                value={[downPaymentRatio]}
                onValueChange={(value) => setDownPaymentRatio(value[0])}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
              <Input
                id="downPaymentRatio"
                type="number"
                value={downPaymentRatio}
                onChange={(e) => setDownPaymentRatio(Number(e.target.value))}
                className="text-lg font-medium border-gray-300 focus:border-green-500"
                placeholder="Enter down payment percentage"
              />
              <p className="text-xs text-gray-500">
                Percentage of property value as down payment
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="affordInterestRate" className="text-sm font-medium text-gray-700">
                Interest Rate (% p.a.): {interestRate}%
              </Label>
              <Slider
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
                max={18}
                min={6}
                step={0.1}
                className="w-full"
              />
              <Input
                id="affordInterestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="text-lg font-medium border-gray-300 focus:border-blue-500"
                placeholder="Enter interest rate"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="affordTenure" className="text-sm font-medium text-gray-700">
                Loan Tenure (Years): {tenure} years
              </Label>
              <Slider
                value={[tenure]}
                onValueChange={(value) => setTenure(value[0])}
                max={30}
                min={5}
                step={1}
                className="w-full"
              />
              <Input
                id="affordTenure"
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="text-lg font-medium border-gray-300 focus:border-blue-500"
                placeholder="Enter loan tenure"
              />
            </div>

            <Button 
              onClick={handleCalculateAffordability}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Affordability
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {result ? (
            <>
              {/* Affordable Property Value */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-green-800 flex items-center gap-2">
                    <Home className="h-5 w-5 text-green-600" />
                    Affordable Property Value
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-700 mb-2">
                      ₹{result.totalPropertyValue.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-green-600 font-medium">Maximum Property Value</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-700">
                        ₹{result.maxLoanAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Loan Amount</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-700">
                        ₹{result.downPaymentAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Down Payment</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* EMI Details */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    EMI & Income Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700 mb-2">
                      ₹{result.maxAffordableEmi.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">Monthly EMI</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-700">
                        ₹{result.availableIncome.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Available Income</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-700">
                        {((result.maxAffordableEmi / result.monthlyIncome) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600">Of Monthly Income</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Income Breakdown */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    Income Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Income</span>
                      <span className="font-semibold text-green-600">₹{result.monthlyIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Expenses</span>
                      <span className="font-semibold text-red-600">-₹{result.monthlyExpenses.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Existing EMIs</span>
                      <span className="font-semibold text-red-600">-₹{result.existingEmi.toLocaleString('en-IN')}</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Available for Home EMI</span>
                      <span className="font-bold text-blue-600">₹{result.availableIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Recommended EMI (Max 40%)</span>
                      <span className="font-bold text-blue-600">₹{result.maxAffordableEmi.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Button */}
              <Button 
                onClick={handleProceedWithAmount}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
              >
                <PiggyBank className="mr-2 h-5 w-5" />
                Calculate EMI for ₹{result.totalPropertyValue.toLocaleString('en-IN')} Property
              </Button>
            </>
          ) : (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Calculate Your Affordability
                </h3>
                <p className="text-gray-600">
                  Enter your income, expenses, and preferences to see what property value you can afford.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AffordabilityCalculator;
