
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Home, IndianRupee } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'affordability' | 'eligibility' | 'calculator';
  onTabChange: (tab: 'affordability' | 'eligibility' | 'calculator') => void;
}

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-lg">
        <Button
          variant={activeTab === 'affordability' ? 'default' : 'ghost'}
          onClick={() => onTabChange('affordability')}
          className="flex items-center gap-2"
        >
          <Home className="h-4 w-4" />
          Affordability
        </Button>
        <Button
          variant={activeTab === 'eligibility' ? 'default' : 'ghost'}
          onClick={() => onTabChange('eligibility')}
          className="flex items-center gap-2"
        >
          <IndianRupee className="h-4 w-4" />
          Loan Eligibility
        </Button>
        <Button
          variant={activeTab === 'calculator' ? 'default' : 'ghost'}
          onClick={() => onTabChange('calculator')}
          className="flex items-center gap-2"
        >
          <Calculator className="h-4 w-4" />
          EMI Calculator
        </Button>
      </div>
    </div>
  );
};

export default TabNavigation;
