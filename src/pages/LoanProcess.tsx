
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, FileText, Search, CreditCard, ArrowRight, Phone, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoanProcess = () => {
  const steps = [
    {
      icon: FileText,
      title: "Application Submission",
      description: "Submit your loan application online or visit our branch",
      duration: "15 minutes",
      details: [
        "Fill out the application form",
        "Upload required documents",
        "Choose loan amount and tenure",
        "Submit for initial review"
      ],
      status: "active"
    },
    {
      icon: Search,
      title: "Document Verification",
      description: "Our team verifies all submitted documents",
      duration: "1-2 days",
      details: [
        "Document authenticity check",
        "Income verification",
        "Property document review",
        "Credit bureau check"
      ],
      status: "pending"
    },
    {
      icon: CheckCircle,
      title: "Property Valuation",
      description: "Technical and legal evaluation of the property",
      duration: "3-5 days",
      details: [
        "Site visit by technical team",
        "Property valuation report",
        "Legal title verification",
        "Compliance check"
      ],
      status: "pending"
    },
    {
      icon: CreditCard,
      title: "Loan Approval",
      description: "Final approval and loan sanction letter",
      duration: "2-3 days",
      details: [
        "Credit committee review",
        "Final approval decision",
        "Sanction letter generation",
        "Terms and conditions finalization"
      ],
      status: "pending"
    },
    {
      icon: CheckCircle,
      title: "Documentation & Disbursal",
      description: "Complete legal formalities and receive funds",
      duration: "7-10 days",
      details: [
        "Loan agreement signing",
        "Insurance arrangements",
        "Registration formalities",
        "Fund disbursal to seller/builder"
      ],
      status: "pending"
    }
  ];

  const timeline = [
    { day: "Day 1", activity: "Application submitted and initial review completed" },
    { day: "Day 2-3", activity: "Document verification and credit check" },
    { day: "Day 4-8", activity: "Property valuation and legal verification" },
    { day: "Day 9-11", activity: "Final approval and sanction letter" },
    { day: "Day 12-21", activity: "Documentation and fund disbursal" }
  ];

  const requirements = [
    {
      title: "Eligibility Criteria",
      items: [
        "Age: 23-70 years",
        "Minimum income: ₹25,000/month",
        "Credit Score: 650+",
        "Work Experience: 2+ years"
      ]
    },
    {
      title: "Loan Features",
      items: [
        "Loan Amount: Up to ₹10 Crores",
        "Tenure: Up to 30 years",
        "LTV Ratio: Up to 90%",
        "Processing Fee: 0.5% + GST"
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Home Loan Process</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Understanding our streamlined home loan process helps you prepare better and get faster approvals.
          </p>
          <Badge className="mt-4 bg-green-100 text-green-700 px-4 py-2">
            <Clock className="h-4 w-4 mr-2" />
            Approval in 7-15 days
          </Badge>
        </div>

        {/* Process Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Step-by-Step Process</h2>
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        {/* Step Number and Icon */}
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {index + 1}
                          </div>
                          <Icon className="h-8 w-8 text-blue-600" />
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                            <Badge variant="outline" className="self-start sm:self-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.duration}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-4">{step.description}</p>
                          <div className="grid sm:grid-cols-2 gap-2">
                            {step.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Arrow between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center my-4">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
              Expected Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Badge className="bg-blue-100 text-blue-700 min-w-fit">
                    {item.day}
                  </Badge>
                  <p className="text-gray-700">{item.activity}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Requirements and Features */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {requirements.map((req, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {req.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {req.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fast Track Process */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white mb-12">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Fast Track Your Application</h2>
              <p className="text-green-100 mb-6">
                Get your loan approved faster with our digital-first approach and dedicated relationship managers.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24 Hours</div>
                  <div className="text-green-100">Initial Approval</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">48 Hours</div>
                  <div className="text-green-100">Document Verification</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">7-10 Days</div>
                  <div className="text-green-100">Final Disbursal</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Home Loan Journey?</h2>
            <p className="text-gray-600 mb-6">
              Calculate your EMI or speak with our loan experts to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate EMI
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="font-semibold px-8 py-4 border-blue-200 hover:bg-blue-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to Expert
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoanProcess;
