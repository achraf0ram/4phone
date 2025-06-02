
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={currentLanguage === 'ar' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('ar')}
        className="text-sm"
      >
        العربية
      </Button>
      <Button
        variant={currentLanguage === 'fr' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onLanguageChange('fr')}
        className="text-sm"
      >
        Français
      </Button>
    </div>
  );
};

export default LanguageToggle;
