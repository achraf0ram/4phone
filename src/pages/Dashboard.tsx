
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Language } from '@/utils/translations';
import { 
  Wrench, 
  ShoppingCart, 
  Phone, 
  Package, 
  Plus,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RepairRequests from '@/components/dashboard/RepairRequests';
import PurchaseOrders from '@/components/dashboard/PurchaseOrders';
import UsedPhones from '@/components/dashboard/UsedPhones';
import PartsInventory from '@/components/dashboard/PartsInventory';

interface DashboardProps {
  language: Language;
  onLanguageChange: (lang: string) => void;
}

type DashboardTab = 'repairs' | 'orders' | 'phones' | 'parts';

const Dashboard: React.FC<DashboardProps> = ({ language, onLanguageChange }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('repairs');

  const tabs = [
    {
      id: 'repairs' as DashboardTab,
      label: language === 'ar' ? 'طلبات الإصلاح' : 'Demandes de réparation',
      icon: Wrench,
      count: 5
    },
    {
      id: 'orders' as DashboardTab,
      label: language === 'ar' ? 'طلبات الشراء' : 'Commandes d\'achat',
      icon: ShoppingCart,
      count: 12
    },
    {
      id: 'phones' as DashboardTab,
      label: language === 'ar' ? 'الهواتف المستعملة' : 'Téléphones d\'occasion',
      icon: Phone,
      count: 8
    },
    {
      id: 'parts' as DashboardTab,
      label: language === 'ar' ? 'قطع الغيار' : 'Pièces détachées',
      icon: Package,
      count: 24
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'repairs':
        return <RepairRequests language={language} />;
      case 'orders':
        return <PurchaseOrders language={language} />;
      case 'phones':
        return <UsedPhones language={language} />;
      case 'parts':
        return <PartsInventory language={language} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header language={language} onLanguageChange={onLanguageChange} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'لوحة التحكم' : 'Tableau de bord'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? 'إدارة جميع عمليات المتجر والطلبات' 
                : 'Gérer toutes les opérations du magasin et les commandes'
              }
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Settings size={20} />
            {language === 'ar' ? 'الإعدادات' : 'Paramètres'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {tabs.map((tab) => (
            <Card 
              key={tab.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                activeTab === tab.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {tab.label}
                </CardTitle>
                <tab.icon className={`h-4 w-4 ${
                  activeTab === tab.id ? 'text-blue-500' : 'text-muted-foreground'
                }`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tab.count}</div>
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' ? 'عنصر جديد' : 'nouvel élément'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {renderTabContent()}
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default Dashboard;
