
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, Calculator, TrendingUp } from 'lucide-react';

const PropertyCalculator = () => {
  // Rent vs Buy Calculator State
  const [propertyPrice, setPropertyPrice] = useState<number>(5000000);
  const [downPayment, setDownPayment] = useState<number>(20);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(8.5);
  const [loanTenure, setLoanTenure] = useState<number>(20);
  const [monthlyRent, setMonthlyRent] = useState<number>(25000);
  const [rentIncrease, setRentIncrease] = useState<number>(5);
  const [propertyAppreciation, setPropertyAppreciation] = useState<number>(6);
  const [investmentReturn, setInvestmentReturn] = useState<number>(12);
  
  // Stamp Duty Calculator State
  const [stampDutyPropertyValue, setStampDutyPropertyValue] = useState<number>(5000000);
  const [selectedState, setSelectedState] = useState<string>('maharashtra');
  
  const [results, setResults] = useState<any>(null);
  const [stampDutyResults, setStampDutyResults] = useState<any>(null);

  const stampDutyRates: { [key: string]: { rate: number; name: string } } = {
    'maharashtra': { rate: 5, name: 'Maharashtra' },
    'delhi': { rate: 6, name: 'Delhi' },
    'karnataka': { rate: 5.6, name: 'Karnataka' },
    'gujarat': { rate: 4.9, name: 'Gujarat' },
    'rajasthan': { rate: 5, name: 'Rajasthan' },
    'punjab': { rate: 6, name: 'Punjab' },
    'haryana': { rate: 6, name: 'Haryana' },
    'up': { rate: 7, name: 'Uttar Pradesh' }
  };

  const calculateRentVsBuy = () => {
    const loanAmount = propertyPrice * (1 - downPayment / 100);
    const downPaymentAmount = propertyPrice * (downPayment / 100);
    
    // Calculate EMI
    const monthlyRate = loanInterestRate / (12 * 100);
    const totalMonths = loanTenure * 12;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

    // Additional monthly costs for buying
    const maintenanceCost = propertyPrice * 0.001; // 0.1% of property value per month
    const propertyTax = propertyPrice * 0.0008; // 0.08% annually / 12
    const totalMonthlyCostBuying = emi + maintenanceCost + propertyTax;

    // Calculate 10-year projections
    const years = 10;
    let totalRentPaid = 0;
    let currentRent = monthlyRent;
    
    for (let year = 1; year <= years; year++) {
      totalRentPaid += currentRent * 12;
      currentRent = currentRent * (1 + rentIncrease / 100);
    }

    // Future property value
    const futurePropertyValue = propertyPrice * Math.pow(1 + propertyAppreciation / 100, years);
    
    // Investment opportunity cost (if down payment was invested)
    const investmentGrowth = downPaymentAmount * Math.pow(1 + investmentReturn / 100, years);
    
    // Total cost of buying (EMIs + down payment opportunity cost)
    const totalEMIPaid = emi * 12 * years;
    const totalCostBuying = totalEMIPaid + (investmentGrowth - downPaymentAmount);
    
    // Net position after 10 years
    const netPositionBuying = futurePropertyValue - totalCostBuying;
    const netPositionRenting = investmentGrowth - totalRentPaid;

    setResults({
      emi: Math.round(emi),
      totalMonthlyCostBuying: Math.round(totalMonthlyCostBuying),
      monthlyRent,
      totalRentPaid: Math.round(totalRentPaid),
      totalCostBuying: Math.round(totalCostBuying),
      futurePropertyValue: Math.round(futurePropertyValue),
      netPositionBuying: Math.round(netPositionBuying),
      netPositionRenting: Math.round(netPositionRenting),
      recommendation: netPositionBuying > netPositionRenting ? 'Buy' : 'Rent',
      difference: Math.abs(netPositionBuying - netPositionRenting)
    });
  };

  const calculateStampDuty = () => {
    const rate = stampDutyRates[selectedState].rate;
    const stampDuty = (stampDutyPropertyValue * rate) / 100;
    const registrationFee = (stampDutyPropertyValue * 1) / 100; // 1% registration fee
    const totalCost = stampDuty + registrationFee;

    setStampDutyResults({
      propertyValue: stampDutyPropertyValue,
      stampDuty: Math.round(stampDuty),
      registrationFee: Math.round(registrationFee),
      totalCost: Math.round(totalCost),
      state: stampDutyRates[selectedState].name,
      rate
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Home className="h-10 w-10 text-orange-600" />
            Property Calculators
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive property investment and cost calculators
          </p>
        </div>

        <Tabs defaultValue="rent-vs-buy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rent-vs-buy">Rent vs Buy</TabsTrigger>
            <TabsTrigger value="stamp-duty">Stamp Duty</TabsTrigger>
          </TabsList>

          <TabsContent value="rent-vs-buy">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Input Form */}
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      Comparison Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyPrice">Property Price (₹)</Label>
                      <Input
                        id="propertyPrice"
                        type="number"
                        value={propertyPrice}
                        onChange={(e) => setPropertyPrice(Number(e.target.value))}
                        className="text-lg font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="downPayment">Down Payment (%)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="text-lg font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="monthlyRent">Monthly Rent (₹)</Label>
                      <Input
                        id="monthlyRent"
                        type="number"
                        value={monthlyRent}
                        onChange={(e) => setMonthlyRent(Number(e.target.value))}
                        className="text-lg font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanInterestRate">Loan Interest Rate (%)</Label>
                      <Input
                        id="loanInterestRate"
                        type="number"
                        step="0.1"
                        value={loanInterestRate}
                        onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                        className="text-lg font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rentIncrease">Annual Rent Increase (%)</Label>
                      <Input
                        id="rentIncrease"
                        type="number"
                        value={rentIncrease}
                        onChange={(e) => setRentIncrease(Number(e.target.value))}
                        className="text-lg font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyAppreciation">Property Appreciation (%)</Label>
                      <Input
                        id="propertyAppreciation"
                        type="number"
                        value={propertyAppreciation}
                        onChange={(e) => setPropertyAppreciation(Number(e.target.value))}
                        className="text-lg font-medium"
                      />
                    </div>

                    <Button 
                      onClick={calculateRentVsBuy}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 text-lg"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Compare
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results */}
              <div className="lg:col-span-2">
                {results ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className={`shadow-lg border-0 ${results.recommendation === 'Buy' ? 'bg-gradient-to-br from-green-50 to-emerald-100' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-green-700 mb-2">
                            Buy
                          </div>
                          <div className="text-sm text-green-600 font-medium mb-2">Net Position (10 years)</div>
                          <div className="text-xl font-bold">₹{results.netPositionBuying.toLocaleString('en-IN')}</div>
                        </CardContent>
                      </Card>

                      <Card className={`shadow-lg border-0 ${results.recommendation === 'Rent' ? 'bg-gradient-to-br from-green-50 to-emerald-100' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-blue-700 mb-2">
                            Rent
                          </div>
                          <div className="text-sm text-blue-600 font-medium mb-2">Net Position (10 years)</div>
                          <div className="text-xl font-bold">₹{results.netPositionRenting.toLocaleString('en-IN')}</div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-center">
                          Recommendation: <span className="text-green-600 font-bold">{results.recommendation}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2">Monthly Costs</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>EMI:</span>
                                <span>₹{results.emi.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total (Buy):</span>
                                <span>₹{results.totalMonthlyCostBuying.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Rent:</span>
                                <span>₹{results.monthlyRent.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">10-Year Projection</h4>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Total Rent Paid:</span>
                                <span>₹{results.totalRentPaid.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Property Value:</span>
                                <span>₹{results.futurePropertyValue.toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between font-semibold">
                                <span>Advantage:</span>
                                <span>₹{results.difference.toLocaleString('en-IN')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Ready to Compare
                      </h3>
                      <p className="text-gray-600">
                        Enter property and rental details to see which option is better financially.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stamp-duty">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Stamp Duty Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="stampDutyPropertyValue">Property Value (₹)</Label>
                      <Input
                        id="stampDutyPropertyValue"
                        type="number"
                        value={stampDutyPropertyValue}
                        onChange={(e) => setStampDutyPropertyValue(Number(e.target.value))}
                        className="text-lg font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="selectedState">State</Label>
                      <select
                        id="selectedState"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full p-2 border rounded-md"
                      >
                        {Object.entries(stampDutyRates).map(([key, value]) => (
                          <option key={key} value={key}>{value.name}</option>
                        ))}
                      </select>
                    </div>

                    <Button 
                      onClick={calculateStampDuty}
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 text-lg"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                {stampDutyResults ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-blue-700 mb-2">
                            ₹{stampDutyResults.stampDuty.toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-blue-600 font-medium">Stamp Duty</div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-green-700 mb-2">
                            ₹{stampDutyResults.registrationFee.toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-green-600 font-medium">Registration Fee</div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-purple-100">
                        <CardContent className="p-6 text-center">
                          <div className="text-2xl font-bold text-purple-700 mb-2">
                            ₹{stampDutyResults.totalCost.toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-purple-600 font-medium">Total Cost</div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Cost Breakdown for {stampDutyResults.state}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Property Value:</span>
                            <span className="font-semibold">₹{stampDutyResults.propertyValue.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Stamp Duty Rate:</span>
                            <span className="font-semibold">{stampDutyResults.rate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Registration Fee Rate:</span>
                            <span className="font-semibold">1%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Calculate Stamp Duty
                      </h3>
                      <p className="text-gray-600">
                        Enter property details to calculate stamp duty and registration costs.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PropertyCalculator;
