
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Calculator, TrendingUp, PiggyBank, AlertCircle } from 'lucide-react';

interface LoanParametersFormProps {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  annualPrepayment: number;
  prepaymentIncrease: number;
  emiIncrease: number;
  onLoanAmountChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onTenureChange: (value: number) => void;
  onAnnualPrepaymentChange: (value: number) => void;
  onPrepaymentIncreaseChange: (value: number) => void;
  onEmiIncreaseChange: (value: number) => void;
  onCalculate: () => void;
}

const LoanParametersForm = ({
  loanAmount,
  interestRate,
  tenure,
  annualPrepayment,
  prepaymentIncrease,
  emiIncrease,
  onLoanAmountChange,
  onInterestRateChange,
  onTenureChange,
  onAnnualPrepaymentChange,
  onPrepaymentIncreaseChange,
  onEmiIncreaseChange,
  onCalculate
}: LoanParametersFormProps) => {
  const validateLoanAmount = (value: number) => {
    return value >= 100000 && value <= 100000000;
  };

  const validateInterestRate = (value: number) => {
    return value >= 6 && value <= 18;
  };

  const validateTenure = (value: number) => {
    return value >= 5 && value <= 30;
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-green-600" />
          Loan Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="loanAmount" className="text-sm font-medium text-gray-700">
            Loan Amount (₹1L - ₹10Cr)
          </Label>
          <div className="space-y-2">
            <Slider
              value={[loanAmount]}
              onValueChange={(value) => onLoanAmountChange(value[0])}
              min={100000}
              max={10000000}
              step={100000}
              className="w-full"
            />
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => onLoanAmountChange(Number(e.target.value))}
              className={`text-lg font-medium ${
                validateLoanAmount(loanAmount) 
                  ? 'border-gray-300 focus:border-blue-500' 
                  : 'border-red-500 focus:border-red-500'
              }`}
              placeholder="50,00,000"
              min={100000}
              max={10000000}
            />
            {!validateLoanAmount(loanAmount) && (
              <div className="flex items-center gap-1 text-red-500 text-xs">
                <AlertCircle className="h-3 w-3" />
                Amount should be between ₹1L and ₹10Cr
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700">
            Interest Rate (6% - 18% p.a.)
          </Label>
          <div className="space-y-2">
            <Slider
              value={[interestRate]}
              onValueChange={(value) => onInterestRateChange(value[0])}
              min={6}
              max={18}
              step={0.1}
              className="w-full"
            />
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => onInterestRateChange(Number(e.target.value))}
              className={`text-lg font-medium ${
                validateInterestRate(interestRate) 
                  ? 'border-gray-300 focus:border-blue-500' 
                  : 'border-red-500 focus:border-red-500'
              }`}
              placeholder="8.5"
              min={6}
              max={18}
            />
            {!validateInterestRate(interestRate) && (
              <div className="flex items-center gap-1 text-red-500 text-xs">
                <AlertCircle className="h-3 w-3" />
                Rate should be between 6% and 18%
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="tenure" className="text-sm font-medium text-gray-700">
            Loan Tenure (5 - 30 Years)
          </Label>
          <div className="space-y-2">
            <Slider
              value={[tenure]}
              onValueChange={(value) => onTenureChange(value[0])}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
            <Input
              id="tenure"
              type="number"
              value={tenure}
              onChange={(e) => onTenureChange(Number(e.target.value))}
              className={`text-lg font-medium ${
                validateTenure(tenure) 
                  ? 'border-gray-300 focus:border-blue-500' 
                  : 'border-red-500 focus:border-red-500'
              }`}
              placeholder="20"
              min={5}
              max={30}
            />
            {!validateTenure(tenure) && (
              <div className="flex items-center gap-1 text-red-500 text-xs">
                <AlertCircle className="h-3 w-3" />
                Tenure should be between 5 and 30 years
              </div>
            )}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Advanced Options
          </h3>
          
          <div className="space-y-3">
            <Label htmlFor="annualPrepayment" className="text-sm font-medium text-gray-700">
              Annual Prepayment (₹)
            </Label>
            <div className="space-y-2">
              <Slider
                value={[annualPrepayment]}
                onValueChange={(value) => onAnnualPrepaymentChange(value[0])}
                min={0}
                max={1000000}
                step={10000}
                className="w-full"
              />
              <Input
                id="annualPrepayment"
                type="number"
                value={annualPrepayment}
                onChange={(e) => onAnnualPrepaymentChange(Number(e.target.value))}
                className="border-gray-300 focus:border-green-500"
                placeholder="1,00,000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prepaymentIncrease" className="text-sm font-medium text-gray-700">
                Prepayment Increase (% yearly)
              </Label>
              <Input
                id="prepaymentIncrease"
                type="number"
                step="0.1"
                value={prepaymentIncrease}
                onChange={(e) => onPrepaymentIncreaseChange(Number(e.target.value))}
                className="border-gray-300 focus:border-green-500"
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emiIncrease" className="text-sm font-medium text-gray-700">
                EMI Increase (% yearly)
              </Label>
              <Input
                id="emiIncrease"
                type="number"
                step="0.1"
                value={emiIncrease}
                onChange={(e) => onEmiIncreaseChange(Number(e.target.value))}
                className="border-gray-300 focus:border-orange-500"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={onCalculate}
          disabled={!validateLoanAmount(loanAmount) || !validateInterestRate(interestRate) || !validateTenure(tenure)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Calculate EMI
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoanParametersForm;
