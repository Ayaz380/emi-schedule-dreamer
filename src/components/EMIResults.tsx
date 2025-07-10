
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import PaymentChart from './PaymentChart';
import AmortizationTable from './AmortizationTable';
import SavingsComparison from './SavingsComparison';

interface EMIResultsProps {
  results: {
    basicEMI: number;
    standardScenario: any;
    withPrepaymentScenario: any;
    totalSavings: number;
    tenureReduction: number;
  } | null;
}

const EMIResults = ({ results }: EMIResultsProps) => {
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

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700 mb-2">
                ₹{results.basicEMI.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-green-600 font-medium">Monthly EMI</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-amber-100">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-700 mb-2">
                ₹{results.totalSavings.toLocaleString('en-IN')}
              </div>
              <div className="text-sm text-orange-600 font-medium">Total Interest Saved</div>
            </div>
          </CardContent>
        </Card>
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

export default EMIResults;
