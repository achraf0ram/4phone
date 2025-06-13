
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Wrench, ShoppingCart, Menu, X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { getTranslation, Language } from '@/utils/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl md:text-2xl font-bold">
            <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
              <Phone className="text-white" size={20} />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              4phone
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex space-x-6 space-x-reverse">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{getTranslation(language, 'home')}</span>
              </Link>
              
              <Link 
                to="/repairs" 
                className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base ${
                  isActive('/repairs') 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Wrench size={16} />
                <span>{getTranslation(language, 'repairs')}</span>
              </Link>
              
              <Link 
                to="/parts" 
                className={`flex items-center space-x-2 space-x-reverse px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base ${
                  isActive('/parts') 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingCart size={16} />
                <span>{getTranslation(language, 'parts')}</span>
              </Link>
            </nav>
            
            <LanguageToggle 
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle 
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{getTranslation(language, 'home')}</span>
              </Link>
              
              <Link 
                to="/repairs" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive('/repairs') 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Wrench size={18} />
                <span>{getTranslation(language, 'repairs')}</span>
              </Link>
              
              <Link 
                to="/parts" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive('/parts') 
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingCart size={18} />
                <span>{getTranslation(language, 'parts')}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
