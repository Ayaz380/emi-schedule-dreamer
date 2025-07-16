
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, Home, IndianRupee, TrendingUp, Receipt, PiggyBank, Shield, GitCompare, Landmark, Heart } from 'lucide-react';

interface EnhancedTabNavigationProps {
  activeTab: 'affordability' | 'eligibility' | 'calculator' | 'sip' | 'tax' | 'property' | 'fd' | 'ppf' | 'insurance' | 'comparison';
  onTabChange: (tab: 'affordability' | 'eligibility' | 'calculator' | 'sip' | 'tax' | 'property' | 'fd' | 'ppf' | 'insurance' | 'comparison') => void;
}

const EnhancedTabNavigation = ({ activeTab, onTabChange }: EnhancedTabNavigationProps) => {
  return (
    <div className="flex justify-center mb-6 overflow-x-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-1 shadow-lg flex gap-1 min-w-max">
        <Button
          variant={activeTab === 'affordability' ? 'default' : 'ghost'}
          onClick={() => onTabChange('affordability')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Affordability</span>
        </Button>
        
        <Button
          variant={activeTab === 'eligibility' ? 'default' : 'ghost'}
          onClick={() => onTabChange('eligibility')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <IndianRupee className="h-4 w-4" />
          <span className="hidden sm:inline">Eligibility</span>
        </Button>
        
        <Button
          variant={activeTab === 'calculator' ? 'default' : 'ghost'}
          onClick={() => onTabChange('calculator')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <Calculator className="h-4 w-4" />
          <span className="hidden sm:inline">EMI</span>
        </Button>
        
        <Button
          variant={activeTab === 'comparison' ? 'default' : 'ghost'}
          onClick={() => onTabChange('comparison')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <GitCompare className="h-4 w-4" />
          <span className="hidden sm:inline">Compare</span>
        </Button>
        
        <Button
          variant={activeTab === 'sip' ? 'default' : 'ghost'}
          onClick={() => onTabChange('sip')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <TrendingUp className="h-4 w-4" />
          <span className="hidden sm:inline">SIP</span>
        </Button>
        
        <Button
          variant={activeTab === 'fd' ? 'default' : 'ghost'}
          onClick={() => onTabChange('fd')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <Landmark className="h-4 w-4" />
          <span className="hidden sm:inline">FD</span>
        </Button>
        
        <Button
          variant={activeTab === 'ppf' ? 'default' : 'ghost'}
          onClick={() => onTabChange('ppf')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">PPF</span>
        </Button>
        
        <Button
          variant={activeTab === 'insurance' ? 'default' : 'ghost'}
          onClick={() => onTabChange('insurance')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">Insurance</span>
        </Button>
        
        <Button
          variant={activeTab === 'tax' ? 'default' : 'ghost'}
          onClick={() => onTabChange('tax')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <Receipt className="h-4 w-4" />
          <span className="hidden sm:inline">Tax</span>
        </Button>
        
        <Button
          variant={activeTab === 'property' ? 'default' : 'ghost'}
          onClick={() => onTabChange('property')}
          className="flex items-center gap-2 text-xs whitespace-nowrap px-3"
        >
          <PiggyBank className="h-4 w-4" />
          <span className="hidden sm:inline">Property</span>
        </Button>
      </div>
    </div>
  );
};

export default EnhancedTabNavigation;
