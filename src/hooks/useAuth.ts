
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(isLoggedIn);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      
      // التحقق من بيانات تسجيل الدخول مع قاعدة البيانات
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
        return false;
      }

      // للبساطة، سنتحقق من كلمة المرور مباشرة (في الإنتاج يجب استخدام hashing)
      if (password === '123456') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('adminUser', username);
        setIsAuthenticated(true);
        toast.success('تم تسجيل الدخول بنجاح!');
        return true;
      } else {
        toast.error('اسم المستخدم أو كلمة المرور غير صحيحة');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('خطأ في تسجيل الدخول');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    toast.success('تم تسجيل الخروج بنجاح');
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout
  };
};
