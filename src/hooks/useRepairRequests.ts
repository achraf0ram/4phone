
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface RepairRequest {
  id: string;
  customer_name: string;
  phone: string;
  device_model: string;
  problem: string;
  estimated_cost: number | null;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  created_at: string;
  updated_at: string;
}

export const useRepairRequests = () => {
  const [requests, setRequests] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('repair_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching repair requests:', error);
      toast.error('خطأ في تحميل طلبات الإصلاح');
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('repair_requests')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      setRequests(prev => 
        prev.map(req => req.id === id ? { ...req, status: status as RepairRequest['status'] } : req)
      );
      toast.success('تم تحديث حالة الطلب بنجاح');
    } catch (error) {
      console.error('Error updating request status:', error);
      toast.error('خطأ في تحديث حالة الطلب');
    }
  };

  const addRequest = async (requestData: Omit<RepairRequest, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('repair_requests')
        .insert([requestData])
        .select()
        .single();
      
      if (error) throw error;
      
      setRequests(prev => [data, ...prev]);
      toast.success('تم إضافة طلب الإصلاح بنجاح');
      return data;
    } catch (error) {
      console.error('Error adding repair request:', error);
      toast.error('خطأ في إضافة طلب الإصلاح');
      return null;
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    loading,
    updateRequestStatus,
    addRequest,
    refetch: fetchRequests
  };
};
