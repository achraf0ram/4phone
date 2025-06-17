
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface PurchaseOrder {
  id: string;
  customer_name: string;
  phone: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  created_at: string;
  updated_at: string;
}

export const usePurchaseOrders = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('purchase_orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setOrders((data || []) as PurchaseOrder[]);
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
      toast.error('خطأ في تحميل طلبات الشراء');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('purchase_orders')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      setOrders(prev => 
        prev.map(order => order.id === id ? { ...order, status: status as PurchaseOrder['status'] } : order)
      );
      toast.success('تم تحديث حالة الطلب بنجاح');
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('خطأ في تحديث حالة الطلب');
    }
  };

  const addOrder = async (orderData: Omit<PurchaseOrder, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('purchase_orders')
        .insert([orderData])
        .select()
        .single();
      
      if (error) throw error;
      
      setOrders(prev => [data as PurchaseOrder, ...prev]);
      toast.success('تم إضافة طلب الشراء بنجاح');
      return data;
    } catch (error) {
      console.error('Error adding purchase order:', error);
      toast.error('خطأ في إضافة طلب الشراء');
      return null;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    updateOrderStatus,
    addOrder,
    refetch: fetchOrders
  };
};
