
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
import { Eye, Check, X, Clock, Loader2 } from 'lucide-react';
import { useRepairRequests } from '@/hooks/useRepairRequests';

interface RepairRequestsProps {
  language: Language;
}

const RepairRequests: React.FC<RepairRequestsProps> = ({ language }) => {
  const { requests, loading, updateRequestStatus } = useRepairRequests();

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
                <TableCell className="font-medium">{request.customer_name}</TableCell>
                <TableCell>{request.phone}</TableCell>
                <TableCell>{request.device_model}</TableCell>
                <TableCell>{request.problem}</TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>{request.estimated_cost ? `${request.estimated_cost} درهم` : '-'}</TableCell>
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
                          onClick={() => updateRequestStatus(request.id, 'in_progress')}
                        >
                          <Check size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updateRequestStatus(request.id, 'rejected')}
                        >
                          <X size={16} />
                        </Button>
                      </>
                    )}
                    {request.status === 'in_progress' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => updateRequestStatus(request.id, 'completed')}
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
