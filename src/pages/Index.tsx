import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';
import { Phone, Wrench, ShoppingCart, ArrowRight } from 'lucide-react';
import { getTranslation, Language } from '@/utils/translations';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react';

// صور السلايدر الجديدة
const carouselImages = [

  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&h=400&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&h=400&fit=crop",
  },
  {
    src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop",
  },
];

// Add interface for component props
interface IndexProps {
  language: Language;
  onLanguageChange: (lang: string) => void;
}

const newsItemsAr = [
  "⚡ منصتك الشاملة لإصلاح الهواتف وبيع وشراء قطع الغيار الأصلية والهواتف المستعملة بأفضل الأسعار وأعلى جودة في الخدمة 📱💎",
  "🔥 4phone عروض حصرية في ",
  "✅ إصلاح فوري مع ضمان 6 أشهر",
  "🛠️ قطع غيار أصلية 100%",
  "🎉 هواتف مستعملة مضمونة",
  "📞 خدمة العملاء على مدار الساعة"
];

const newsItemsFr = [
  "⚡ Votre plateforme tout-en-un pour la réparation de téléphones, la vente et l'achat de pièces détachées originales et de téléphones d'occasion aux meilleurs prix et au service de la plus haute qualité 📱💎",
  "🔥 Offres exclusives chez 4phone",
  "✅ Réparations immédiates avec 6 mois de garantie",
  "🛠️ Pièces détachées 100% originales",
  "🎉 Téléphones d'occasion vérifiés",
  "📞 Service client 24h/24"
];

const Index: React.FC<IndexProps> = ({ language, onLanguageChange }) => {
  const navigate = useNavigate();
  // carousel embla for autoplay
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    skipSnaps: false,
    inViewThreshold: 0.7
  });
  const autoplayInterval = useRef<NodeJS.Timeout | null>(null);

  // اختيار الأخبار حسب اللغة
  const newsItems = language === 'ar' ? newsItemsAr : newsItemsFr;
  const newsText = newsItems.join(' • ');

  // شريط الأخبار: عكس اتجاه الحركة والكلاس
  const tickerClass =
    language === 'ar'
      ? 'news-ticker-content-ar'
      : 'news-ticker-content-fr';

  const direction = language === 'ar' ? 'rtl' : 'ltr';

  // تفعيل تغيير الصور تلقائياً
  useEffect(() => {
    if (!emblaApi) return;
    
    const autoplay = () => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    };

    // تغيير الصورة كل 3 ثواني
    autoplayInterval.current = setInterval(autoplay, 3000);

    return () => {
      if (autoplayInterval.current) {
        clearInterval(autoplayInterval.current);
      }
    };
  }, [emblaApi]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header language={language} onLanguageChange={onLanguageChange} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">

        <div className="text-center mb-10">
   
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 flex flex-col items-center justify-center gap-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-500">
               
               4phone اكتشف منصتك الأولى لإصلاح وبيع 
               <br />
               <br />
              
              <span
                className="font-black"
                style={{
                  background: 'linear-gradient(90deg,#3b82f6 0%,#10b981 50%,#2563eb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
               
              </span>
            </span>
          </h1>
        </div>
        
        {/* Carousel Section */}
        <div className="mb-8 max-w-4xl mx-auto relative">
          <div ref={emblaRef} className="overflow-hidden">
            <Carousel className="w-full"
              opts={{
                align: "start",
                loop: true,
                dragFree: false,
                containScroll: "trimSnaps",
                skipSnaps: false,
                inViewThreshold: 0.7
              }}
            >
              <CarouselContent className="gap-0">
                {carouselImages.map((image, index) => (
                  <CarouselItem key={index} className="basis-full pl-0">
                    <div className="relative">
                      <img
                        src={image.src}
                        alt=""
                        className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg bg-gray-300 transition-all duration-500 ease-in-out"
                        style={{backgroundColor:'#bbb'}}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-xl pointer-events-none"></div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
                <CarouselPrevious className="relative left-0 bg-white/80 hover:bg-white text-black border-none shadow-lg" />
                <CarouselNext className="relative right-0 bg-white/80 hover:bg-white text-black border-none shadow-lg" />
              </div>
            </Carousel>
          </div>
        </div>

        {/* Moving News Ticker */}
        <section
          className="news-ticker py-4 mb-12 rounded-xl"
          dir={direction}
        >
          <div
            className={`${tickerClass} text-white text-lg font-bold`}
            style={{ direction }}
            aria-live="polite"
          >
            {newsText}
          </div>
        </section>

        {/* Animated 4phone Description */}
        <div className="text-center mb-12">

          <div className="overflow-hidden">
            {/* تم حذف الوصف المتحرك هنا بناءً على طلبك */}
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
          <div onClick={() => navigate('/repairs')}>
            <ServiceCard
              icon={Wrench}
              title={language === 'ar' ? "خدمات الإصلاح" : "Services de réparation"}
              description={language === 'ar' ? "إصلاح احترافي لجميع أنواع الهواتف الذكية بضمان شامل وقطع غيار أصلية" : "Réparation professionnelle pour tous types de smartphones avec garantie complète et pièces d'origine"}
              price={`${language === 'ar' ? 'ابتداءً من' : 'À partir de'} 50 ${getTranslation(language, 'currency')}`}
              gradient="from-blue-500 to-purple-600"
              onClick={() => navigate('/repairs')}
            />
          </div>
          
          <div onClick={() => navigate('/parts')}>
            <ServiceCard
              icon={ShoppingCart}
              title={language === 'ar' ? "بيع قطع الغيار" : "Vente de pièces détachées"}
              description={language === 'ar' ? "قطع غيار أصلية ومضمونة لجميع أنواع الهواتف بأفضل الأسعار" : "Pièces détachées originales et garanties pour tous types de téléphones aux meilleurs prix"}
              price={`${language === 'ar' ? 'ابتداءً من' : 'À partir de'} 20 ${getTranslation(language, 'currency')}`}
              gradient="from-green-500 to-blue-500"
              onClick={() => navigate('/parts')}
            />
          </div>
          
          <div onClick={() => navigate('/parts')}>
            <ServiceCard
              icon={Phone}
              title={language === 'ar' ? "شراء الهواتف" : "Achat de téléphones"}
              description={language === 'ar' ? "نشتري هواتفك المستعملة بأفضل الأسعار مع تقييم فوري وعادل" : "Nous achetons vos téléphones d'occasion aux meilleurs prix avec une évaluation immédiate et équitable"}
              price={`${language === 'ar' ? 'حتى' : 'Jusqu\'à'} 5000 ${getTranslation(language, 'currency')}`}
              gradient="from-purple-500 to-pink-500"
              onClick={() => navigate('/parts')}
            />
          </div>

          <div onClick={() => navigate('/parts')}>
            <ServiceCard
              icon={Phone}
              title={language === 'ar' ? "الهواتف المستعملة" : "Téléphones d'occasion"}
              description={language === 'ar' ? "هواتف مستعملة مفحوصة ومضمونة بأفضل الأسعار وجودة عالية" : "Téléphones d'occasion vérifiés et garantis aux meilleurs prix et haute qualité"}
              price={`${language === 'ar' ? 'ابتداءً من' : 'À partir de'} 800 ${getTranslation(language, 'currency')}`}
              gradient="from-orange-500 to-red-500"
              onClick={() => navigate('/parts')}
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
