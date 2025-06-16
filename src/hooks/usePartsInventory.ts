
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Part {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  min_stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  created_at: string;
  updated_at: string;
}

export const usePartsInventory = () => {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchParts = async () => {
    try {
      const { data, error } = await supabase
        .from('parts_inventory')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setParts(data || []);
    } catch (error) {
      console.error('Error fetching parts inventory:', error);
      toast.error('خطأ في تحميل مخزون قطع الغيار');
    } finally {
      setLoading(false);
    }
  };

  const addPart = async (partData: Omit<Part, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
    try {
      let status = 'in_stock';
      if (partData.stock === 0) status = 'out_of_stock';
      else if (partData.stock <= partData.min_stock) status = 'low_stock';

      const { data, error } = await supabase
        .from('parts_inventory')
        .insert([{ ...partData, status }])
        .select()
        .single();
      
      if (error) throw error;
      
      setParts(prev => [data, ...prev]);
      toast.success('تم إضافة قطعة الغيار بنجاح');
      return data;
    } catch (error) {
      console.error('Error adding part:', error);
      toast.error('خطأ في إضافة قطعة الغيار');
      return null;
    }
  };

  const updatePartStock = async (id: string, newStock: number) => {
    try {
      const part = parts.find(p => p.id === id);
      if (!part) return;

      let status = 'in_stock';
      if (newStock === 0) status = 'out_of_stock';
      else if (newStock <= part.min_stock) status = 'low_stock';

      const { error } = await supabase
        .from('parts_inventory')
        .update({ stock: newStock, status })
        .eq('id', id);
      
      if (error) throw error;
      
      setParts(prev => 
        prev.map(p => p.id === id ? { ...p, stock: newStock, status: status as Part['status'] } : p)
      );
      toast.success('تم تحديث المخزون بنجاح');
    } catch (error) {
      console.error('Error updating part stock:', error);
      toast.error('خطأ في تحديث المخزون');
    }
  };

  const deletePart = async (id: string) => {
    try {
      const { error } = await supabase
        .from('parts_inventory')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setParts(prev => prev.filter(part => part.id !== id));
      toast.success('تم حذف قطعة الغيار بنجاح');
    } catch (error) {
      console.error('Error deleting part:', error);
      toast.error('خطأ في حذف قطعة الغيار');
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  return {
    parts,
    loading,
    addPart,
    updatePartStock,
    deletePart,
    refetch: fetchParts
  };
};
