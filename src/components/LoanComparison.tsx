
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { GitCompare, Plus, Trash2 } from 'lucide-react';
import { calculateEMI } from '@/utils/emiCalculations';

interface LoanScenario {
  id: number;
  name: string;
  loanAmount: number;
  interestRate: number;
  tenure: number;
}

const LoanComparison = () => {
  const [scenarios, setScenarios] = useState<LoanScenario[]>([
    { id: 1, name: 'Bank A', loanAmount: 5000000, interestRate: 8.5, tenure: 20 },
    { id: 2, name: 'Bank B', loanAmount: 5000000, interestRate: 8.8, tenure: 20 }
  ]);

  const addScenario = () => {
    const newId = Math.max(...scenarios.map(s => s.id)) + 1;
    setScenarios([...scenarios, {
      id: newId,
      name: `Scenario ${newId}`,
      loanAmount: 5000000,
      interestRate: 8.5,
      tenure: 20
    }]);
  };

  const removeScenario = (id: number) => {
    if (scenarios.length > 2) {
      setScenarios(scenarios.filter(s => s.id !== id));
    }
  };

  const updateScenario = (id: number, field: keyof LoanScenario, value: string | number) => {
    setScenarios(scenarios.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const calculateResults = (scenario: LoanScenario) => {
    const emi = calculateEMI(scenario.loanAmount, scenario.interestRate, scenario.tenure);
    const totalAmount = emi * scenario.tenure * 12;
    const totalInterest = totalAmount - scenario.loanAmount;
    
    return {
      emi,
      totalAmount,
      totalInterest,
      interestPercentage: (totalInterest / scenario.loanAmount) * 100
    };
  };

  const getBestOption = (field: 'emi' | 'totalInterest') => {
    const results = scenarios.map(s => ({ ...s, ...calculateResults(s) }));
    const best = results.reduce((min, current) => 
      current[field] < min[field] ? current : min
    );
    return best.id;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
          <GitCompare className="h-8 w-8 text-blue-600" />
          Loan Comparison Tool
        </h1>
        <p className="text-lg text-gray-600">Compare multiple loan offers side by side</p>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="grid gap-4">
          {scenarios.map((scenario, index) => (
            <Card key={scenario.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  <input
                    type="text"
                    value={scenario.name}
                    onChange={(e) => updateScenario(scenario.id, 'name', e.target.value)}
                    className="bg-transparent border-none text-lg font-semibold focus:outline-none focus:border-b-2 focus:border-blue-500"
                  />
                  {scenarios.length > 2 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeScenario(scenario.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Loan Amount (₹)</Label>
                    <Input
                      type="number"
                      value={scenario.loanAmount}
                      onChange={(e) => updateScenario(scenario.id, 'loanAmount', Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Interest Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={scenario.interestRate}
                      onChange={(e) => updateScenario(scenario.id, 'interestRate', Number(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tenure (Years)</Label>
                    <Input
                      type="number"
                      value={scenario.tenure}
                      onChange={(e) => updateScenario(scenario.id, 'tenure', Number(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button onClick={addScenario} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Another Scenario
          </Button>
        </div>

        {/* Comparison Table */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Loan Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Loan Option</TableHead>
                    <TableHead>Loan Amount</TableHead>
                    <TableHead>Interest Rate</TableHead>
                    <TableHead>Tenure</TableHead>
                    <TableHead>Monthly EMI</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Total Interest</TableHead>
                    <TableHead>Interest %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scenarios.map((scenario) => {
                    const results = calculateResults(scenario);
                    const isBestEMI = getBestOption('emi') === scenario.id;
                    const isBestInterest = getBestOption('totalInterest') === scenario.id;
                    
                    return (
                      <TableRow key={scenario.id} className={isBestEMI || isBestInterest ? 'bg-green-50' : ''}>
                        <TableCell className="font-medium">
                          {scenario.name}
                          {(isBestEMI || isBestInterest) && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              Best
                            </span>
                          )}
                        </TableCell>
                        <TableCell>₹{scenario.loanAmount.toLocaleString('en-IN')}</TableCell>
                        <TableCell>{scenario.interestRate}%</TableCell>
                        <TableCell>{scenario.tenure} years</TableCell>
                        <TableCell className={isBestEMI ? 'font-bold text-green-700' : ''}>
                          ₹{results.emi.toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell>₹{results.totalAmount.toLocaleString('en-IN')}</TableCell>
                        <TableCell className={isBestInterest ? 'font-bold text-green-700' : ''}>
                          ₹{results.totalInterest.toLocaleString('en-IN')}
                        </TableCell>
                        <TableCell>{results.interestPercentage.toFixed(1)}%</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-green-700 mb-2">Lowest EMI</h3>
              <div className="text-2xl font-bold text-green-800">
                {scenarios.find(s => s.id === getBestOption('emi'))?.name}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Lowest Total Interest</h3>
              <div className="text-2xl font-bold text-blue-800">
                {scenarios.find(s => s.id === getBestOption('totalInterest'))?.name}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoanComparison;
