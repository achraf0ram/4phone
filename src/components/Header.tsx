
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Wrench, ShoppingCart, ArrowRight } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { getTranslation, Language } from '@/utils/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
              <Phone className="text-white" size={24} />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              4phone
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-8 space-x-reverse">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ArrowRight size={18} />
                <span>{getTranslation(language, 'home')}</span>
              </Link>
              
              <Link 
                to="/repairs" 
                className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive('/repairs') 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Wrench size={18} />
                <ArrowRight size={16} />
                <span>{getTranslation(language, 'repairs')}</span>
              </Link>
              
              <Link 
                to="/parts" 
                className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive('/parts') 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingCart size={18} />
                <ArrowRight size={16} />
                <span>{getTranslation(language, 'parts')}</span>
              </Link>
            </nav>
            
            <LanguageToggle 
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
