export interface AmortizationRow {
  month: number;
  year: number;
  emi: number;
  principal: number;
  interest: number;
  prepayment: number;
  balance: number;
  totalPaid: number;
}

export interface AmortizationResult {
  schedule: AmortizationRow[];
  totalInterest: number;
  totalPrincipal: number;
  totalPrepayments: number;
  actualTenure: number;
  totalAmountPaid: number;
}

export interface CalculationParams {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  annualPrepayment: number;
  prepaymentIncrease: number;
  emiIncrease: number;
}

export const calculateEMI = (principal: number, annualRate: number, tenureYears: number): number => {
  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  
  if (monthlyRate === 0) {
    return principal / totalMonths;
  }
  
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  return Math.round(emi);
};

export const calculateAmortizationSchedule = (params: CalculationParams): AmortizationResult => {
  const { loanAmount, interestRate, tenure, annualPrepayment, prepaymentIncrease, emiIncrease } = params;
  
  const monthlyRate = interestRate / (12 * 100);
  let baseEMI = calculateEMI(loanAmount, interestRate, tenure);
  let currentEMI = baseEMI;
  let balance = loanAmount;
  let month = 1;
  let totalInterest = 0;
  let totalPrepayments = 0;
  let totalPaid = 0;
  
  const schedule: AmortizationRow[] = [];
  
  while (balance > 1 && month <= tenure * 12) {
    const currentYear = Math.ceil(month / 12);
    const isEndOfYear = month % 12 === 0;
    
    // Calculate interest for this month
    const interestComponent = balance * monthlyRate;
    
    // Calculate principal component
    let principalComponent = currentEMI - interestComponent;
    
    // Ensure we don't pay more principal than remaining balance
    if (principalComponent > balance) {
      principalComponent = balance;
      currentEMI = principalComponent + interestComponent;
    }
    
    // Calculate prepayment for this month
    let prepayment = 0;
    if (isEndOfYear && annualPrepayment > 0) {
      const yearsSinceStart = currentYear - 1;
      const adjustedPrepayment = annualPrepayment * Math.pow(1 + prepaymentIncrease / 100, yearsSinceStart);
      prepayment = Math.min(adjustedPrepayment, balance - principalComponent);
    }
    
    // Update balance
    balance = balance - principalComponent - prepayment;
    
    // Update totals
    totalInterest += interestComponent;
    totalPrepayments += prepayment;
    totalPaid += currentEMI + prepayment;
    
    // Add to schedule
    schedule.push({
      month,
      year: currentYear,
      emi: Math.round(currentEMI),
      principal: Math.round(principalComponent),
      interest: Math.round(interestComponent),
      prepayment: Math.round(prepayment),
      balance: Math.round(Math.max(0, balance)),
      totalPaid: Math.round(totalPaid)
    });
    
    // Break if loan is fully paid
    if (balance <= 1) {
      break;
    }
    
    // Increase EMI annually if specified
    if (isEndOfYear && emiIncrease > 0) {
      currentEMI = currentEMI * (1 + emiIncrease / 100);
    }
    
    month++;
  }
  
  return {
    schedule,
    totalInterest: Math.round(totalInterest),
    totalPrincipal: loanAmount,
    totalPrepayments: Math.round(totalPrepayments),
    actualTenure: Math.round((schedule.length / 12) * 10) / 10,
    totalAmountPaid: Math.round(totalPaid)
  };
};

export const calculateMaxLoanAmount = (maxEmi: number, annualRate: number, tenureYears: number): number => {
  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  
  if (monthlyRate === 0) {
    return maxEmi * totalMonths;
  }
  
  const maxLoanAmount = (maxEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / 
                        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
  
  return Math.round(maxLoanAmount);
};
