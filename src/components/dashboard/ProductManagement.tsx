import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useProducts } from '@/hooks/useProducts';

interface ProductManagementProps {
  language: 'ar' | 'fr';
}

const ProductManagement: React.FC<ProductManagementProps> = ({ language }) => {
  const { products, addProduct, updateProduct, deleteProduct, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    description: '',
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
      toast.error(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Veuillez remplir tous les champs requis');
      return;
    }

    addProduct(newProduct);
    setNewProduct({
      name: '',
      category: '',
      price: 0,
      stock: 0,
      description: '',
    });
    setIsAddDialogOpen(false);
    toast.success(language === 'ar' ? 'تمت إضافة المنتج بنجاح' : 'Produit ajouté avec succès');
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    toast.success(language === 'ar' ? 'تم حذف المنتج بنجاح' : 'Produit supprimé avec succès');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      {language === 'ar' ? 'جاري التحميل...' : 'Chargement...'}
    </div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">
      {error}
    </div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder={language === 'ar' ? 'بحث عن منتج...' : 'Rechercher un produit...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={20} />
              {language === 'ar' ? 'إضافة منتج' : 'Ajouter un produit'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === 'ar' ? 'إضافة منتج جديد' : 'Ajouter un nouveau produit'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>{language === 'ar' ? 'اسم المنتج' : 'Nom du produit'}</Label>
                <Input
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'الفئة' : 'Catégorie'}</Label>
                <Input
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'السعر' : 'Prix'}</Label>
                <Input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'الكمية' : 'Stock'}</Label>
                <Input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>{language === 'ar' ? 'الوصف' : 'Description'}</Label>
                <Input
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </div>
              <Button onClick={handleAddProduct} className="w-full">
                {language === 'ar' ? 'إضافة' : 'Ajouter'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'ar' ? 'اسم المنتج' : 'Nom du produit'}</TableHead>
              <TableHead>{language === 'ar' ? 'الفئة' : 'Catégorie'}</TableHead>
              <TableHead>{language === 'ar' ? 'السعر' : 'Prix'}</TableHead>
              <TableHead>{language === 'ar' ? 'الكمية' : 'Stock'}</TableHead>
              <TableHead>{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
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

export default ProductManagement; 