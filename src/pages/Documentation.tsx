
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, CheckCircle, AlertTriangle, Info, User, Building } from 'lucide-react';

const Documentation = () => {
  const [applicantType, setApplicantType] = useState<'salaried' | 'self-employed'>('salaried');

  const documents = {
    salaried: {
      identity: [
        "PAN Card",
        "Aadhaar Card",
        "Passport / Voter ID / Driving License"
      ],
      address: [
        "Aadhaar Card",
        "Passport",
        "Utility Bills (not older than 3 months)",
        "Rental Agreement (if staying in rented property)"
      ],
      income: [
        "Salary Slips (last 3 months)",
        "Form 16 (last 2 years)",
        "Bank Statements (last 6 months)",
        "Employment Certificate",
        "Offer Letter / Appointment Letter"
      ],
      property: [
        "Sale Agreement",
        "Title Deeds",
        "Property Papers",
        "NOC from Builder/Society",
        "Khata Certificate",
        "Property Tax Receipts"
      ]
    },
    'self-employed': {
      identity: [
        "PAN Card",
        "Aadhaar Card",
        "Passport / Voter ID / Driving License"
      ],
      address: [
        "Aadhaar Card",
        "Passport",
        "Utility Bills (not older than 3 months)",
        "Office Address Proof"
      ],
      income: [
        "ITR (last 3 years)",
        "Profit & Loss Statement (last 3 years)",
        "Balance Sheet (last 3 years)",
        "Bank Statements (last 12 months)",
        "GST Returns (last 12 months)",
        "Business Registration Certificate",
        "CA Certified Financial Statements"
      ],
      property: [
        "Sale Agreement",
        "Title Deeds",
        "Property Papers",
        "NOC from Builder/Society",
        "Khata Certificate",
        "Property Tax Receipts"
      ]
    }
  };

  const tips = [
    {
      icon: CheckCircle,
      title: "Keep Originals Ready",
      description: "Have original documents for verification, though we'll work with clear copies initially.",
      type: "success"
    },
    {
      icon: Info,
      title: "Digital Copies",
      description: "Scan documents in high quality PDF format (less than 5MB each).",
      type: "info"
    },
    {
      icon: AlertTriangle,
      title: "Document Validity",
      description: "Ensure all documents are current and not expired at the time of application.",
      type: "warning"
    }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Required Documentation</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get your home loan approved faster with the right documents. Here's everything you need to prepare.
          </p>
        </div>

        {/* Applicant Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-lg">
            <Button
              variant={applicantType === 'salaried' ? 'default' : 'ghost'}
              onClick={() => setApplicantType('salaried')}
              className="px-6 py-3 flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Salaried
            </Button>
            <Button
              variant={applicantType === 'self-employed' ? 'default' : 'ghost'}
              onClick={() => setApplicantType('self-employed')}
              className="px-6 py-3 flex items-center gap-2"
            >
              <Building className="h-4 w-4" />
              Self-Employed
            </Button>
          </div>
        </div>

        {/* Document Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {Object.entries(documents[applicantType]).map(([category, docs], index) => (
            <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900 capitalize flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  {category === 'identity' ? 'Identity Proof' : 
                   category === 'address' ? 'Address Proof' :
                   category === 'income' ? 'Income Proof' : 'Property Documents'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {docs.map((doc, docIndex) => (
                    <div key={docIndex} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Requirements */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Additional Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">For Co-Applicants</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Same documents as primary applicant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Relationship proof (if applicable)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Consent letter for loan application
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Special Cases</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    NRI - Overseas income proof
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Transfer cases - Existing loan statements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Top-up loans - Current loan details
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Tips */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <Card key={index} className={`shadow-lg border-0 ${
                tip.type === 'success' ? 'bg-green-50' :
                tip.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
              }`}>
                <CardContent className="p-6 text-center">
                  <Icon className={`h-12 w-12 mx-auto mb-4 ${
                    tip.type === 'success' ? 'text-green-600' :
                    tip.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Document Checklist Download */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Download Document Checklist</h2>
            <p className="text-blue-100 mb-6">
              Get a comprehensive checklist to ensure you have all required documents ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4">
                <Download className="mr-2 h-5 w-5" />
                Download Salaried Checklist
              </Button>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4">
                <Download className="mr-2 h-5 w-5" />
                Download Self-Employed Checklist
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documentation;
