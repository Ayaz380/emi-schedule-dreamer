
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { IndianRupee, Calculator, TrendingUp, CheckCircle, Home } from 'lucide-react';
import { calculateEMI, calculateMaxLoanAmount } from '@/utils/emiCalculations';

interface EligibilityCalculatorProps {
  onEligibilityResult: (eligibleAmount: number) => void;
}

const EligibilityCalculator: React.FC<EligibilityCalculatorProps> = ({ onEligibilityResult }) => {
  const [monthlySalary, setMonthlySalary] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [existingEmi, setExistingEmi] = useState<number>(0);
  const [ownContribution, setOwnContribution] = useState<number>(1000000);
  const [eligibilityResult, setEligibilityResult] = useState<any>(null);

  const handleCalculateEligibility = () => {
    console.log('Calculating eligibility with parameters:', {
      monthlySalary,
      interestRate,
      tenure,
      existingEmi,
      ownContribution
    });

    const maxAffordableEmi = (monthlySalary * 0.4) - existingEmi;
    const maxLoanAmount = calculateMaxLoanAmount(maxAffordableEmi, interestRate, tenure);
    const totalPurchasingPower = maxLoanAmount + ownContribution;
    
    setEligibilityResult({
      monthlySalary,
      maxAffordableEmi,
      maxLoanAmount,
      ownContribution,
      totalPurchasingPower,
      existingEmi,
      netAffordableEmi: maxAffordableEmi
    });
  };

  const handleProceedWithAmount = () => {
    if (eligibilityResult?.maxLoanAmount) {
      onEligibilityResult(eligibilityResult.maxLoanAmount);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-green-600" />
              Check Your Eligibility
            </CardTitle>
            <p className="text-sm text-gray-600">
              Based on 40% of your monthly salary for EMI
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="monthlySalary" className="text-sm font-medium text-gray-700">
                Monthly Salary (₹)
              </Label>
              <Input
                id="monthlySalary"
                type="number"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="text-lg font-medium border-gray-300 focus:border-blue-500"
                placeholder="1,00,000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ownContribution" className="text-sm font-medium text-gray-700">
                Own Contribution / Down Payment (₹)
              </Label>
              <Input
                id="ownContribution"
                type="number"
                value={ownContribution}
                onChange={(e) => setOwnContribution(Number(e.target.value))}
                className="text-lg font-medium border-gray-300 focus:border-green-500"
                placeholder="10,00,000"
              />
              <p className="text-xs text-gray-500">
                Cash available for down payment
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eligibilityInterestRate" className="text-sm font-medium text-gray-700">
                Expected Interest Rate (% p.a.)
              </Label>
              <Input
                id="eligibilityInterestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="text-lg font-medium border-gray-300 focus:border-blue-500"
                placeholder="8.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eligibilityTenure" className="text-sm font-medium text-gray-700">
                Desired Loan Tenure (Years)
              </Label>
              <Input
                id="eligibilityTenure"
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="text-lg font-medium border-gray-300 focus:border-blue-500"
                placeholder="20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="existingEmi" className="text-sm font-medium text-gray-700">
                Existing EMIs (₹)
              </Label>
              <Input
                id="existingEmi"
                type="number"
                value={existingEmi}
                onChange={(e) => setExistingEmi(Number(e.target.value))}
                className="border-gray-300 focus:border-red-500"
                placeholder="0"
              />
              <p className="text-xs text-gray-500">
                Any existing loan EMIs (car loan, personal loan, etc.)
              </p>
            </div>

            <Button 
              onClick={handleCalculateEligibility}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Check Eligibility
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {eligibilityResult ? (
            <>
              {/* Total Purchasing Power */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    Your Home Buying Power
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      ₹{eligibilityResult.totalPurchasingPower.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-blue-600 font-medium">Total Property Value You Can Afford</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-700">
                        ₹{eligibilityResult.maxLoanAmount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Loan Amount</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-700">
                        ₹{eligibilityResult.ownContribution.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Down Payment</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Loan Eligibility */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-green-800 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Your Loan Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700 mb-2">
                      ₹{eligibilityResult.maxLoanAmount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-sm text-green-600 font-medium">Maximum Loan Amount</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-700">
                        ₹{eligibilityResult.maxAffordableEmi.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Max Affordable EMI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-700">
                        40%
                      </div>
                      <div className="text-xs text-gray-600">Of Monthly Income</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Breakdown */}
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Financial Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Monthly Salary</span>
                      <span className="font-semibold">₹{eligibilityResult.monthlySalary.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Available for EMI (40%)</span>
                      <span className="font-semibold text-green-600">₹{(eligibilityResult.monthlySalary * 0.4).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Existing EMIs</span>
                      <span className="font-semibold text-red-600">-₹{eligibilityResult.existingEmi.toLocaleString('en-IN')}</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Net Available EMI</span>
                      <span className="font-bold text-blue-600">₹{eligibilityResult.netAffordableEmi.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Down Payment</span>
                      <span className="font-bold text-orange-600">₹{eligibilityResult.ownContribution.toLocaleString('en-IN')}</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-800">Total Property Value</span>
                      <span className="font-bold text-blue-700">₹{eligibilityResult.totalPurchasingPower.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Button */}
              <Button 
                onClick={handleProceedWithAmount}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calculate EMI for ₹{eligibilityResult.maxLoanAmount.toLocaleString('en-IN')}
              </Button>
            </>
          ) : (
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <IndianRupee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Check Your Eligibility
                </h3>
                <p className="text-gray-600">
                  Enter your monthly salary, down payment, and other details to see your home buying power.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default EligibilityCalculator;
