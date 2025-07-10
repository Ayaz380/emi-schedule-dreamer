
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, Building, Percent, FileText, CheckCircle, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Dream Home
            <span className="text-blue-600 block">Awaits You</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get the best home loan deals with competitive interest rates, quick approvals, and expert guidance throughout your home buying journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 text-lg">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate EMI
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="font-semibold px-8 py-4 text-lg border-blue-200 hover:bg-blue-50">
                <Phone className="mr-2 h-5 w-5" />
                Talk to Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Home Loans?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Percent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Competitive Rates
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Starting from <span className="text-2xl font-bold text-green-600">8.5%</span> p.a. with flexible tenure options up to 30 years.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Quick Approval
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Get loan approval in as little as <span className="font-bold text-blue-600">24 hours</span> with minimal documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  100% Financing
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Finance up to <span className="font-bold text-purple-600">100% of property value</span> for eligible customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Tools */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Loan Calculators & Tools
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/calculator" className="group">
              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">EMI Calculator</h3>
                  <p className="text-gray-600 text-sm mb-4">Calculate your monthly EMI with prepayment options</p>
                  <Badge className="bg-blue-100 text-blue-700">Most Popular</Badge>
                </CardContent>
              </Card>
            </Link>

            <Link to="/calculator" className="group">
              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Building className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Calculator</h3>
                  <p className="text-gray-600 text-sm mb-4">Check your loan eligibility based on income</p>
                  <Badge className="bg-green-100 text-green-700">Recommended</Badge>
                </CardContent>
              </Card>
            </Link>

            <Link to="/calculator" className="group">
              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Percent className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordability Calculator</h3>
                  <p className="text-gray-600 text-sm mb-4">Find out what property value you can afford</p>
                  <Badge className="bg-purple-100 text-purple-700">New</Badge>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Loan Process Overview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple 4-Step Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Apply Online", desc: "Fill out our simple application form" },
              { step: 2, title: "Document Upload", desc: "Upload required documents securely" },
              { step: 3, title: "Verification", desc: "Our team verifies your application" },
              { step: 4, title: "Disbursal", desc: "Get your loan amount disbursed" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="h-6 w-6 text-gray-400 mx-auto mt-4 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Your Home Loan?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of happy homeowners who chose us for their home loan needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
                Start Calculating
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg">
                Contact Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">HomeLoan Pro</h3>
              <p className="text-gray-400">
                Your trusted partner for home loans with competitive rates and excellent service.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/loan-types" className="hover:text-white">Loan Types</Link></li>
                <li><Link to="/interest-rates" className="hover:text-white">Interest Rates</Link></li>
                <li><Link to="/calculator" className="hover:text-white">Calculator</Link></li>
                <li><Link to="/loan-process" className="hover:text-white">Loan Process</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/documentation" className="hover:text-white">Documentation</Link></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@homeloanpro.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HomeLoan Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
