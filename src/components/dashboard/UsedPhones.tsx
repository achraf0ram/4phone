
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
import { Eye, Check, X, Plus, Edit, Trash2 } from 'lucide-react';

interface UsedPhonesProps {
  language: Language;
}

const UsedPhones: React.FC<UsedPhonesProps> = ({ language }) => {
  const [phones, setPhones] = useState([
    {
      id: 1,
      customerName: 'خالد الزهراني',
      phone: '0612345678',
      deviceModel: 'iPhone 12 Pro',
      condition: 'ممتاز',
      offerPrice: 3500,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: 2,
      customerName: 'نورا السعدي',
      phone: '0623456789',
      deviceModel: 'Samsung Galaxy S22',
      condition: 'جيد',
      offerPrice: 2200,
      status: 'approved',
      date: '2024-01-14'
    },
    {
      id: 3,
      customerName: 'عبدالله المنصوري',
      phone: '0634567890',
      deviceModel: 'iPhone 11',
      condition: 'متوسط',
      offerPrice: 1800,
      status: 'in_inventory',
      date: '2024-01-13'
    }
  ]);

  const [newPhone, setNewPhone] = useState({
    model: '',
    condition: '',
    price: '',
    description: ''
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

  const handleStatusUpdate = (id: number, newStatus: string) => {
    setPhones(phones.map(phone => 
      phone.id === id ? { ...phone, status: newStatus } : phone
    ));
  };

  const handleAddPhone = () => {
    if (newPhone.model && newPhone.condition && newPhone.price) {
      const phone = {
        id: Date.now(),
        customerName: 'إدارة المتجر',
        phone: '',
        deviceModel: newPhone.model,
        condition: newPhone.condition,
        offerPrice: parseInt(newPhone.price),
        status: 'in_inventory',
        date: new Date().toISOString().split('T')[0]
      };
      setPhones([...phones, phone]);
      setNewPhone({ model: '', condition: '', price: '', description: '' });
      setShowAddForm(false);
    }
  };

  const handleDeletePhone = (id: number) => {
    setPhones(phones.filter(phone => phone.id !== id));
  };

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
                value={newPhone.model}
                onChange={(e) => setNewPhone({...newPhone, model: e.target.value})}
              />
              <Input
                placeholder={language === 'ar' ? 'الحالة' : 'État'}
                value={newPhone.condition}
                onChange={(e) => setNewPhone({...newPhone, condition: e.target.value})}
              />
              <Input
                type="number"
                placeholder={language === 'ar' ? 'السعر' : 'Prix'}
                value={newPhone.price}
                onChange={(e) => setNewPhone({...newPhone, price: e.target.value})}
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
                    <div className="font-medium">{phone.customerName}</div>
                    {phone.phone && (
                      <div className="text-sm text-gray-600">{phone.phone}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{phone.deviceModel}</TableCell>
                <TableCell>{phone.condition}</TableCell>
                <TableCell className="font-medium">{phone.offerPrice} درهم</TableCell>
                <TableCell>{getStatusBadge(phone.status)}</TableCell>
                <TableCell>{phone.date}</TableCell>
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
                          onClick={() => handleStatusUpdate(phone.id, 'approved')}
                        >
                          <Check size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleStatusUpdate(phone.id, 'rejected')}
                        >
                          <X size={16} />
                        </Button>
                      </>
                    )}
                    {phone.status === 'approved' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => handleStatusUpdate(phone.id, 'in_inventory')}
                      >
                        {language === 'ar' ? 'أضافة للمخزون' : 'Ajouter au stock'}
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeletePhone(phone.id)}
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
