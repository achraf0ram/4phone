
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface UsedPhone {
  id: string;
  customer_name: string | null;
  phone: string | null;
  device_model: string;
  condition: string;
  offer_price: number;
  status: 'pending' | 'approved' | 'rejected' | 'in_inventory';
  created_at: string;
  updated_at: string;
}

export const useUsedPhones = () => {
  const [phones, setPhones] = useState<UsedPhone[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhones = async () => {
    try {
      const { data, error } = await supabase
        .from('used_phones')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPhones((data || []) as UsedPhone[]);
    } catch (error) {
      console.error('Error fetching used phones:', error);
      toast.error('خطأ في تحميل الهواتف المستعملة');
    } finally {
      setLoading(false);
    }
  };

  const updatePhoneStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('used_phones')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      setPhones(prev => 
        prev.map(phone => phone.id === id ? { ...phone, status: status as UsedPhone['status'] } : phone)
      );
      toast.success('تم تحديث حالة الهاتف بنجاح');
    } catch (error) {
      console.error('Error updating phone status:', error);
      toast.error('خطأ في تحديث حالة الهاتف');
    }
  };

  const addPhone = async (phoneData: Omit<UsedPhone, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('used_phones')
        .insert([phoneData])
        .select()
        .single();
      
      if (error) throw error;
      
      setPhones(prev => [data as UsedPhone, ...prev]);
      toast.success('تم إضافة الهاتف بنجاح');
      return data;
    } catch (error) {
      console.error('Error adding used phone:', error);
      toast.error('خطأ في إضافة الهاتف');
      return null;
    }
  };

  const deletePhone = async (id: string) => {
    try {
      const { error } = await supabase
        .from('used_phones')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setPhones(prev => prev.filter(phone => phone.id !== id));
      toast.success('تم حذف الهاتف بنجاح');
    } catch (error) {
      console.error('Error deleting phone:', error);
      toast.error('خطأ في حذف الهاتف');
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  return {
    phones,
    loading,
    updatePhoneStatus,
    addPhone,
    deletePhone,
    refetch: fetchPhones
  };
};
