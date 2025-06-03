
import React, { useState } from 'react';
import Header from '@/components/Header';
import ProductDetailsModal from '@/components/ProductDetailsModal';
import ChatBot from '@/components/ChatBot';
import { Phone, ShoppingCart, Star, Search, ArrowRight, Upload, X, Eye } from 'lucide-react';
import { getTranslation, Language } from '@/utils/translations';

interface PartsProps {
  language: Language;
  onLanguageChange: (lang: string) => void;
}

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  rating: number;
  inStock: boolean;
  description: string;
  features: string[];
  warranty: string;
  brand: string;
  compatibility: string[];
}

const Parts: React.FC<PartsProps> = ({ language, onLanguageChange }) => {
  const [activeTab, setActiveTab] = useState('buy');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files);
      setUploadedImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const partsForSale: Product[] = [
    {
      id: 1,
      name: language === 'ar' ? "شاشة iPhone 14 Pro OLED" : "Écran iPhone 14 Pro OLED",
      price: `750 ${getTranslation(language, 'currency')}`,
      originalPrice: `900 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      rating: 4.9,
      inStock: true,
      description: language === 'ar' ? "شاشة OLED أصلية عالية الجودة لهاتف iPhone 14 Pro مع تقنية True Tone" : "Écran OLED original haute qualité pour iPhone 14 Pro avec technologie True Tone",
      features: language === 'ar' ? ["تقنية OLED", "True Tone", "ضمان 6 أشهر", "تركيب مجاني"] : ["Technologie OLED", "True Tone", "Garantie 6 mois", "Installation gratuite"],
      warranty: language === 'ar' ? "6 أشهر" : "6 mois",
      brand: "Apple",
      compatibility: ["iPhone 14 Pro"]
    },
    {
      id: 2,
      name: language === 'ar' ? "بطارية Samsung Galaxy S23 Ultra" : "Batterie Samsung Galaxy S23 Ultra",
      price: `280 ${getTranslation(language, 'currency')}`,
      originalPrice: `350 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
      rating: 4.8,
      inStock: true,
      description: language === 'ar' ? "بطارية أصلية بسعة 5000mAh مع تقنية الشحن السريع" : "Batterie originale 5000mAh avec technologie de charge rapide",
      features: language === 'ar' ? ["5000mAh", "شحن سريع", "ضمان سنة", "أدوات التركيب مرفقة"] : ["5000mAh", "Charge rapide", "Garantie 1 an", "Outils d'installation inclus"],
      warranty: language === 'ar' ? "سنة واحدة" : "1 an",
      brand: "Samsung",
      compatibility: ["Galaxy S23 Ultra"]
    },
    {
      id: 3,
      name: language === 'ar' ? "كاميرا خلفية Xiaomi Mi 13 Pro" : "Caméra arrière Xiaomi Mi 13 Pro",
      price: `420 ${getTranslation(language, 'currency')}`,
      originalPrice: `520 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
      rating: 4.7,
      inStock: true,
      description: language === 'ar' ? "كاميرا خلفية 50MP مع عدسة Leica وتقنية التثبيت البصري" : "Caméra arrière 50MP avec objectif Leica et stabilisation optique",
      features: language === 'ar' ? ["50MP", "عدسة Leica", "تثبيت بصري", "وضع ليلي محسن"] : ["50MP", "Objectif Leica", "Stabilisation optique", "Mode nuit amélioré"],
      warranty: language === 'ar' ? "8 أشهر" : "8 mois",
      brand: "Xiaomi",
      compatibility: ["Mi 13 Pro", "Mi 13"]
    },
    {
      id: 4,
      name: language === 'ar' ? "سماعة داخلية Huawei P50 Pro" : "Haut-parleur interne Huawei P50 Pro",
      price: `150 ${getTranslation(language, 'currency')}`,
      originalPrice: `200 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      rating: 4.6,
      inStock: true,
      description: language === 'ar' ? "سماعة داخلية عالية الجودة مع تقنية الصوت المحيطي" : "Haut-parleur interne haute qualité avec technologie surround",
      features: language === 'ar' ? ["صوت عالي الجودة", "مقاوم للماء", "سهل التركيب", "ضمان 4 أشهر"] : ["Son haute qualité", "Résistant à l'eau", "Installation facile", "Garantie 4 mois"],
      warranty: language === 'ar' ? "4 أشهر" : "4 mois",
      brand: "Huawei",
      compatibility: ["P50 Pro", "P50"]
    },
    {
      id: 5,
      name: language === 'ar' ? "شاشة OnePlus 11 AMOLED" : "Écran OnePlus 11 AMOLED",
      price: `680 ${getTranslation(language, 'currency')}`,
      originalPrice: `800 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
      rating: 4.8,
      inStock: true,
      description: language === 'ar' ? "شاشة AMOLED بدقة 2K ومعدل تحديث 120Hz" : "Écran AMOLED 2K avec taux de rafraîchissement 120Hz",
      features: language === 'ar' ? ["AMOLED 2K", "120Hz", "HDR10+", "Always-On Display"] : ["AMOLED 2K", "120Hz", "HDR10+", "Always-On Display"],
      warranty: language === 'ar' ? "6 أشهر" : "6 mois",
      brand: "OnePlus",
      compatibility: ["OnePlus 11", "OnePlus 10T"]
    },
    {
      id: 6,
      name: language === 'ar' ? "محرك اهتزاز iPhone 13" : "Moteur de vibration iPhone 13",
      price: `85 ${getTranslation(language, 'currency')}`,
      originalPrice: `120 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop",
      rating: 4.5,
      inStock: false,
      description: language === 'ar' ? "محرك اهتزاز Taptic Engine أصلي للحصول على تجربة لمسية مثالية" : "Moteur Taptic Engine original pour une expérience tactile parfaite",
      features: language === 'ar' ? ["Taptic Engine", "ردود فعل دقيقة", "توفير الطاقة", "سهل التركيب"] : ["Taptic Engine", "Retour tactile précis", "Économie d'énergie", "Installation facile"],
      warranty: language === 'ar' ? "3 أشهر" : "3 mois",
      brand: "Apple",
      compatibility: ["iPhone 13", "iPhone 13 Mini"]
    },
    {
      id: 7,
      name: language === 'ar' ? "كاميرا أمامية Google Pixel 7" : "Caméra frontale Google Pixel 7",
      price: `220 ${getTranslation(language, 'currency')}`,
      originalPrice: `280 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      rating: 4.7,
      inStock: true,
      description: language === 'ar' ? "كاميرا أمامية 10.8MP مع تقنية الذكاء الاصطناعي للصور" : "Caméra frontale 10.8MP avec technologie IA pour photos",
      features: language === 'ar' ? ["10.8MP", "ذكاء اصطناعي", "تسجيل 4K", "وضع البورتريه"] : ["10.8MP", "Intelligence artificielle", "Enregistrement 4K", "Mode portrait"],
      warranty: language === 'ar' ? "6 أشهر" : "6 mois",
      brand: "Google",
      compatibility: ["Pixel 7", "Pixel 7 Pro"]
    },
    {
      id: 8,
      name: language === 'ar' ? "شاحن لاسلكي Samsung 25W" : "Chargeur sans fil Samsung 25W",
      price: `180 ${getTranslation(language, 'currency')}`,
      originalPrice: `230 ${getTranslation(language, 'currency')}`,
      image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400&h=300&fit=crop",
      rating: 4.9,
      inStock: true,
      description: language === 'ar' ? "شاحن لاسلكي سريع 25W مع تقنية التبريد المتقدمة" : "Chargeur sans fil rapide 25W avec technologie de refroidissement avancée",
      features: language === 'ar' ? ["25W سريع", "تبريد متقدم", "LED مؤشر", "حماية زائدة"] : ["25W rapide", "Refroidissement avancé", "LED indicateur", "Protection contre la surchauffe"],
      warranty: language === 'ar' ? "سنة واحدة" : "1 an",
      brand: "Samsung",
      compatibility: ["Galaxy S23", "Galaxy S22", "Galaxy S21", "Note 20"]
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
                    <button
                      onClick={() => openProductDetails(part)}
                      className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300"
                    >
                      <Eye size={16} className="text-gray-700" />
                    </button>
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
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => openProductDetails(part)}
                        className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-200"
                      >
                        <Eye size={16} className="inline mr-1" />
                        {language === 'ar' ? 'عرض' : 'Voir'}
                      </button>
                      <button 
                        disabled={!part.inStock}
                        className={`flex-1 py-2 px-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-1 ${
                          part.inStock
                            ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={16} />
                        <span className="text-sm">{part.inStock ? (language === 'ar' ? 'سلة' : 'Panier') : getTranslation(language, 'outOfStock')}</span>
                      </button>
                    </div>
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

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          language={language}
        />
      )}

      {/* Chat Bot */}
      <ChatBot language={language} />
    </div>
  );
};

export default Parts;
