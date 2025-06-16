
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Language } from '@/utils/translations';
import { 
  Wrench, 
  ShoppingCart, 
  Phone, 
  Package, 
  Settings,
  LogOut,
  Bell,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import RepairRequests from '@/components/dashboard/RepairRequests';
import PurchaseOrders from '@/components/dashboard/PurchaseOrders';
import UsedPhones from '@/components/dashboard/UsedPhones';
import PartsInventory from '@/components/dashboard/PartsInventory';
import DashboardStats from '@/components/dashboard/DashboardStats';

interface DashboardProps {
  language: Language;
  onLanguageChange: (lang: string) => void;
}

type DashboardTab = 'overview' | 'repairs' | 'orders' | 'phones' | 'parts';

const Dashboard: React.FC<DashboardProps> = ({ language, onLanguageChange }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const navigate = useNavigate();
  const adminUser = localStorage.getItem('adminUser') || 'Admin';

  const stats = {
    repairs: 5,
    orders: 12,
    phones: 8,
    parts: 24
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
    toast.success(language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Déconnexion réussie');
    navigate('/login');
  };

  const tabs = [
    {
      id: 'overview' as DashboardTab,
      label: language === 'ar' ? 'نظرة عامة' : 'Vue d\'ensemble',
      icon: BarChart3,
      count: null
    },
    {
      id: 'repairs' as DashboardTab,
      label: language === 'ar' ? 'طلبات الإصلاح' : 'Demandes de réparation',
      icon: Wrench,
      count: stats.repairs
    },
    {
      id: 'orders' as DashboardTab,
      label: language === 'ar' ? 'طلبات الشراء' : 'Commandes d\'achat',
      icon: ShoppingCart,
      count: stats.orders
    },
    {
      id: 'phones' as DashboardTab,
      label: language === 'ar' ? 'الهواتف المستعملة' : 'Téléphones d\'occasion',
      icon: Phone,
      count: stats.phones
    },
    {
      id: 'parts' as DashboardTab,
      label: language === 'ar' ? 'قطع الغيار' : 'Pièces détachées',
      icon: Package,
      count: stats.parts
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <DashboardStats language={language} stats={stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600" />
                    {language === 'ar' ? 'الإشعارات الأخيرة' : 'Notifications récentes'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">{language === 'ar' ? 'طلب إصلاح جديد' : 'Nouvelle demande de réparation'}</p>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'iPhone 14 Pro - شاشة مكسورة' : 'iPhone 14 Pro - Écran cassé'}</p>
                    </div>
                    <Badge>جديد</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">{language === 'ar' ? 'طلب شراء مكتمل' : 'Commande d\'achat terminée'}</p>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'بطارية Samsung Galaxy S23' : 'Batterie Samsung Galaxy S23'}</p>
                    </div>
                    <Badge variant="outline">مكتمل</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    {language === 'ar' ? 'الأنشطة الأخيرة' : 'Activités récentes'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'ar' ? 'الطلبات المعلقة' : 'Commandes en attente'}</span>
                      <span className="font-semibold">3</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'ar' ? 'الطلبات المكتملة' : 'Commandes terminées'}</span>
                      <span className="font-semibold">9</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
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
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-lg p-6 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {language === 'ar' ? 'لوحة التحكم' : 'Tableau de bord'}
            </h1>
            <p className="text-gray-600">
              {language === 'ar' 
                ? `مرحباً ${adminUser} - إدارة جميع عمليات المتجر والطلبات` 
                : `Bonjour ${adminUser} - Gérer toutes les opérations du magasin`
              }
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings size={20} />
              {language === 'ar' ? 'الإعدادات' : 'Paramètres'}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={20} />
              {language === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
            </Button>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="flex flex-wrap border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50 font-medium'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
                {tab.count !== null && (
                  <Badge variant={activeTab === tab.id ? 'default' : 'secondary'} className="ml-2">
                    {tab.count}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className={`${activeTab !== 'overview' ? 'bg-white rounded-lg shadow-sm' : ''}`}>
          {renderTabContent()}
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
};

export default Dashboard;
