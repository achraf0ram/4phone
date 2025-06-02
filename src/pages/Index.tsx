
import React from 'react';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import { Phone, Wrench, ShoppingCart, Star, Users, Clock, MapPin, Mail, ArrowRight } from 'lucide-react';
import { getTranslation, Language } from '@/utils/translations';

interface IndexProps {
  language: Language;
  onLanguageChange: (lang: string) => void;
}

const Index: React.FC<IndexProps> = ({ language, onLanguageChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header language={language} onLanguageChange={onLanguageChange} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
              {getTranslation(language, 'welcomeTitle')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {getTranslation(language, 'welcomeDescription')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              <ArrowRight size={20} />
              <span>{getTranslation(language, 'bookRepair')}</span>
            </button>
            <button className="flex items-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-all duration-300">
              <ArrowRight size={20} />
              <span>{getTranslation(language, 'browseParts')}</span>
            </button>
          </div>
        </div>

        {/* Contact and Address Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            {getTranslation(language, 'contactInfo')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-lg">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{getTranslation(language, 'phoneNumber')}</h3>
                <p className="text-gray-600">+212 6 12 34 56 78</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{getTranslation(language, 'email')}</h3>
                <p className="text-gray-600">info@4phone.ma</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse md:col-span-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-lg">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{getTranslation(language, 'address')}</h3>
                <p className="text-gray-600">
                  {language === 'ar' ? 'شارع الحسن الثاني، الرباط، المغرب' : 'Avenue Hassan II, Rabat, Maroc'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center group">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">10,000+</h3>
            <p className="text-gray-600">{language === 'ar' ? 'عميل راضٍ' : 'clients satisfaits'}</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Wrench className="text-white" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">50,000+</h3>
            <p className="text-gray-600">{language === 'ar' ? 'جهاز تم إصلاحه' : 'appareils réparés'}</p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Clock className="text-white" size={32} />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">24/7</h3>
            <p className="text-gray-600">{language === 'ar' ? 'خدمة العملاء' : 'service client'}</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            icon={Wrench}
            title={language === 'ar' ? "خدمات الإصلاح" : "Services de réparation"}
            description={language === 'ar' ? "إصلاح احترافي لجميع أنواع الهواتف الذكية بضمان شامل وقطع غيار أصلية" : "Réparation professionnelle pour tous types de smartphones avec garantie complète et pièces d'origine"}
            price={`${language === 'ar' ? 'ابتداءً من' : 'À partir de'} 50 ${getTranslation(language, 'currency')}`}
            gradient="from-blue-500 to-purple-600"
          />
          
          <ServiceCard
            icon={ShoppingCart}
            title={language === 'ar' ? "بيع قطع الغيار" : "Vente de pièces détachées"}
            description={language === 'ar' ? "قطع غيار أصلية ومضمونة لجميع أنواع الهواتف بأفضل الأسعار" : "Pièces détachées originales et garanties pour tous types de téléphones aux meilleurs prix"}
            price={`${language === 'ar' ? 'ابتداءً من' : 'À partir de'} 20 ${getTranslation(language, 'currency')}`}
            gradient="from-green-500 to-blue-500"
          />
          
          <ServiceCard
            icon={Phone}
            title={language === 'ar' ? "شراء الهواتف" : "Achat de téléphones"}
            description={language === 'ar' ? "نشتري هواتفك المستعملة بأفضل الأسعار مع تقييم فوري وعادل" : "Nous achetons vos téléphones d'occasion aux meilleurs prix avec une évaluation immédiate et équitable"}
            price={`${language === 'ar' ? 'حتى' : 'Jusqu\'à'} 5000 ${getTranslation(language, 'currency')}`}
            gradient="from-purple-500 to-pink-500"
          />

          <ServiceCard
            icon={Phone}
            title={language === 'ar' ? "الهواتف المستعملة" : "Téléphones d'occasion"}
            description={language === 'ar' ? "هواتف مستعملة مفحوصة ومضمونة بأفضل الأسعار وجودة عالية" : "Téléphones d'occasion vérifiés et garantis aux meilleurs prix et haute qualité"}
            price={`${language === 'ar' ? 'ابتداءً من' : 'À partir de'} 800 ${getTranslation(language, 'currency')}`}
            gradient="from-orange-500 to-red-500"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
            {language === 'ar' ? 'لماذا نحن الأفضل؟' : 'Pourquoi sommes-nous les meilleurs ?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'جودة عالية' : 'Haute qualité'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'نستخدم قطع غيار أصلية فقط' : 'Nous n\'utilisons que des pièces d\'origine'}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'خدمة سريعة' : 'Service rapide'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'إصلاح في نفس اليوم' : 'Réparation le jour même'}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'فريق محترف' : 'Équipe professionnelle'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'فنيون مدربون ومعتمدون' : 'Techniciens formés et certifiés'}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'ضمان شامل' : 'Garantie complète'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'ضمان على جميع الإصلاحات' : 'Garantie sur toutes les réparations'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
