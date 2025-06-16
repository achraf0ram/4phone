
import React, { useState } from 'react';
import { Language } from '@/utils/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Truck, Check, Package } from 'lucide-react';

interface PurchaseOrdersProps {
  language: Language;
}

const PurchaseOrders: React.FC<PurchaseOrdersProps> = ({ language }) => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: 'سارة أحمد',
      phone: '0612345678',
      items: [
        { name: 'شاشة iPhone 14', quantity: 1, price: 800 },
        { name: 'بطارية iPhone 14', quantity: 1, price: 200 }
      ],
      total: 1000,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 2,
      customerName: 'محمد الكريم',
      phone: '0623456789',
      items: [
        { name: 'Samsung Galaxy S23 Screen', quantity: 1, price: 600 }
      ],
      total: 600,
      status: 'processing',
      date: '2024-01-14'
    },
    {
      id: 3,
      customerName: 'عائشة المغربي',
      phone: '0634567890',
      items: [
        { name: 'iPhone 13 Camera', quantity: 1, price: 400 }
      ],
      total: 400,
      status: 'shipped',
      date: '2024-01-13'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: language === 'ar' ? 'في الانتظار' : 'En attente',
        variant: 'secondary' as const,
        icon: Package
      },
      processing: {
        label: language === 'ar' ? 'قيد التحضير' : 'En préparation',
        variant: 'default' as const,
        icon: Package
      },
      shipped: {
        label: language === 'ar' ? 'تم الشحن' : 'Expédié',
        variant: 'default' as const,
        icon: Truck
      },
      delivered: {
        label: language === 'ar' ? 'تم التسليم' : 'Livré',
        variant: 'default' as const,
        icon: Check
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Package;

    return (
      <Badge variant={config?.variant || 'secondary'} className="flex items-center gap-1">
        <Icon size={12} />
        {config?.label || status}
      </Badge>
    );
  };

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {language === 'ar' ? 'طلبات الشراء' : 'Commandes d\'achat'}
        </h2>
        <div className="text-sm text-gray-600">
          {language === 'ar' ? `إجمالي ${orders.length} طلب` : `Total ${orders.length} commandes`}
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'ar' ? 'رقم الطلب' : 'N° commande'}</TableHead>
              <TableHead>{language === 'ar' ? 'العميل' : 'Client'}</TableHead>
              <TableHead>{language === 'ar' ? 'المنتجات' : 'Produits'}</TableHead>
              <TableHead>{language === 'ar' ? 'المجموع' : 'Total'}</TableHead>
              <TableHead>{language === 'ar' ? 'الحالة' : 'Statut'}</TableHead>
              <TableHead>{language === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
              <TableHead>{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id.toString().padStart(4, '0')}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customerName}</div>
                    <div className="text-sm text-gray-600">{order.phone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.name} x{item.quantity}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{order.total} درهم</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye size={16} />
                    </Button>
                    {order.status === 'pending' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => handleStatusUpdate(order.id, 'processing')}
                      >
                        {language === 'ar' ? 'تأكيد' : 'Confirmer'}
                      </Button>
                    )}
                    {order.status === 'processing' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => handleStatusUpdate(order.id, 'shipped')}
                      >
                        <Truck size={16} />
                        {language === 'ar' ? 'شحن' : 'Expédier'}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PurchaseOrders;
