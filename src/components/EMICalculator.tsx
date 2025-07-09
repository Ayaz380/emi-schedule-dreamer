
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calculator, TrendingUp, PiggyBank, Calendar } from 'lucide-react';
import { calculateEMI, calculateAmortizationSchedule } from '@/utils/emiCalculations';
import PaymentChart from './PaymentChart';
import AmortizationTable from './AmortizationTable';
import SavingsComparison from './SavingsComparison';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [annualPrepayment, setAnnualPrepayment] = useState<number>(100000);
  const [prepaymentIncrease, setPrepaymentIncrease] = useState<number>(0);
  const [emiIncrease, setEmiIncrease] = useState<number>(0);
  const [results, setResults] = useState<any>(null);

  const handleCalculate = () => {
    console.log('Calculating EMI with parameters:', {
      loanAmount,
      interestRate,
      tenure,
      annualPrepayment,
      prepaymentIncrease,
      emiIncrease
    });

    const basicEMI = calculateEMI(loanAmount, interestRate, tenure);
    
    // Calculate scenarios
    const standardScenario = calculateAmortizationSchedule({
      loanAmount,
      interestRate,
      tenure,
      annualPrepayment: 0,
      prepaymentIncrease: 0,
      emiIncrease: 0
    });

    const withPrepaymentScenario = calculateAmortizationSchedule({
      loanAmount,
      interestRate,
      tenure,
      annualPrepayment,
      prepaymentIncrease,
      emiIncrease
    });

    setResults({
      basicEMI,
      standardScenario,
      withPrepaymentScenario,
      totalSavings: standardScenario.totalInterest - withPrepaymentScenario.totalInterest,
      tenureReduction: standardScenario.actualTenure - withPrepaymentScenario.actualTenure
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Calculator className="h-10 w-10 text-blue-600" />
            Home Loan EMI Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Calculate EMI with prepayment options and savings analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <div className="lg:col-span-1">
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
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
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
                    onChange={(e) => setInterestRate(Number(e.target.value))}
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
                    onChange={(e) => setTenure(Number(e.target.value))}
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
                      onChange={(e) => setAnnualPrepayment(Number(e.target.value))}
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
                      onChange={(e) => setPrepaymentIncrease(Number(e.target.value))}
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
                      onChange={(e) => setEmiIncrease(Number(e.target.value))}
                      className="border-gray-300 focus:border-orange-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
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
              </>
            )}

            {!results && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
