import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
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
import { useRepairRequests } from '@/hooks/useRepairRequests';
import { usePurchaseOrders } from '@/hooks/usePurchaseOrders';
import { useUsedPhones } from '@/hooks/useUsedPhones';
import { usePartsInventory } from '@/hooks/usePartsInventory';
import { useAuth } from '@/hooks/useAuth';

interface DashboardProps {
  language: Language;
  onLanguageChange: (lang: string) => void;
}

type DashboardTab = 'overview' | 'repairs' | 'orders' | 'phones' | 'parts';

const Dashboard: React.FC<DashboardProps> = ({ language, onLanguageChange }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const navigate = useNavigate();
  const { logout } = useAuth();
  const adminUser = localStorage.getItem('adminUser') || 'Admin';

  // Get real-time data from hooks
  const { requests } = useRepairRequests();
  const { orders } = usePurchaseOrders();
  const { phones } = useUsedPhones();
  const { parts } = usePartsInventory();

  const stats = {
    repairs: requests.length,
    orders: orders.length,
    phones: phones.length,
    parts: parts.length
  };

  const handleLogout = () => {
    logout();
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
                      <p className="font-medium">{language === 'ar' ? 'البيانات متصلة بقاعدة البيانات' : 'Données connectées à la base'}</p>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'جميع البيانات الآن حقيقية ومتزامنة' : 'Toutes les données sont réelles et synchronisées'}</p>
                    </div>
                    <Badge>جديد</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">{language === 'ar' ? 'تم ربط المنصة بـ Supabase' : 'Plateforme connectée à Supabase'}</p>
                      <p className="text-sm text-gray-600">{language === 'ar' ? 'قاعدة بيانات آمنة وموثوقة' : 'Base de données sécurisée et fiable'}</p>
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
                      <span>{language === 'ar' ? 'طلبات الإصلاح النشطة' : 'Réparations actives'}</span>
                      <span className="font-semibold">{requests.filter(r => r.status === 'pending' || r.status === 'in_progress').length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(requests.filter(r => r.status === 'pending' || r.status === 'in_progress').length / Math.max(requests.length, 1)) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{language === 'ar' ? 'طلبات الشراء المعلقة' : 'Commandes en attente'}</span>
                      <span className="font-semibold">{orders.filter(o => o.status === 'pending').length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${(orders.filter(o => o.status === 'pending').length / Math.max(orders.length, 1)) * 100}%` }}></div>
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
                ? `مرحباً ${adminUser} - منصة متكاملة مع قاعدة البيانات` 
                : `Bonjour ${adminUser} - Plateforme intégrée avec base de données`
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
    </div>
  );
};

export default Dashboard;
