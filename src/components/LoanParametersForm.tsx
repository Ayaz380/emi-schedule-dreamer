
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, PiggyBank } from 'lucide-react';

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
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <PiggyBank className="h-5 w-5 text-green-600" />
          Loan Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="loanAmount" className="text-sm font-medium text-gray-700">
            Loan Amount (₹)
          </Label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => onLoanAmountChange(Number(e.target.value))}
            className="text-lg font-medium border-gray-300 focus:border-blue-500"
            placeholder="50,00,000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700">
            Interest Rate (% p.a.)
          </Label>
          <Input
            id="interestRate"
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => onInterestRateChange(Number(e.target.value))}
            className="text-lg font-medium border-gray-300 focus:border-blue-500"
            placeholder="8.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenure" className="text-sm font-medium text-gray-700">
            Loan Tenure (Years)
          </Label>
          <Input
            id="tenure"
            type="number"
            value={tenure}
            onChange={(e) => onTenureChange(Number(e.target.value))}
            className="text-lg font-medium border-gray-300 focus:border-blue-500"
            placeholder="20"
          />
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            Prepayment Options
          </h3>
          
          <div className="space-y-2">
            <Label htmlFor="annualPrepayment" className="text-sm font-medium text-gray-700">
              Lumpsum Pre-Payment Every Year (₹)
            </Label>
            <Input
              id="annualPrepayment"
              type="number"
              value={annualPrepayment}
              onChange={(e) => onAnnualPrepaymentChange(Number(e.target.value))}
              className="border-gray-300 focus:border-green-500"
              placeholder="1,00,000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="prepaymentIncrease" className="text-sm font-medium text-gray-700">
              Increase Prepayment Every Year (%)
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
              Increase EMI Every Year (%)
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

        <Button 
          onClick={onCalculate}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Calculate
        </Button>
      </CardContent>
    </Card>
  );
};

export default LoanParametersForm;
