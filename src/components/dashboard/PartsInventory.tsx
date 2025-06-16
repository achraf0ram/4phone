
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
import { Plus, Edit, Trash2, Package } from 'lucide-react';

interface PartsInventoryProps {
  language: Language;
}

const PartsInventory: React.FC<PartsInventoryProps> = ({ language }) => {
  const [parts, setParts] = useState([
    {
      id: 1,
      name: 'شاشة iPhone 14 Pro',
      category: 'شاشات',
      price: 800,
      stock: 15,
      minStock: 5,
      status: 'in_stock'
    },
    {
      id: 2,
      name: 'بطارية Samsung Galaxy S23',
      category: 'بطاريات',
      price: 200,
      stock: 3,
      minStock: 5,
      status: 'low_stock'
    },
    {
      id: 3,
      name: 'كاميرا iPhone 13',
      category: 'كاميرات',
      price: 450,
      stock: 0,
      minStock: 3,
      status: 'out_of_stock'
    },
    {
      id: 4,
      name: 'مكبر صوت Xiaomi Mi 11',
      category: 'مكبرات صوت',
      price: 120,
      stock: 8,
      minStock: 3,
      status: 'in_stock'
    }
  ]);

  const [newPart, setNewPart] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    minStock: ''
  });

  const [editingPart, setEditingPart] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      in_stock: {
        label: language === 'ar' ? 'متوفر' : 'En stock',
        variant: 'default' as const
      },
      low_stock: {
        label: language === 'ar' ? 'مخزون منخفض' : 'Stock faible',
        variant: 'secondary' as const
      },
      out_of_stock: {
        label: language === 'ar' ? 'نفدت الكمية' : 'Rupture de stock',
        variant: 'destructive' as const
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig];

    return (
      <Badge variant={config?.variant || 'secondary'}>
        {config?.label || status}
      </Badge>
    );
  };

  const handleAddPart = () => {
    if (newPart.name && newPart.category && newPart.price && newPart.stock) {
      const stock = parseInt(newPart.stock);
      const minStock = parseInt(newPart.minStock) || 5;
      
      let status = 'in_stock';
      if (stock === 0) status = 'out_of_stock';
      else if (stock <= minStock) status = 'low_stock';

      const part = {
        id: Date.now(),
        name: newPart.name,
        category: newPart.category,
        price: parseInt(newPart.price),
        stock: stock,
        minStock: minStock,
        status: status
      };

      setParts([...parts, part]);
      setNewPart({ name: '', category: '', price: '', stock: '', minStock: '' });
      setShowAddForm(false);
    }
  };

  const handleDeletePart = (id: number) => {
    setParts(parts.filter(part => part.id !== id));
  };

  const handleUpdateStock = (id: number, newStock: number) => {
    setParts(parts.map(part => {
      if (part.id === id) {
        let status = 'in_stock';
        if (newStock === 0) status = 'out_of_stock';
        else if (newStock <= part.minStock) status = 'low_stock';
        
        return { ...part, stock: newStock, status };
      }
      return part;
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {language === 'ar' ? 'مخزون قطع الغيار' : 'Inventaire des pièces'}
        </h2>
        <Button onClick={() => setShowAddForm(!showAddForm)} className="flex items-center gap-2">
          <Plus size={16} />
          {language === 'ar' ? 'إضافة قطعة' : 'Ajouter pièce'}
        </Button>
      </div>

      {/* Add Part Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'إضافة قطعة غيار جديدة' : 'Ajouter une nouvelle pièce'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Input
                placeholder={language === 'ar' ? 'اسم القطعة' : 'Nom de la pièce'}
                value={newPart.name}
                onChange={(e) => setNewPart({...newPart, name: e.target.value})}
              />
              <Input
                placeholder={language === 'ar' ? 'الفئة' : 'Catégorie'}
                value={newPart.category}
                onChange={(e) => setNewPart({...newPart, category: e.target.value})}
              />
              <Input
                type="number"
                placeholder={language === 'ar' ? 'السعر' : 'Prix'}
                value={newPart.price}
                onChange={(e) => setNewPart({...newPart, price: e.target.value})}
              />
              <Input
                type="number"
                placeholder={language === 'ar' ? 'الكمية' : 'Quantité'}
                value={newPart.stock}
                onChange={(e) => setNewPart({...newPart, stock: e.target.value})}
              />
              <div className="flex gap-2">
                <Button onClick={handleAddPart} size="sm">
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="text-green-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'المنتجات المتوفرة' : 'Produits en stock'}
                </p>
                <p className="text-2xl font-bold text-green-500">
                  {parts.filter(p => p.status === 'in_stock').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="text-orange-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'مخزون منخفض' : 'Stock faible'}
                </p>
                <p className="text-2xl font-bold text-orange-500">
                  {parts.filter(p => p.status === 'low_stock').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="text-red-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">
                  {language === 'ar' ? 'نفدت الكمية' : 'Rupture de stock'}
                </p>
                <p className="text-2xl font-bold text-red-500">
                  {parts.filter(p => p.status === 'out_of_stock').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'ar' ? 'اسم القطعة' : 'Nom de la pièce'}</TableHead>
              <TableHead>{language === 'ar' ? 'الفئة' : 'Catégorie'}</TableHead>
              <TableHead>{language === 'ar' ? 'السعر' : 'Prix'}</TableHead>
              <TableHead>{language === 'ar' ? 'المخزون' : 'Stock'}</TableHead>
              <TableHead>{language === 'ar' ? 'الحد الأدنى' : 'Stock min'}</TableHead>
              <TableHead>{language === 'ar' ? 'الحالة' : 'Statut'}</TableHead>
              <TableHead>{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.id}>
                <TableCell className="font-medium">{part.name}</TableCell>
                <TableCell>{part.category}</TableCell>
                <TableCell>{part.price} درهم</TableCell>
                <TableCell>
                  {editingPart === part.id ? (
                    <Input
                      type="number"
                      defaultValue={part.stock}
                      className="w-20"
                      onBlur={(e) => {
                        handleUpdateStock(part.id, parseInt(e.target.value) || 0);
                        setEditingPart(null);
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleUpdateStock(part.id, parseInt((e.target as HTMLInputElement).value) || 0);
                          setEditingPart(null);
                        }
                      }}
                    />
                  ) : (
                    <span 
                      onClick={() => setEditingPart(part.id)}
                      className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                    >
                      {part.stock}
                    </span>
                  )}
                </TableCell>
                <TableCell>{part.minStock}</TableCell>
                <TableCell>{getStatusBadge(part.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setEditingPart(part.id)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeletePart(part.id)}
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

export default PartsInventory;
