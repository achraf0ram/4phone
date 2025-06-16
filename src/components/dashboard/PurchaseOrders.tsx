
import React from 'react';
import { Language } from '@/utils/translations';
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
import { Eye, Truck, Check, Package, Loader2 } from 'lucide-react';
import { usePurchaseOrders } from '@/hooks/usePurchaseOrders';

interface PurchaseOrdersProps {
  language: Language;
}

const PurchaseOrders: React.FC<PurchaseOrdersProps> = ({ language }) => {
  const { orders, loading, updateOrderStatus } = usePurchaseOrders();

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

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">{language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</span>
      </div>
    );
  }

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
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{(index + 1).toString().padStart(4, '0')}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer_name}</div>
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
                <TableCell>{new Date(order.created_at).toLocaleDateString('ar-MA')}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye size={16} />
                    </Button>
                    {order.status === 'pending' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => updateOrderStatus(order.id, 'processing')}
                      >
                        {language === 'ar' ? 'تأكيد' : 'Confirmer'}
                      </Button>
                    )}
                    {order.status === 'processing' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => updateOrderStatus(order.id, 'shipped')}
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
