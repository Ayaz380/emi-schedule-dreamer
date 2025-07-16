
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Heart, Car, Calculator } from 'lucide-react';

const InsuranceCalculator = () => {
  // Life Insurance States
  const [age, setAge] = useState<number>(30);
  const [annualIncome, setAnnualIncome] = useState<number>(1000000);
  const [dependents, setDependents] = useState<number>(2);
  const [existingCover, setExistingCover] = useState<number>(0);
  
  // Health Insurance States
  const [healthAge, setHealthAge] = useState<number>(30);
  const [familySize, setFamilySize] = useState<number>(4);
  const [city, setCity] = useState<string>('metro');
  
  const [lifeResults, setLifeResults] = useState<any>(null);
  const [healthResults, setHealthResults] = useState<any>(null);

  const calculateLifeInsurance = () => {
    // Human Life Value method
    const workingYears = 60 - age;
    const growthRate = 0.06; // 6% income growth
    const inflationRate = 0.04; // 4% inflation
    const realGrowthRate = growthRate - inflationRate;
    
    // Present value of future income
    const futureIncomeValue = annualIncome * 
      ((Math.pow(1 + realGrowthRate, workingYears) - 1) / realGrowthRate);
    
    // Recommended cover (10-15 times annual income)
    const recommendedCover = annualIncome * 12;
    
    // Immediate needs (education, marriage, debt)
    const immediateNeeds = annualIncome * 2;
    
    const totalNeed = Math.max(futureIncomeValue * 0.7, recommendedCover) + immediateNeeds;
    const coverageGap = Math.max(0, totalNeed - existingCover);
    
    // Premium calculation (rough estimate)
    const premiumRate = age <= 30 ? 0.0015 : age <= 40 ? 0.002 : 0.003;
    const annualPremium = coverageGap * premiumRate;

    setLifeResults({
      recommendedCover: Math.round(totalNeed),
      coverageGap: Math.round(coverageGap),
      annualPremium: Math.round(annualPremium),
      monthlyPremium: Math.round(annualPremium / 12),
      workingYears
    });
  };

  const calculateHealthInsurance = () => {
    // Base premium rates per person
    const basePremiums: { [key: string]: { [key: string]: number } } = {
      'metro': {
        '18-30': 8000,
        '31-40': 12000,
        '41-50': 18000,
        '51-60': 25000
      },
      'tier1': {
        '18-30': 6000,
        '31-40': 9000,
        '41-50': 14000,
        '51-60': 20000
      },
      'tier2': {
        '18-30': 4500,
        '31-40': 7000,
        '41-50': 11000,
        '51-60': 16000
      }
    };

    const getAgeGroup = (age: number) => {
      if (age <= 30) return '18-30';
      if (age <= 40) return '31-40';
      if (age <= 50) return '41-50';
      return '51-60';
    };

    const ageGroup = getAgeGroup(healthAge);
    const basePremium = basePremiums[city][ageGroup];
    
    // Family multiplier
    const familyMultiplier = Math.min(familySize, 4) * 0.8 + 0.2;
    
    // Recommended coverage
    const recommendedCoverage = city === 'metro' ? 1000000 : city === 'tier1' ? 750000 : 500000;
    
    const totalPremium = basePremium * familyMultiplier;

    setHealthResults({
      recommendedCoverage,
      annualPremium: Math.round(totalPremium),
      monthlyPremium: Math.round(totalPremium / 12),
      familySize,
      city
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <Shield className="h-8 w-8 text-blue-600" />
          Insurance Calculator
        </h1>
        <p className="text-lg text-gray-600">Calculate your insurance needs and premiums</p>
      </div>

      <Tabs defaultValue="life" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="life" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Life Insurance
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Health Insurance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="life">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  Life Insurance Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Current Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income (₹)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    placeholder="10,00,000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    value={dependents}
                    onChange={(e) => setDependents(Number(e.target.value))}
                    placeholder="2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="existingCover">Existing Life Cover (₹)</Label>
                  <Input
                    id="existingCover"
                    type="number"
                    value={existingCover}
                    onChange={(e) => setExistingCover(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>

                <Button onClick={calculateLifeInsurance} className="w-full">
                  Calculate Life Insurance Need
                </Button>
              </CardContent>
            </Card>

            {lifeResults && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
                <CardHeader>
                  <CardTitle className="text-blue-700">Life Insurance Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-white/60 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">
                      ₹{(lifeResults.recommendedCover / 10000000).toFixed(1)}Cr
                    </div>
                    <div className="text-sm text-gray-600">Recommended Cover</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/60 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        ₹{lifeResults.monthlyPremium.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Monthly Premium</div>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        ₹{lifeResults.annualPremium.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Annual Premium</div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    Coverage for {lifeResults.workingYears} working years
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="health">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-600" />
                  Health Insurance Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="healthAge">Primary Member Age</Label>
                  <Input
                    id="healthAge"
                    type="number"
                    value={healthAge}
                    onChange={(e) => setHealthAge(Number(e.target.value))}
                    placeholder="30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="familySize">Family Size</Label>
                  <Input
                    id="familySize"
                    type="number"
                    value={familySize}
                    onChange={(e) => setFamilySize(Number(e.target.value))}
                    placeholder="4"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City Type</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metro">Metro City</SelectItem>
                      <SelectItem value="tier1">Tier 1 City</SelectItem>
                      <SelectItem value="tier2">Tier 2 City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateHealthInsurance} className="w-full">
                  Calculate Health Insurance Premium
                </Button>
              </CardContent>
            </Card>

            {healthResults && (
              <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-pink-100">
                <CardHeader>
                  <CardTitle className="text-red-700">Health Insurance Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-white/60 rounded-lg">
                    <div className="text-2xl font-bold text-red-700">
                      ₹{(healthResults.recommendedCoverage / 100000).toFixed(0)}L
                    </div>
                    <div className="text-sm text-gray-600">Recommended Coverage</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/60 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        ₹{healthResults.monthlyPremium.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Monthly Premium</div>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">
                        ₹{healthResults.annualPremium.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-gray-600">Annual Premium</div>
                    </div>
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    For family of {healthResults.familySize} in {healthResults.city} city
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsuranceCalculator;
