
import React, { useState } from 'react';
import { Language } from '@/utils/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Check, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { useUsedPhones } from '@/hooks/useUsedPhones';

interface UsedPhonesProps {
  language: Language;
}

const UsedPhones: React.FC<UsedPhonesProps> = ({ language }) => {
  const { phones, loading, updatePhoneStatus, addPhone, deletePhone } = useUsedPhones();
  
  const [newPhone, setNewPhone] = useState({
    device_model: '',
    condition: '',
    offer_price: '',
    customer_name: 'إدارة المتجر',
    phone: ''
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        label: language === 'ar' ? 'في الانتظار' : 'En attente',
        variant: 'secondary' as const
      },
      approved: {
        label: language === 'ar' ? 'تم القبول' : 'Approuvé',
        variant: 'default' as const
      },
      rejected: {
        label: language === 'ar' ? 'مرفوض' : 'Rejeté',
        variant: 'destructive' as const
      },
      in_inventory: {
        label: language === 'ar' ? 'في المخزون' : 'En stock',
        variant: 'default' as const
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <Badge variant={config?.variant || 'secondary'}>
        {config?.label || status}
      </Badge>
    );
  };

  const handleAddPhone = async () => {
    if (newPhone.device_model && newPhone.condition && newPhone.offer_price) {
      const phoneData = {
        device_model: newPhone.device_model,
        condition: newPhone.condition,
        offer_price: parseFloat(newPhone.offer_price),
        customer_name: newPhone.customer_name,
        phone: newPhone.phone,
        status: 'in_inventory' as const
      };
      
      const result = await addPhone(phoneData);
      if (result) {
        setNewPhone({ device_model: '', condition: '', offer_price: '', customer_name: 'إدارة المتجر', phone: '' });
        setShowAddForm(false);
      }
    }
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
          {language === 'ar' ? 'الهواتف المستعملة' : 'Téléphones d\'occasion'}
        </h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
          <Plus size={16} />
          {language === 'ar' ? 'إضافة هاتف' : 'Ajouter téléphone'}
        </Button>
      </div>

      {/* Add Phone Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'إضافة هاتف جديد' : 'Ajouter un nouveau téléphone'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Input
                placeholder={language === 'ar' ? 'موديل الهاتف' : 'Modèle du téléphone'}
                value={newPhone.device_model}
                onChange={(e) => setNewPhone({...newPhone, device_model: e.target.value})}
              />
              <Input
                placeholder={language === 'ar' ? 'الحالة' : 'État'}
                value={newPhone.condition}
                onChange={(e) => setNewPhone({...newPhone, condition: e.target.value})}
              />
              <Input
                type="number"
                placeholder={language === 'ar' ? 'السعر' : 'Prix'}
                value={newPhone.offer_price}
                onChange={(e) => setNewPhone({...newPhone, offer_price: e.target.value})}
              />
              <div className="flex gap-2">
                <Button onClick={handleAddPhone} size="sm">
                  {language === 'ar' ? 'إضافة' : 'Ajouter'}
                </Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline" size="sm">
                  {language === 'ar' ? 'إلغاء' : 'Annuler'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'ar' ? 'العميل' : 'Client'}</TableHead>
              <TableHead>{language === 'ar' ? 'الجهاز' : 'Appareil'}</TableHead>
              <TableHead>{language === 'ar' ? 'الحالة' : 'État'}</TableHead>
              <TableHead>{language === 'ar' ? 'السعر المعروض' : 'Prix offert'}</TableHead>
              <TableHead>{language === 'ar' ? 'الحالة' : 'Statut'}</TableHead>
              <TableHead>{language === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
              <TableHead>{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {phones.map((phone) => (
              <TableRow key={phone.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{phone.customer_name || '-'}</div>
                    {phone.phone && (
                      <div className="text-sm text-gray-600">{phone.phone}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{phone.device_model}</TableCell>
                <TableCell>{phone.condition}</TableCell>
                <TableCell className="font-medium">{phone.offer_price} درهم</TableCell>
                <TableCell>{getStatusBadge(phone.status)}</TableCell>
                <TableCell>{new Date(phone.created_at).toLocaleDateString('ar-MA')}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye size={16} />
                    </Button>
                    {phone.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="default"
                          onClick={() => updatePhoneStatus(phone.id, 'approved')}
                        >
                          <Check size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => updatePhoneStatus(phone.id, 'rejected')}
                        >
                          <X size={16} />
                        </Button>
                      </>
                    )}
                    {phone.status === 'approved' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => updatePhoneStatus(phone.id, 'in_inventory')}
                      >
                        {language === 'ar' ? 'أضافة للمخزون' : 'Ajouter au stock'}
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deletePhone(phone.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
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

export default UsedPhones;
