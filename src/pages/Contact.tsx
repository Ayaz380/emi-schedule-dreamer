
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock, MessageCircle, Calculator, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import GoogleMap from '@/components/GoogleMap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    loanAmount: '',
    loanType: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+91-9764646403"],
      hours: "Mon-Sat: 9 AM - 8 PM"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["ayazshaikh380@gmail.com"],
      hours: "24/7 Support"
    },
    {
      icon: MapPin,
      title: "Head Office",
      details: ["105, Konark Puram Business Hub", "Kondhwa, Pune 411048"],
      hours: "Mon-Fri: 9 AM - 6 PM"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      details: ["Available on website", "Quick responses"],
      hours: "Mon-Sat: 9 AM - 9 PM"
    }
  ];

  const branches = [
    { city: "Pune", address: "105, Konark Puram Business Hub, Kondhwa", phone: "+91-9764646403" },
    { city: "Mumbai", address: "456 Central Plaza, Andheri (E)", phone: "+91-22-1234-5678" },
    { city: "Delhi", address: "789 Business Center, Connaught Place", phone: "+91-11-2345-6789" },
    { city: "Bangalore", address: "321 Tech Park, Whitefield", phone: "+91-80-3456-7890" },
    { city: "Chennai", address: "654 Marina Beach Road, T.Nagar", phone: "+91-44-4567-8901" },
    { city: "Hyderabad", address: "987 HITEC City, Madhapur", phone: "+91-40-6789-0123" }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get in touch with our home loan experts for personalized assistance and guidance.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-900">
                  Get a Callback
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and our loan expert will call you back within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Loan Amount Required</Label>
                      <Input
                        id="loanAmount"
                        value={formData.loanAmount}
                        onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
                        placeholder="e.g., 50,00,000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loanType">Loan Type</Label>
                      <Select onValueChange={(value) => setFormData({...formData, loanType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select loan type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="home-purchase">Home Purchase</SelectItem>
                          <SelectItem value="home-construction">Home Construction</SelectItem>
                          <SelectItem value="home-improvement">Home Improvement</SelectItem>
                          <SelectItem value="balance-transfer">Balance Transfer</SelectItem>
                          <SelectItem value="loan-against-property">Loan Against Property</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us about your specific requirements..."
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 text-lg"
                  >
                    Request Callback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                        <p className="text-blue-600 text-sm mt-1">{info.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Office Location Map */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
              Visit Our Office
            </CardTitle>
            <p className="text-gray-600 text-center">
              105, Konark Puram Business Hub, Kondhwa, Pune 411048
            </p>
          </CardHeader>
          <CardContent>
            <GoogleMap />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link to="/calculator">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Calculate EMI</h3>
                <p className="text-gray-600 text-sm">Use our advanced calculator to estimate your monthly payments</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/documentation">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Checklist</h3>
                <p className="text-gray-600 text-sm">Check what documents you need for your application</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Application</h3>
              <p className="text-gray-600 text-sm">Check the status of your loan application online</p>
            </CardContent>
          </Card>
        </div>

        {/* Branch Locations */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
              Our Branch Locations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">{branch.city}</h4>
                  <p className="text-gray-600 text-sm mb-2">{branch.address}</p>
                  <p className="text-blue-600 text-sm font-medium">{branch.phone}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
