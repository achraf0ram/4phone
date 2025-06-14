
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import { Phone, Wrench, ShoppingCart, Star, Users, Clock, MapPin, Mail, ArrowRight } from 'lucide-react';
import { getTranslation, Language } from '@/utils/translations';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface IndexProps {
  language: Language;
  onLanguageChange: (lang: string) => void;
}

const Index: React.FC<IndexProps> = ({ language, onLanguageChange }) => {
  const navigate = useNavigate();

  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1609613838781-ebe38f5d5ac5?w=800&h=400&fit=crop",
      alt: language === 'ar' ? "شخص يصلح هاتف" : "Personne réparant un téléphone"
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
      alt: language === 'ar' ? "ذاكرة الهاتف وقطع الغيار" : "Mémoire de téléphone et pièces détachées"
    },
    {
      src: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=400&fit=crop",
      alt: language === 'ar' ? "هاتف مكسور" : "Téléphone cassé"
    },
    {
      src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop",
      alt: language === 'ar' ? "قطع غيار الهاتف" : "Pièces détachées de téléphone"
    }
  ];

  const handleRepairService = () => {
    navigate('/repairs');
  };

  const handlePartsService = () => {
    navigate('/parts');
  };

  const handlePhonePurchase = () => {
    navigate('/parts');
  };

  const handleUsedPhones = () => {
    navigate('/parts');
  };

  const handleChatBot = () => {
    console.log('ChatBot button clicked - handled by ChatBot component');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header language={language} onLanguageChange={onLanguageChange} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
              مرحباً بك في 4phone
            </span>
          </h1>
        </div>

        {/* Carousel Section */}
        <div className="mb-8 max-w-4xl mx-auto">
          <Carousel 
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {carouselImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        {/* Moving News Ticker - Moved here after carousel */}
        <section className="news-ticker py-4 mb-12 rounded-xl">
          <div className="news-ticker-content text-white text-lg font-bold">
            🔥 عروض حصرية في 4phone • إصلاح فوري مع ضمان 6 أشهر • قطع غيار أصلية 100% • 
            هواتف مستعملة مفحوصة ومضمونة • خدمة العملاء المتميزة 24/7 • 
            فريق تقني محترف ومعتمد • أسعار منافسة لا تقبل المقارنة • 
            تقييم مجاني لهاتفك المستعمل • توصيل مجاني داخل المدينة • 
            ✨ 4phone - شريكك الموثوق في عالم الهواتف ✨
          </div>
        </section>

        {/* Animated 4phone Description */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            📱 4phone 🔧
          </h2>
          <div className="overflow-hidden">
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed animate-bounce">
              ⚡ منصتك الشاملة لإصلاح الهواتف وبيع وشراء قطع الغيار الأصلية والهواتف المستعملة بأفضل الأسعار وأعلى جودة في الخدمة 📱💎
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button 
            onClick={() => navigate('/repairs')}
            className="flex items-center space-x-2 space-x-reverse px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <ArrowRight size={20} />
            <span>{getTranslation(language, 'bookRepair')}</span>
          </button>
          <button 
            onClick={() => navigate('/parts')}
            className="flex items-center space-x-2 space-x-reverse px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
          >
            <ArrowRight size={20} />
            <span>{getTranslation(language, 'browseParts')}</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div onClick={handleRepairService}>
            <ServiceCard
              icon={Wrench}
              title={language === 'ar' ? "خدمات الإصلاح" : "Services de réparation"}
              description={language === 'ar' ? "إصلاح احترافي لجميع أنواع الهواتف الذكية بضمان شامل وقطع غيار أصلية" : "Réparation professionnelle pour tous types de smartphones avec garantie complète et pièces d'origine"}
              price={`${language === 'ar' ? 'ابتداءً من' : 'À partir de'} 50 ${getTranslation(language, 'currency')}`}
              gradient="from-blue-500 to-purple-600"
              onClick={handleRepairService}
            />
          </div>
          
          <div onClick={handlePartsService}>
            <ServiceCard
              icon={ShoppingCart}
              title={language === 'ar' ? "بيع قطع الغيار" : "Vente de pièces détachées"}
              description={language === 'ar' ? "قطع غيار أصلية ومضمونة لجميع أنواع الهواتف بأفضل الأسعار" : "Pièces détachées originales et garanties pour tous types de téléphones aux meilleurs prix"}
              price={`${language === 'ar' ? 'ابتداءً من' : 'À partir de'} 20 ${getTranslation(language, 'currency')}`}
              gradient="from-green-500 to-blue-500"
              onClick={handlePartsService}
            />
          </div>
          
          <div onClick={handlePhonePurchase}>
            <ServiceCard
              icon={Phone}
              title={language === 'ar' ? "شراء الهواتف" : "Achat de téléphones"}
              description={language === 'ar' ? "نشتري هواتفك المستعملة بأفضل الأسعار مع تقييم فوري وعادل" : "Nous achetons vos téléphones d'occasion aux meilleurs prix avec une évaluation immédiate et équitable"}
              price={`${language === 'ar' ? 'حتى' : 'Jusqu\'à'} 5000 ${getTranslation(language, 'currency')}`}
              gradient="from-purple-500 to-pink-500"
              onClick={handlePhonePurchase}
            />
          </div>

          <div onClick={handleUsedPhones}>
            <ServiceCard
              icon={Phone}
              title={language === 'ar' ? "الهواتف المستعملة" : "Téléphones d'occasion"}
              description={language === 'ar' ? "هواتف مستعملة مفحوصة ومضمونة بأفضل الأسعار وجودة عالية" : "Téléphones d'occasion vérifiés et garantis aux meilleurs prix et haute qualité"}
              price={`${language === 'ar' ? 'ابتداءً من' : 'À partir de'} 800 ${getTranslation(language, 'currency')}`}
              gradient="from-orange-500 to-red-500"
              onClick={handleUsedPhones}
            />
          </div>
        </div>
      </section>

      {/* Chat Bot */}
      <ChatBot language={language} />

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Index;
