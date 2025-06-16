
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
import { Eye, Check, X, Clock } from 'lucide-react';

interface RepairRequestsProps {
  language: Language;
}

const RepairRequests: React.FC<RepairRequestsProps> = ({ language }) => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      customerName: 'أحمد محمد',
      phone: '0612345678',
      deviceModel: 'iPhone 14 Pro',
      problem: 'شاشة مكسورة',
      status: 'pending',
      date: '2024-01-15',
      estimatedCost: 800
    },
    {
      id: 2,
      customerName: 'فاطمة العلوي',
      phone: '0623456789',
      deviceModel: 'Samsung Galaxy S23',
      problem: 'بطارية لا تشحن',
      status: 'in_progress',
      date: '2024-01-14',
      estimatedCost: 350
    },
    {
      id: 3,
      customerName: 'يوسف الحسني',
      phone: '0634567890',
      deviceModel: 'iPhone 13',
      problem: 'مشكلة في الكاميرا',
      status: 'completed',
      date: '2024-01-13',
      estimatedCost: 500
    }
  ]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: language === 'ar' ? 'في الانتظار' : 'En attente',
        variant: 'secondary' as const,
        icon: Clock
      },
      in_progress: {
        label: language === 'ar' ? 'قيد التنفيذ' : 'En cours',
        variant: 'default' as const,
        icon: Clock
      },
      completed: {
        label: language === 'ar' ? 'مكتمل' : 'Terminé',
        variant: 'default' as const,
        icon: Check
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Clock;

    return (
      <Badge variant={config?.variant || 'secondary'} className="flex items-center gap-1">
        <Icon size={12} />
        {config?.label || status}
      </Badge>
    );
  };

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {language === 'ar' ? 'طلبات الإصلاح' : 'Demandes de réparation'}
        </h2>
        <div className="text-sm text-gray-600">
          {language === 'ar' ? `إجمالي ${requests.length} طلب` : `Total ${requests.length} demandes`}
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'ar' ? 'العميل' : 'Client'}</TableHead>
              <TableHead>{language === 'ar' ? 'الهاتف' : 'Téléphone'}</TableHead>
              <TableHead>{language === 'ar' ? 'الجهاز' : 'Appareil'}</TableHead>
              <TableHead>{language === 'ar' ? 'المشكلة' : 'Problème'}</TableHead>
              <TableHead>{language === 'ar' ? 'الحالة' : 'Statut'}</TableHead>
              <TableHead>{language === 'ar' ? 'التكلفة' : 'Coût'}</TableHead>
              <TableHead>{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.customerName}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>{request.deviceModel}</TableCell>
                <TableCell>{request.problem}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>{request.estimatedCost} درهم</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye size={16} />
                    </Button>
                    {request.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => handleStatusUpdate(request.id, 'in_progress')}
                        >
                          <Check size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleStatusUpdate(request.id, 'rejected')}
                        >
                          <X size={16} />
                        </Button>
                      </>
                    )}
                    {request.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => handleStatusUpdate(request.id, 'completed')}
                      >
                        {language === 'ar' ? 'إكمال' : 'Terminer'}
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

export default RepairRequests;
