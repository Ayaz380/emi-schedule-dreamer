
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { calculateEMI, calculateAmortizationSchedule } from '@/utils/emiCalculations';
import EnhancedTabNavigation from './EnhancedTabNavigation';
import LoanParametersForm from './LoanParametersForm';
import EnhancedEMIResults from './EnhancedEMIResults';
import EligibilityCalculator from './EligibilityCalculator';
import AffordabilityCalculator from './AffordabilityCalculator';
import SIPCalculator from './SIPCalculator';
import TaxCalculator from './TaxCalculator';
import PropertyCalculator from './PropertyCalculator';
import FDCalculator from './FDCalculator';
import PPFCalculator from './PPFCalculator';
import InsuranceCalculator from './InsuranceCalculator';
import LoanComparison from './LoanComparison';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(5000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);
  const [annualPrepayment, setAnnualPrepayment] = useState<number>(100000);
  const [prepaymentIncrease, setPrepaymentIncrease] = useState<number>(0);
  const [emiIncrease, setEmiIncrease] = useState<number>(0);
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'affordability' | 'eligibility' | 'calculator' | 'sip' | 'tax' | 'property' | 'fd' | 'ppf' | 'insurance' | 'comparison'>('affordability');

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

  const handleEligibilityResult = (eligibleAmount: number) => {
    setLoanAmount(eligibleAmount);
    setActiveTab('calculator');
  };

  const handleAffordabilityResult = (affordableAmount: number) => {
    setLoanAmount(affordableAmount * 0.8); // Assuming 80% loan, 20% down payment
    setActiveTab('calculator');
  };

  // Render specific calculator based on active tab
  const renderCalculator = () => {
    switch (activeTab) {
      case 'sip':
        return <SIPCalculator />;
      case 'tax':
        return <TaxCalculator />;
      case 'property':
        return <PropertyCalculator />;
      case 'fd':
        return <FDCalculator />;
      case 'ppf':
        return <PPFCalculator />;
      case 'insurance':
        return <InsuranceCalculator />;
      case 'comparison':
        return <LoanComparison />;
      case 'affordability':
        return <AffordabilityCalculator onAffordabilityResult={handleAffordabilityResult} />;
      case 'eligibility':
        return <EligibilityCalculator onEligibilityResult={handleEligibilityResult} />;
      default:
        return (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <LoanParametersForm
                loanAmount={loanAmount}
                interestRate={interestRate}
                tenure={tenure}
                annualPrepayment={annualPrepayment}
                prepaymentIncrease={prepaymentIncrease}
                emiIncrease={emiIncrease}
                onLoanAmountChange={setLoanAmount}
                onInterestRateChange={setInterestRate}
                onTenureChange={setTenure}
                onAnnualPrepaymentChange={setAnnualPrepayment}
                onPrepaymentIncreaseChange={setPrepaymentIncrease}
                onEmiIncreaseChange={setEmiIncrease}
                onCalculate={handleCalculate}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              <EnhancedEMIResults results={results} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Calculator className="h-8 md:h-10 w-8 md:w-10 text-blue-600" />
            Financial Calculators Suite
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Comprehensive financial planning tools for all your needs
          </p>
        </div>

        <EnhancedTabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {renderCalculator()}
      </div>
    </div>
  );
};

export default EMICalculator;
