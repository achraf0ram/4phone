
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Phone, ShoppingCart, Star, Search } from 'lucide-react';

const Parts = () => {
  const [activeTab, setActiveTab] = useState('buy');

  const partsForSale = [
    {
      id: 1,
      name: "شاشة iPhone 14 Pro",
      price: "750 درهم",
      originalPrice: "900 درهم",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      rating: 4.9,
      inStock: true
    },
    {
      id: 2,
      name: "بطارية Samsung Galaxy S23",
      price: "180 درهم",
      originalPrice: "220 درهم",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      rating: 4.8,
      inStock: true
    },
    {
      id: 3,
      name: "كاميرا خلفية Xiaomi Mi 11",
      price: "320 درهم",
      originalPrice: "400 درهم",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      rating: 4.7,
      inStock: false
    },
    {
      id: 4,
      name: "سماعة داخلية Huawei P40",
      price: "95 درهم",
      originalPrice: "120 درهم",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.6,
      inStock: true
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
              متجر قطع الغيار
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            أكبر مجموعة من قطع غيار الهواتف الأصلية والمضمونة مع أفضل الأسعار في السوق
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'buy'
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              شراء قطع الغيار
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'sell'
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              بيع هاتفك القديم
            </button>
          </div>
        </div>

        {/* Buy Tab Content */}
        {activeTab === 'buy' && (
          <div>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="ابحث عن قطعة الغيار..."
                  className="w-full pr-12 pl-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
              </div>
            </div>

            {/* Parts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {partsForSale.map((part) => (
                <div key={part.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={part.image} 
                      alt={part.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {!part.inStock && (
                      <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">نفدت الكمية</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      أصلي
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-green-500 group-hover:bg-clip-text transition-all duration-300">
                      {part.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.floor(part.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 mr-2">({part.rating})</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                          {part.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through mr-2">
                          {part.originalPrice}
                        </span>
                      </div>
                    </div>
                    
                    <button 
                      disabled={!part.inStock}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                        part.inStock
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {part.inStock ? 'أضف للسلة' : 'نفدت الكمية'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sell Tab Content */}
        {activeTab === 'sell' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent text-center">
                بيع هاتفك القديم بأفضل سعر
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">نوع الهاتف</label>
                    <select className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
                      <option>اختر نوع الهاتف</option>
                      <option>iPhone</option>
                      <option>Samsung</option>
                      <option>Huawei</option>
                      <option>Xiaomi</option>
                      <option>أخرى</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">الموديل</label>
                    <input 
                      type="text" 
                      placeholder="مثال: iPhone 13 Pro"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">حالة الهاتف</label>
                    <select className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
                      <option>ممتاز</option>
                      <option>جيد جداً</option>
                      <option>جيد</option>
                      <option>مقبول</option>
                      <option>يحتاج إصلاح</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">سعة التخزين</label>
                    <select className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
                      <option>64 جيجا</option>
                      <option>128 جيجا</option>
                      <option>256 جيجا</option>
                      <option>512 جيجا</option>
                      <option>1 تيرا</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      placeholder="05xxxxxxxx"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">ملاحظات إضافية</label>
                    <textarea 
                      placeholder="اذكر أي تفاصيل إضافية عن الهاتف..."
                      rows={4}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <button className="px-12 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  احصل على تقييم مجاني
                </button>
                <p className="text-gray-600 mt-4">سنتواصل معك خلال 24 ساعة لتقييم هاتفك</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Parts;
