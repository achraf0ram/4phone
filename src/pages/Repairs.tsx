
import React, { useState } from 'react';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import { Phone, Wrench, ShoppingCart, Star, Clock, Shield, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Repairs = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const handleSubmitProblem = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('تم إرسال الطلب:', { customerName, customerPhone, deviceModel, problemDescription });
    // Reset form
    setCustomerName('');
    setCustomerPhone('');
    setDeviceModel('');
    setProblemDescription('');
    alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً');
  };

  const handleExampleClick = (example: string) => {
    setProblemDescription(example);
  };

  const commonProblems = [
    "الشاشة مكسورة أو متشققة",
    "الهاتف لا يشحن أو يشحن ببطء",
    "البطارية تفرغ بسرعة",
    "الكاميرا لا تعمل أو الصور ضبابية",
    "مشاكل في الصوت أو السماعات",
    "الهاتف يسخن بشكل غير طبيعي",
    "أزرار لا تستجيب",
    "مشاكل في الواي فاي أو البلوتوث",
    "الهاتف يعلق أو يعيد التشغيل تلقائياً",
    "مشاكل في اللمس أو الشاشة لا تستجيب"
  ];

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

        {/* Customer Problem Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">اطلب إصلاح هاتفك الآن</h2>
            <p className="text-gray-600">صف لنا مشكلة هاتفك وسنتواصل معك لتقديم أفضل حل</p>
          </div>

          <form onSubmit={handleSubmitProblem} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="customerName" className="text-gray-700 font-medium">الاسم الكامل</Label>
                <Input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="customerPhone" className="text-gray-700 font-medium">رقم الهاتف</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="أدخل رقم هاتفك"
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="deviceModel" className="text-gray-700 font-medium">نوع وموديل الهاتف</Label>
              <Input
                id="deviceModel"
                type="text"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder="مثال: iPhone 14 Pro أو Samsung Galaxy S23"
                required
                className="mt-2"
              />
            </div>

            {/* Common Problems Examples */}
            <div>
              <Label className="text-gray-700 font-medium mb-4 block">أمثلة للمشاكل الشائعة</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {commonProblems.map((problem, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleExampleClick(problem)}
                    className="text-right p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors text-sm text-gray-700 hover:text-blue-600"
                  >
                    {problem}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="problemDescription" className="text-gray-700 font-medium">وصف المشكلة</Label>
              <Textarea
                id="problemDescription"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="اشرح بالتفصيل ما هي المشكلة التي تواجهها مع هاتفك... أو اختر من الأمثلة أعلاه"
                required
                className="mt-2 min-h-[120px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg"
            >
              طلب إصلاح هاتفك
            </Button>
          </form>
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
