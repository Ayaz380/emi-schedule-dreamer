
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Calculator, Heart, Users } from 'lucide-react';
import { numberToWords } from '@/utils/numberToWords';

const InsuranceCalculator = () => {
  // Life Insurance State
  const [age, setAge] = useState<number>(0);
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [coverageMultiplier, setCoverageMultiplier] = useState<number>(0);
  const [policyTerm, setPolicyTerm] = useState<number>(0);
  
  // Health Insurance State
  const [healthAge, setHealthAge] = useState<number>(0);
  const [familySize, setFamilySize] = useState<number>(0);
  const [sumInsured, setSumInsured] = useState<number>(0);
  const [city, setCity] = useState<string>('metro');
  
  const [lifeResults, setLifeResults] = useState<any>(null);
  const [healthResults, setHealthResults] = useState<any>(null);

  const calculateLifeInsurance = () => {
    const coverageAmount = annualIncome * coverageMultiplier;
    
    // Premium calculation based on age and term
    let baseRate = 0.5; // Base rate per 1000 sum assured
    
    // Age factor
    if (age <= 25) baseRate = 0.4;
    else if (age <= 35) baseRate = 0.5;
    else if (age <= 45) baseRate = 0.7;
    else if (age <= 55) baseRate = 1.0;
    else baseRate = 1.5;
    
    // Term factor
    if (policyTerm <= 15) baseRate *= 0.9;
    else if (policyTerm <= 25) baseRate *= 1.0;
    else baseRate *= 1.2;
    
    const annualPremium = (coverageAmount / 1000) * baseRate * 12;
    const totalPremium = annualPremium * policyTerm;
    
    setLifeResults({
      coverageAmount: Math.round(coverageAmount),
      annualPremium: Math.round(annualPremium),
      monthlyPremium: Math.round(annualPremium / 12),
      totalPremium: Math.round(totalPremium),
      age,
      policyTerm
    });
  };

  const calculateHealthInsurance = () => {
    let basePremium = 5000; // Base premium
    
    // Sum insured factor
    const siMultiplier = sumInsured / 500000;
    basePremium *= siMultiplier;
    
    // Age factor
    if (healthAge <= 25) basePremium *= 0.8;
    else if (healthAge <= 35) basePremium *= 1.0;
    else if (healthAge <= 45) basePremium *= 1.3;
    else if (healthAge <= 55) basePremium *= 1.8;
    else basePremium *= 2.5;
    
    // Family size factor
    if (familySize === 1) basePremium *= 0.7;
    else if (familySize === 2) basePremium *= 1.0;
    else if (familySize <= 4) basePremium *= 1.4;
    else basePremium *= 1.8;
    
    // City factor
    if (city === 'metro') basePremium *= 1.2;
    else if (city === 'tier1') basePremium *= 1.0;
    else basePremium *= 0.8;
    
    const annualPremium = Math.round(basePremium);
    
    setHealthResults({
      sumInsured,
      annualPremium,
      monthlyPremium: Math.round(annualPremium / 12),
      familySize,
      age: healthAge,
      city
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Shield className="h-10 w-10 text-blue-600" />
            Insurance Calculators
          </h1>
          <p className="text-lg text-gray-600">
            Calculate insurance premiums and coverage amounts
          </p>
        </div>

        <Tabs defaultValue="life" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="life">Life Insurance</TabsTrigger>
            <TabsTrigger value="health">Health Insurance</TabsTrigger>
          </TabsList>

          <TabsContent value="life">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Life Insurance Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="age">Age (18 - 65 years)</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[age]}
                          onValueChange={(value) => setAge(value[0])}
                          min={18}
                          max={65}
                          step={1}
                          className="w-full"
                        />
                        <Input
                          id="age"
                          type="number"
                          value={age}
                          onChange={(e) => setAge(Number(e.target.value))}
                          className="text-lg font-medium"
                          min={18}
                          max={65}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="annualIncome">Annual Income (₹3L - ₹2Cr)</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[annualIncome]}
                          onValueChange={(value) => setAnnualIncome(value[0])}
                          min={300000}
                          max={20000000}
                          step={100000}
                          className="w-full"
                        />
                        <Input
                          id="annualIncome"
                          type="number"
                          value={annualIncome}
                          onChange={(e) => setAnnualIncome(Number(e.target.value))}
                          className="text-lg font-medium"
                          min={300000}
                          max={20000000}
                        />
                        <p className="text-xs text-gray-500">
                          {numberToWords(annualIncome)} Rupees
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="coverageMultiplier">Coverage Multiplier (5x - 20x)</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[coverageMultiplier]}
                          onValueChange={(value) => setCoverageMultiplier(value[0])}
                          min={5}
                          max={20}
                          step={1}
                          className="w-full"
                        />
                        <Input
                          id="coverageMultiplier"
                          type="number"
                          value={coverageMultiplier}
                          onChange={(e) => setCoverageMultiplier(Number(e.target.value))}
                          className="text-lg font-medium"
                          min={5}
                          max={20}
                        />
                        <p className="text-xs text-gray-500">
                          Coverage: ₹{(annualIncome * coverageMultiplier).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="policyTerm">Policy Term (10 - 40 years)</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[policyTerm]}
                          onValueChange={(value) => setPolicyTerm(value[0])}
                          min={10}
                          max={40}
                          step={5}
                          className="w-full"
                        />
                        <Input
                          id="policyTerm"
                          type="number"
                          value={policyTerm}
                          onChange={(e) => setPolicyTerm(Number(e.target.value))}
                          className="text-lg font-medium"
                          min={10}
                          max={40}
                        />
                      </div>
                    </div>

                    <Button 
                      onClick={calculateLifeInsurance}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate Life Insurance
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                {lifeResults ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-green-700 mb-2">
                            ₹{lifeResults.coverageAmount.toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-green-600 font-medium">Life Coverage</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {numberToWords(lifeResults.coverageAmount)} Rupees
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-blue-700 mb-2">
                            ₹{lifeResults.monthlyPremium.toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-blue-600 font-medium">Monthly Premium</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {numberToWords(lifeResults.monthlyPremium)} Rupees
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Policy Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Annual Premium:</span>
                              <span className="font-semibold">₹{lifeResults.annualPremium.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Policy Term:</span>
                              <span className="font-semibold">{lifeResults.policyTerm} years</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Premium:</span>
                              <span className="font-semibold">₹{lifeResults.totalPremium.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between border-t pt-2">
                              <span className="text-gray-900 font-medium">Entry Age:</span>
                              <span className="font-bold text-blue-600">{lifeResults.age} years</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Ready to Calculate
                      </h3>
                      <p className="text-gray-600">
                        Enter your details to calculate life insurance premium and coverage.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="health">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-600" />
                      Health Insurance Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="healthAge">Age (18 - 80 years)</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[healthAge]}
                          onValueChange={(value) => setHealthAge(value[0])}
                          min={18}
                          max={80}
                          step={1}
                          className="w-full"
                        />
                        <Input
                          id="healthAge"
                          type="number"
                          value={healthAge}
                          onChange={(e) => setHealthAge(Number(e.target.value))}
                          className="text-lg font-medium"
                          min={18}
                          max={80}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="sumInsured">Sum Insured (₹2L - ₹50L)</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[sumInsured]}
                          onValueChange={(value) => setSumInsured(value[0])}
                          min={200000}
                          max={5000000}
                          step={100000}
                          className="w-full"
                        />
                        <Input
                          id="sumInsured"
                          type="number"
                          value={sumInsured}
                          onChange={(e) => setSumInsured(Number(e.target.value))}
                          className="text-lg font-medium"
                          min={200000}
                          max={5000000}
                        />
                        <p className="text-xs text-gray-500">
                          {numberToWords(sumInsured)} Rupees
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="familySize">Family Size (1 - 6 members)</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[familySize]}
                          onValueChange={(value) => setFamilySize(value[0])}
                          min={1}
                          max={6}
                          step={1}
                          className="w-full"
                        />
                        <Input
                          id="familySize"
                          type="number"
                          value={familySize}
                          onChange={(e) => setFamilySize(Number(e.target.value))}
                          className="text-lg font-medium"
                          min={1}
                          max={6}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>City Type</Label>
                      <Select value={city} onValueChange={setCity}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="metro">Metro Cities</SelectItem>
                          <SelectItem value="tier1">Tier 1 Cities</SelectItem>
                          <SelectItem value="tier2">Tier 2/3 Cities</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={calculateHealthInsurance}
                      className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 text-lg"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Calculate Health Insurance
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                {healthResults ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-green-700 mb-2">
                            ₹{healthResults.sumInsured.toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-green-600 font-medium">Sum Insured</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {numberToWords(healthResults.sumInsured)} Rupees
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
                        <CardContent className="p-6 text-center">
                          <div className="text-3xl font-bold text-red-700 mb-2">
                            ₹{healthResults.monthlyPremium.toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-red-600 font-medium">Monthly Premium</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {numberToWords(healthResults.monthlyPremium)} Rupees
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle>Policy Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Annual Premium:</span>
                            <span className="font-semibold">₹{healthResults.annualPremium.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Family Size:</span>
                            <span className="font-semibold">{healthResults.familySize} members</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">City Type:</span>
                            <span className="font-semibold capitalize">{healthResults.city}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-900 font-medium">Entry Age:</span>
                            <span className="font-bold text-red-600">{healthResults.age} years</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Ready to Calculate
                      </h3>
                      <p className="text-gray-600">
                        Enter your details to calculate health insurance premium.
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

export default InsuranceCalculator;
