
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { AmortizationRow } from '@/utils/emiCalculations';

interface PaymentChartProps {
  data: AmortizationRow[];
}

const PaymentChart: React.FC<PaymentChartProps> = ({ data }) => {
  // Group data by year for better visualization
  const yearlyData = data.reduce((acc, row) => {
    const existingYear = acc.find(item => item.year === row.year);
    if (existingYear) {
      existingYear.principal += row.principal;
      existingYear.interest += row.interest;
      existingYear.prepayment += row.prepayment;
      existingYear.totalEMI += row.emi;
    } else {
      acc.push({
        year: row.year,
        principal: row.principal,
        interest: row.interest,
        prepayment: row.prepayment,
        totalEMI: row.emi,
        balance: row.balance
      });
    }
    return acc;
  }, [] as any[]);

  const formatCurrency = (value: number) => {
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{`Year ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ₹${entry.value.toLocaleString('en-IN')}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Principal vs Interest Area Chart */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Principal vs Interest Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="interest"
                  stackId="1"
                  stroke="#ef4444"
                  fill="#fee2e2"
                  name="Interest"
                />
                <Area
                  type="monotone"
                  dataKey="principal"
                  stackId="1"
                  stroke="#10b981"
                  fill="#d1fae5"
                  name="Principal"
                />
                <Area
                  type="monotone"
                  dataKey="prepayment"
                  stackId="1"
                  stroke="#f59e0b"
                  fill="#fef3c7"
                  name="Prepayment"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Outstanding Balance Chart */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Outstanding Loan Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={formatCurrency}
                  stroke="#6b7280"
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#8b5cf6"
                  fill="#ede9fe"
                  name="Outstanding Balance"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentChart;
