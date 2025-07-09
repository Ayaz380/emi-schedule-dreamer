
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PiggyBank, TrendingDown, Clock, DollarSign } from 'lucide-react';
import { AmortizationResult } from '@/utils/emiCalculations';

interface SavingsComparisonProps {
  standardScenario: AmortizationResult;
  withPrepaymentScenario: AmortizationResult;
  totalSavings: number;
  tenureReduction: number;
}

const SavingsComparison: React.FC<SavingsComparisonProps> = ({
  standardScenario,
  withPrepaymentScenario,
  totalSavings,
  tenureReduction
}) => {
  const savingsPercentage = ((totalSavings / standardScenario.totalInterest) * 100).toFixed(1);
  const tenureReductionMonths = Math.round(tenureReduction * 12);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Without Prepayment */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-rose-100">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-red-700 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Without Prepayment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-800">
                ₹{standardScenario.totalInterest.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-red-600 font-medium">Total Interest</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-800">
                {standardScenario.actualTenure}
              </div>
              <div className="text-sm text-red-600 font-medium">Years</div>
            </div>
          </div>
          <Separator className="bg-red-200" />
          <div className="text-center">
            <div className="text-lg font-semibold text-red-700">
              ₹{standardScenario.totalAmountPaid.toLocaleString('en-IN')}
            </div>
            <div className="text-sm text-red-600">Total Amount Paid</div>
          </div>
        </CardContent>
      </Card>

      {/* With Prepayment */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-green-700 flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            With Prepayment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">
                ₹{withPrepaymentScenario.totalInterest.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-green-600 font-medium">Total Interest</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">
                {withPrepaymentScenario.actualTenure}
              </div>
              <div className="text-sm text-green-600 font-medium">Years</div>
            </div>
          </div>
          <Separator className="bg-green-200" />
          <div className="text-center">
            <div className="text-lg font-semibold text-green-700">
              ₹{withPrepaymentScenario.totalAmountPaid.toLocaleString('en-IN')}
            </div>
            <div className="text-sm text-green-600">Total Amount Paid</div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Summary */}
      <Card className="md:col-span-2 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-cyan-100">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-blue-700 flex items-center gap-2">
            <TrendingDown className="h-6 w-6" />
            Your Savings Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">
                ₹{totalSavings.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-blue-600 font-medium">Interest Saved</div>
              <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-700">
                {savingsPercentage}% savings
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">
                {tenureReduction.toFixed(1)}
              </div>
              <div className="text-sm text-blue-600 font-medium">Years Saved</div>
              <Badge variant="secondary" className="mt-2 bg-green-100 text-green-700">
                {tenureReductionMonths} months
              </Badge>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">
                ₹{withPrepaymentScenario.totalPrepayments.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-blue-600 font-medium">Total Prepayments</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-800 mb-2">
                {((totalSavings / withPrepaymentScenario.totalPrepayments) * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-blue-600 font-medium">Return on Prepayment</div>
              <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-700">
                <Clock className="h-3 w-3 mr-1" />
                Excellent ROI
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SavingsComparison;
