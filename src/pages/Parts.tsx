import React, { useState } from 'react';
import Header from '@/components/Header';
import { Phone, ShoppingCart, Star, Search, ArrowRight, Upload, X } from 'lucide-react';
import { getTranslation, Language } from '@/utils/translations';

interface PartsProps {
  language: Language;
  onLanguageChange: (lang: string) => void;
}

const Parts: React.FC<PartsProps> = ({ language, onLanguageChange }) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setUploadedImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const partsForSale = [
    {
      id: 1,
      name: language === 'ar' ? "شاشة iPhone 14 Pro" : "Écran iPhone 14 Pro",
      price: `750 ${getTranslation(language, 'currency')}`,
      originalPrice: `900 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      rating: 4.9,
      inStock: true
    },
    {
      id: 2,
      name: language === 'ar' ? "بطارية Samsung Galaxy S23" : "Batterie Samsung Galaxy S23",
      price: `180 ${getTranslation(language, 'currency')}`,
      originalPrice: `220 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      rating: 4.8,
      inStock: true
    },
    {
      id: 3,
      name: language === 'ar' ? "كاميرا خلفية Xiaomi Mi 11" : "Caméra arrière Xiaomi Mi 11",
      price: `320 ${getTranslation(language, 'currency')}`,
      originalPrice: `400 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      rating: 4.7,
      inStock: false
    },
    {
      id: 4,
      name: language === 'ar' ? "سماعة داخلية Huawei P40" : "Sonore interne Huawei P40",
      price: `95 ${getTranslation(language, 'currency')}`,
      originalPrice: `120 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.6,
      inStock: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header language={language} onLanguageChange={onLanguageChange} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
              {getTranslation(language, 'partsTitle')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {getTranslation(language, 'partsDescription')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('buy')}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'buy'
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <ArrowRight size={18} />
              <span>{getTranslation(language, 'buyParts')}</span>
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'sell'
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <ArrowRight size={18} />
              <span>{getTranslation(language, 'sellPhone')}</span>
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
                  placeholder={language === 'ar' ? "ابحث عن قطعة الغيار..." : "Rechercher une pièce détachée..."}
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
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                          {getTranslation(language, 'outOfStock')}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {getTranslation(language, 'original')}
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
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                        part.inStock
                          ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ArrowRight size={18} />
                      <span>{part.inStock ? getTranslation(language, 'addToCart') : getTranslation(language, 'outOfStock')}</span>
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
                {language === 'ar' ? 'بيع هاتفك القديم بأفضل سعر' : 'Vendez votre ancien téléphone au meilleur prix'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'نوع الهاتف' : 'Type de téléphone'}
                    </label>
                    <select className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
                      <option>{language === 'ar' ? 'اختر نوع الهاتف' : 'Choisir le type de téléphone'}</option>
                      <option>iPhone</option>
                      <option>Samsung</option>
                      <option>Huawei</option>
                      <option>Xiaomi</option>
                      <option>{language === 'ar' ? 'أخرى' : 'Autre'}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'الموديل' : 'Modèle'}
                    </label>
                    <input 
                      type="text" 
                      placeholder="مثال: iPhone 13 Pro"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'حالة الهاتف' : 'État du téléphone'}
                    </label>
                    <select className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
                      <option>{language === 'ar' ? 'ممتاز' : 'Excellent'}</option>
                      <option>{language === 'ar' ? 'جيد جداً' : 'Très bien'}</option>
                      <option>{language === 'ar' ? 'جيد' : 'Bien'}</option>
                      <option>{language === 'ar' ? 'مقبول' : 'Acceptable'}</option>
                      <option>{language === 'ar' ? 'يحتاج إصلاح' : 'Nécessite une réparation'}</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'سعة التخزين' : 'Capacité de stockage'}
                    </label>
                    <select className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
                      <option>{language === 'ar' ? '64 جيجا' : '64 Go'}</option>
                      <option>{language === 'ar' ? '128 جيجا' : '128 Go'}</option>
                      <option>{language === 'ar' ? '256 جيجا' : '256 Go'}</option>
                      <option>{language === 'ar' ? '512 جيجا' : '512 Go'}</option>
                      <option>{language === 'ar' ? '1 تيرا' : '1 To'}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'رقم الهاتف' : 'Numéro de téléphone'}
                    </label>
                    <input 
                      type="tel" 
                      placeholder="05xxxxxxxx"
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'ملاحظات إضافية' : 'Notes supplémentaires'}
                    </label>
                    <textarea 
                      placeholder="اذكر أي تفاصيل إضافية عن الهاتف..."
                      rows={4}
                      className="w-full p-4 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="mt-8">
                <label className="block text-gray-700 font-semibold mb-4">
                  {language === 'ar' ? 'صور الهاتف (اختياري - حتى 5 صور)' : 'Photos du téléphone (optionnel - jusqu\'à 5 photos)'}
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="phone-images"
                    disabled={uploadedImages.length >= 5}
                  />
                  <label 
                    htmlFor="phone-images" 
                    className="cursor-pointer flex flex-col items-center space-y-4"
                  >
                    <Upload size={48} className="text-gray-400" />
                    <div>
                      <p className="text-lg font-semibold text-gray-600">
                        {language === 'ar' ? 'اضغط لرفع الصور' : 'Cliquez pour télécharger les photos'}
                      </p>
                      <p className="text-sm text-gray-400">
                        {language === 'ar' ? 'PNG, JPG, JPEG حتى 10MB لكل صورة' : 'PNG, JPG, JPEG jusqu\'à 10MB par photo'}
                      </p>
                    </div>
                  </label>
                </div>

                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">
                      {language === 'ar' ? 'الصور المرفوعة:' : 'Photos téléchargées:'}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Phone ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 text-center">
                <button className="flex items-center space-x-2 px-12 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 mx-auto">
                  <ArrowRight size={20} />
                  <span>{language === 'ar' ? 'احصل على تقييم مجاني' : 'Obtenez une évaluation gratuite'}</span>
                </button>
                <p className="text-gray-600 mt-4">
                  {language === 'ar' ? 'سنتواصل معك خلال 24 ساعة لتقييم هاتفك' : 'Nous vous contacterons dans les 24 heures pour évaluer votre téléphone'}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Parts;
