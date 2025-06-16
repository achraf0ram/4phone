
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { Language } from '@/utils/translations';

interface DashboardStatsProps {
  language: Language;
  stats: {
    repairs: number;
    orders: number;
    phones: number;
    parts: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ language, stats }) => {
  const statsData = [
    {
      title: language === 'ar' ? 'طلبات الإصلاح' : 'Demandes de réparation',
      value: stats.repairs,
      change: '+12%',
      trend: 'up',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: Activity
    },
    {
      title: language === 'ar' ? 'طلبات الشراء' : 'Commandes d\'achat',
      value: stats.orders,
      change: '+8%',
      trend: 'up',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: TrendingUp
    },
    {
      title: language === 'ar' ? 'الهواتف المستعملة' : 'Téléphones d\'occasion',
      value: stats.phones,
      change: '-2%',
      trend: 'down',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: Activity
    },
    {
      title: language === 'ar' ? 'قطع الغيار' : 'Pièces détachées',
      value: stats.parts,
      change: '+15%',
      trend: 'up',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: TrendingUp
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <Badge variant={stat.trend === 'up' ? 'default' : 'secondary'} className="flex items-center gap-1">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change}
              </Badge>
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {language === 'ar' ? 'مقارنة بالشهر الماضي' : 'Comparé au mois dernier'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
