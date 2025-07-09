
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { AmortizationRow, AmortizationResult } from '@/utils/emiCalculations';

interface AmortizationTableProps {
  schedule: AmortizationRow[];
  scenario: AmortizationResult;
}

const AmortizationTable: React.FC<AmortizationTableProps> = ({ schedule, scenario }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showYearlyView, setShowYearlyView] = useState(false);
  const rowsPerPage = 12;

  // Group by year for yearly view
  const yearlyData = schedule.reduce((acc, row) => {
    const existingYear = acc.find(item => item.year === row.year);
    if (existingYear) {
      existingYear.principal += row.principal;
      existingYear.interest += row.interest;
      existingYear.prepayment += row.prepayment;
      existingYear.totalEMI += row.emi;
      existingYear.monthCount += 1;
    } else {
      acc.push({
        year: row.year,
        principal: row.principal,
        interest: row.interest,
        prepayment: row.prepayment,
        totalEMI: row.emi,
        balance: row.balance,
        monthCount: 1
      });
    }
    return acc;
  }, [] as any[]);

  const dataToShow = showYearlyView ? yearlyData : schedule;
  const totalPages = Math.ceil(dataToShow.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = dataToShow.slice(startIndex, endIndex);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const exportToCSV = () => {
    const headers = showYearlyView 
      ? ['Year', 'Principal', 'Interest', 'Prepayment', 'Balance', 'Months']
      : ['Month', 'Year', 'EMI', 'Principal', 'Interest', 'Prepayment', 'Balance'];
    
    const csvContent = [
      headers.join(','),
      ...dataToShow.map(row => {
        if (showYearlyView) {
          return [row.year, row.principal, row.interest, row.prepayment, row.balance, row.monthCount].join(',');
        } else {
          return [row.month, row.year, row.emi, row.principal, row.interest, row.prepayment, row.balance].join(',');
        }
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amortization_schedule_${showYearlyView ? 'yearly' : 'monthly'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            Amortization Schedule
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant={showYearlyView ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setShowYearlyView(!showYearlyView);
                setCurrentPage(1);
              }}
              className="text-sm"
            >
              {showYearlyView ? "Yearly View" : "Monthly View"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="text-sm"
            >
              <Download className="h-4 w-4 mr-1" />
              Export CSV
            </Button>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-700">
              ₹{scenario.totalAmountPaid.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-blue-600">Total Paid</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-700">
              ₹{scenario.totalPrepayments.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-green-600">Prepayments</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-lg font-bold text-red-700">
              ₹{scenario.totalInterest.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-red-600">Interest</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-700">
              {scenario.actualTenure} yrs
            </div>
            <div className="text-xs text-purple-600">Actual Tenure</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                {showYearlyView ? (
                  <>
                    <TableHead className="font-semibold text-gray-700">Year</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Principal</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Interest</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Prepayment</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Balance</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-center">Months</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead className="font-semibold text-gray-700">Month</TableHead>
                    <TableHead className="font-semibold text-gray-700">Year</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">EMI</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Principal</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Interest</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Prepayment</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-right">Balance</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((row, index) => (
                <TableRow 
                  key={showYearlyView ? row.year : row.month} 
                  className="hover:bg-gray-50 border-gray-100"
                >
                  {showYearlyView ? (
                    <>
                      <TableCell className="font-medium">Year {row.year}</TableCell>
                      <TableCell className="text-right font-medium text-green-700">
                        {formatCurrency(row.principal)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-red-700">
                        {formatCurrency(row.interest)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-orange-700">
                        {row.prepayment > 0 ? formatCurrency(row.prepayment) : '-'}
                      </TableCell>
                      <TableCell className="text-right font-medium text-blue-700">
                        {formatCurrency(row.balance)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{row.monthCount}</Badge>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-medium">{row.month}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{row.year}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(row.emi)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-green-700">
                        {formatCurrency(row.principal)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-red-700">
                        {formatCurrency(row.interest)}
                      </TableCell>
                      <TableCell className="text-right font-medium text-orange-700">
                        {row.prepayment > 0 ? (
                          <Badge className="bg-orange-100 text-orange-700">
                            {formatCurrency(row.prepayment)}
                          </Badge>
                        ) : '-'}
                      </TableCell>
                      <TableCell className="text-right font-medium text-blue-700">
                        {formatCurrency(row.balance)}
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, dataToShow.length)} of {dataToShow.length} entries
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AmortizationTable;
