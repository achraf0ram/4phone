import React from 'react';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import { Phone, Wrench, ShoppingCart, Star, Clock, Shield } from 'lucide-react';

const Repairs = () => {
  const repairServices = [
    {
      icon: Phone,
      title: "إصلاح الشاشة",
      description: "استبدال شاشات الهواتف المكسورة بقطع أصلية مع ضمان 6 أشهر",
      price: "من 150 درهم",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Wrench,
      title: "إصلاح البطارية",
      description: "استبدال بطاريات الهواتف المنتفخة أو التالفة ببطاريات أصلية",
      price: "من 120 درهم",
      gradient: "from-green-500 to-blue-500"
    },
    {
      icon: Phone,
      title: "إصلاح الكاميرا",
      description: "إصلاح مشاكل الكاميرا الأمامية والخلفية وتحسين جودة الصور",
      price: "من 200 درهم",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Wrench,
      title: "إصلاح الصوت",
      description: "حل مشاكل السماعات والميكروفون وجودة الصوت",
      price: "من 100 درهم",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Phone,
      title: "إصلاح الشحن",
      description: "إصلاح منافذ الشحن ومشاكل عدم الشحن أو الشحن البطيء",
      price: "من 80 درهم",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: Wrench,
      title: "إصلاح الأزرار",
      description: "إصلاح أزرار الصوت والطاقة والهوم بوتن وجميع الأزرار",
      price: "من 90 درهم",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
              خدمات الإصلاح المتخصصة
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            فريق من الفنيين المحترفين لإصلاح جميع أنواع الهواتف الذكية بأعلى معايير الجودة
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center group">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">الفحص المجاني</h3>
            <p className="text-gray-600">فحص شامل لتحديد المشكلة</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">عرض السعر</h3>
            <p className="text-gray-600">تقدير مجاني وشفاف للتكلفة</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">الإصلاح</h3>
            <p className="text-gray-600">إصلاح احترافي بقطع أصلية</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">التسليم</h3>
            <p className="text-gray-600">اختبار شامل وتسليم آمن</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repairServices.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              price={service.price}
              gradient={service.gradient}
            />
          ))}
        </div>
      </section>

      {/* Warranty Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            ضماناتنا وخدماتنا المميزة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">ضمان 6 أشهر</h3>
              <p className="text-gray-600">ضمان شامل على جميع أعمال الإصلاح</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">إصلاح سريع</h3>
              <p className="text-gray-600">معظم الإصلاحات تتم في نفس اليوم</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">قطع أصلية</h3>
              <p className="text-gray-600">نستخدم قطع غيار أصلية مضمونة فقط</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Repairs;
