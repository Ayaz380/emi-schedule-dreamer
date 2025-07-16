
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Home, IndianRupee, TrendingUp, Receipt, PiggyBank } from 'lucide-react';

interface EnhancedTabNavigationProps {
  activeTab: 'affordability' | 'eligibility' | 'calculator' | 'sip' | 'tax' | 'property';
  onTabChange: (tab: 'affordability' | 'eligibility' | 'calculator' | 'sip' | 'tax' | 'property') => void;
}

const EnhancedTabNavigation = ({ activeTab, onTabChange }: EnhancedTabNavigationProps) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-lg grid grid-cols-2 md:grid-cols-6 gap-1">
        <Button
          variant={activeTab === 'affordability' ? 'default' : 'ghost'}
          onClick={() => onTabChange('affordability')}
          className="flex items-center gap-2 text-xs md:text-sm"
        >
          <Home className="h-4 w-4" />
          <span className="hidden md:inline">Affordability</span>
        </Button>
        <Button
          variant={activeTab === 'eligibility' ? 'default' : 'ghost'}
          onClick={() => onTabChange('eligibility')}
          className="flex items-center gap-2 text-xs md:text-sm"
        >
          <IndianRupee className="h-4 w-4" />
          <span className="hidden md:inline">Eligibility</span>
        </Button>
        <Button
          variant={activeTab === 'calculator' ? 'default' : 'ghost'}
          onClick={() => onTabChange('calculator')}
          className="flex items-center gap-2 text-xs md:text-sm"
        >
          <Calculator className="h-4 w-4" />
          <span className="hidden md:inline">EMI</span>
        </Button>
        <Button
          variant={activeTab === 'sip' ? 'default' : 'ghost'}
          onClick={() => onTabChange('sip')}
          className="flex items-center gap-2 text-xs md:text-sm"
        >
          <TrendingUp className="h-4 w-4" />
          <span className="hidden md:inline">SIP</span>
        </Button>
        <Button
          variant={activeTab === 'tax' ? 'default' : 'ghost'}
          onClick={() => onTabChange('tax')}
          className="flex items-center gap-2 text-xs md:text-sm"
        >
          <Receipt className="h-4 w-4" />
          <span className="hidden md:inline">Tax</span>
        </Button>
        <Button
          variant={activeTab === 'property' ? 'default' : 'ghost'}
          onClick={() => onTabChange('property')}
          className="flex items-center gap-2 text-xs md:text-sm"
        >
          <PiggyBank className="h-4 w-4" />
          <span className="hidden md:inline">Property</span>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedTabNavigation;
