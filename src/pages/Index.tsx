
import React from 'react';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import { Phone, Wrench, ShoppingCart, Star, Users, Clock } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
              مرحباً بك في فيكس فون
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            منصتك الشاملة لإصلاح الهواتف وبيع وشراء قطع الغيار الأصلية بأفضل الأسعار وأعلى جودة في الخدمة
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              احجز إصلاح الآن
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
              تصفح قطع الغيار
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center group">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">10,000+</h3>
            <p className="text-gray-600">عميل راضٍ</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Wrench className="text-white" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">50,000+</h3>
            <p className="text-gray-600">جهاز تم إصلاحه</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock className="text-white" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">24/7</h3>
            <p className="text-gray-600">خدمة العملاء</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
            icon={Wrench}
            title="خدمات الإصلاح"
            description="إصلاح احترافي لجميع أنواع الهواتف الذكية بضمان شامل وقطع غيار أصلية"
            gradient="from-blue-500 to-purple-600"
          />
          
          <ServiceCard
            icon={ShoppingCart}
            title="بيع قطع الغيار"
            description="قطع غيار أصلية ومضمونة لجميع أنواع الهواتف بأفضل الأسعار"
            gradient="from-green-500 to-blue-500"
          />
          
          <ServiceCard
            icon={Phone}
            title="شراء الهواتف"
            description="نشتري هواتفك المستعملة بأفضل الأسعار مع تقييم فوري وعادل"
            gradient="from-purple-500 to-pink-500"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            لماذا نحن الأفضل؟
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">جودة عالية</h3>
              <p className="text-gray-600">نستخدم قطع غيار أصلية فقط</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">خدمة سريعة</h3>
              <p className="text-gray-600">إصلاح في نفس اليوم</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">فريق محترف</h3>
              <p className="text-gray-600">فنيون مدربون ومعتمدون</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ضمان شامل</h3>
              <p className="text-gray-600">ضمان على جميع الإصلاحات</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
