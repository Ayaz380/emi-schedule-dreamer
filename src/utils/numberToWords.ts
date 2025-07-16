
export const numberToWords = (num: number): string => {
  if (num === 0) return 'Zero';
  
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
    'Seventeen', 'Eighteen', 'Nineteen'
  ];
  
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];
  
  const convertHundreds = (n: number): string => {
    let result = '';
    
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    
    if (n > 0) {
      result += ones[n] + ' ';
    }
    
    return result.trim();
  };
  
  if (num < 0) return 'Negative ' + numberToWords(-num);
  
  if (num < 1000) {
    return convertHundreds(num);
  }
  
  if (num < 100000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;
    let result = convertHundreds(thousands) + ' Thousand';
    if (remainder > 0) {
      result += ' ' + convertHundreds(remainder);
    }
    return result;
  }
  
  if (num < 10000000) {
    const lakhs = Math.floor(num / 100000);
    const remainder = num % 100000;
    let result = convertHundreds(lakhs) + ' Lakh';
    if (remainder > 0) {
      if (remainder >= 1000) {
        result += ' ' + numberToWords(remainder);
      } else {
        result += ' ' + convertHundreds(remainder);
      }
    }
    return result;
  }
  
  const crores = Math.floor(num / 10000000);
  const remainder = num % 10000000;
  let result = convertHundreds(crores) + ' Crore';
  if (remainder > 0) {
    result += ' ' + numberToWords(remainder);
  }
  
  return result;
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-IN');
};
