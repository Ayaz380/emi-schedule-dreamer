
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Building, Hammer, Repeat, TrendingUp, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoanTypes = () => {
  const loanTypes = [
    {
      icon: Home,
      title: "Home Purchase Loan",
      description: "Finance the purchase of your dream home with up to 90% funding",
      features: ["Up to 90% LTV", "Tenure up to 30 years", "Competitive rates from 8.5%"],
      rate: "8.5% onwards",
      popular: true
    },
    {
      icon: Building,
      title: "Home Construction Loan",
      description: "Build your custom home with flexible disbursement options",
      features: ["Stage-wise disbursement", "Up to 80% funding", "Convert to home loan"],
      rate: "9.0% onwards",
      popular: false
    },
    {
      icon: Hammer,
      title: "Home Improvement Loan",
      description: "Renovate and upgrade your existing property",
      features: ["Quick approval", "Minimal documentation", "Up to ₹25 lakhs"],
      rate: "9.5% onwards",
      popular: false
    },
    {
      icon: Repeat,
      title: "Balance Transfer",
      description: "Transfer your existing home loan for better rates",
      features: ["Lower interest rates", "Top-up facility", "Reduced EMI"],
      rate: "8.25% onwards",
      popular: false
    },
    {
      icon: TrendingUp,
      title: "Loan Against Property",
      description: "Get funds against your residential or commercial property",
      features: ["Up to 70% of property value", "Multi-purpose usage", "Flexible repayment"],
      rate: "10.0% onwards",
      popular: false
    },
    {
      icon: Building,
      title: "Plot Purchase Loan",
      description: "Buy residential plots for future construction",
      features: ["Up to 80% funding", "Prime locations", "Future construction option"],
      rate: "9.25% onwards",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Loan Types</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of home loan products designed to meet your specific needs and financial goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {loanTypes.map((loan, index) => {
            const Icon = loan.icon;
            return (
              <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 relative">
                {loan.popular && (
                  <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {loan.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">
                    {loan.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {loan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">Interest Rate</span>
                      <span className="text-lg font-bold text-blue-600">{loan.rate}</span>
                    </div>
                    <Link to="/calculator">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                        Calculate EMI
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
              Quick Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Loan Type</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Interest Rate</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Max LTV</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Max Tenure</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Processing Fee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Home Purchase</td>
                    <td className="py-3 px-4 text-center">8.5% onwards</td>
                    <td className="py-3 px-4 text-center">90%</td>
                    <td className="py-3 px-4 text-center">30 years</td>
                    <td className="py-3 px-4 text-center">0.5% + GST</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Home Construction</td>
                    <td className="py-3 px-4 text-center">9.0% onwards</td>
                    <td className="py-3 px-4 text-center">80%</td>
                    <td className="py-3 px-4 text-center">30 years</td>
                    <td className="py-3 px-4 text-center">0.5% + GST</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Home Improvement</td>
                    <td className="py-3 px-4 text-center">9.5% onwards</td>
                    <td className="py-3 px-4 text-center">N/A</td>
                    <td className="py-3 px-4 text-center">15 years</td>
                    <td className="py-3 px-4 text-center">1% + GST</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Balance Transfer</td>
                    <td className="py-3 px-4 text-center">8.25% onwards</td>
                    <td className="py-3 px-4 text-center">80%</td>
                    <td className="py-3 px-4 text-center">Remaining tenure</td>
                    <td className="py-3 px-4 text-center">0.25% + GST</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Loan Against Property</td>
                    <td className="py-3 px-4 text-center">10.0% onwards</td>
                    <td className="py-3 px-4 text-center">70%</td>
                    <td className="py-3 px-4 text-center">20 years</td>
                    <td className="py-3 px-4 text-center">1% + GST</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanTypes;
