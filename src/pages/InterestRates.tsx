
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingDown, TrendingUp, Info, Calculator, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const InterestRates = () => {
  const [selectedCategory, setSelectedCategory] = useState('individual');

  const rates = {
    individual: [
      { range: "Up to ₹30 Lakhs", rate: "8.50", special: false },
      { range: "₹30 Lakhs - ₹75 Lakhs", rate: "8.65", special: true },
      { range: "₹75 Lakhs - ₹3 Crores", rate: "8.75", special: false },
      { range: "Above ₹3 Crores", rate: "9.00", special: false },
    ],
    corporate: [
      { range: "Up to ₹50 Lakhs", rate: "8.25", special: true },
      { range: "₹50 Lakhs - ₹1 Crore", rate: "8.40", special: false },
      { range: "₹1 Crore - ₹5 Crores", rate: "8.50", special: false },
      { range: "Above ₹5 Crores", rate: "8.75", special: false },
    ]
  };

  const factors = [
    { title: "Credit Score", impact: "High", description: "750+ gets best rates" },
    { title: "Income Level", impact: "High", description: "Higher income = lower rates" },
    { title: "Loan Amount", impact: "Medium", description: "Larger loans may get better rates" },
    { title: "Tenure", impact: "Medium", description: "Shorter tenure = lower rates" },
    { title: "Property Type", impact: "Low", description: "Ready property vs under-construction" },
    { title: "Employment Type", impact: "Medium", description: "Salaried vs self-employed" },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Current Interest Rates</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get the most competitive home loan interest rates with transparent pricing and no hidden charges.
          </p>
          <Badge className="mt-4 bg-green-100 text-green-700 px-4 py-2">
            <TrendingDown className="h-4 w-4 mr-2" />
            Rates as low as 8.25% p.a.
          </Badge>
        </div>

        {/* Rate Categories */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-lg">
            <Button
              variant={selectedCategory === 'individual' ? 'default' : 'ghost'}
              onClick={() => setSelectedCategory('individual')}
              className="px-6 py-3"
            >
              Individual
            </Button>
            <Button
              variant={selectedCategory === 'corporate' ? 'default' : 'ghost'}
              onClick={() => setSelectedCategory('corporate')}
              className="px-6 py-3"
            >
              Corporate
            </Button>
          </div>
        </div>

        {/* Interest Rates Table */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
              {selectedCategory === 'individual' ? 'Individual' : 'Corporate'} Home Loan Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {rates[selectedCategory as keyof typeof rates].map((rate, index) => (
                <div key={index} className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                  rate.special 
                    ? 'border-green-300 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{rate.range}</h3>
                      {rate.special && (
                        <Badge className="mt-2 bg-green-100 text-green-700">
                          <Star className="h-3 w-3 mr-1" />
                          Best Rate
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">{rate.rate}%</div>
                      <div className="text-sm text-gray-600">p.a. onwards</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Important Note:</p>
                  <p className="text-sm text-blue-700">
                    Final interest rates are subject to profile assessment and may vary based on credit score, 
                    income, property type, and other factors. All rates are subject to change without notice.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rate Factors */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Factors Affecting Your Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {factors.map((factor, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{factor.title}</h4>
                      <p className="text-sm text-gray-600">{factor.description}</p>
                    </div>
                    <Badge 
                      variant={factor.impact === 'High' ? 'destructive' : factor.impact === 'Medium' ? 'default' : 'secondary'}
                      className="ml-4"
                    >
                      {factor.impact} Impact
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900">
                Rate Trends & Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Current Trend: Declining</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Interest rates have been on a downward trend over the past 6 months, making it an excellent time to apply for a home loan.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">6-Month Forecast</h4>
                  <p className="text-sm text-blue-700">
                    Experts predict rates may stabilize at current levels with a possibility of further reduction by 0.25-0.50% based on economic conditions.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Best Time to Apply</h4>
                  <p className="text-sm text-yellow-700">
                    Current market conditions favor borrowers. Consider applying now to lock in these competitive rates before any potential increases.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Your Best Rate?</h2>
            <p className="text-blue-100 mb-6">
              Use our calculator to see how these rates translate to monthly EMIs for your loan amount.
            </p>
            <Link to="/calculator">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Your EMI
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterestRates;
