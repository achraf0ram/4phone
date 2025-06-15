import React, { useState } from 'react';
import Header from '@/components/Header';
import ServiceCard from '@/components/ServiceCard';
import Footer from '@/components/Footer';
import { Phone, Wrench, ShoppingCart, Star, Clock, Shield, MessageSquare, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getTranslation, Language } from '@/utils/translations';

interface RepairsProps {
  language: Language;
  onLanguageChange: (lang: string) => void;
}

const Repairs: React.FC<RepairsProps> = ({ language, onLanguageChange }) => {
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
    alert(language === 'ar' ? 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً' : 'Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt');
  };

  const handleExampleClick = (example: string) => {
    setProblemDescription(example);
  };

  const commonProblems = language === 'ar' ? [
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
  ] : [
    "Écran cassé ou fissuré",
    "Le téléphone ne se charge pas ou se charge lentement",
    "La batterie se décharge rapidement",
    "La caméra ne fonctionne pas ou les photos sont floues",
    "Problèmes de son ou de haut-parleurs",
    "Le téléphone chauffe anormalement",
    "Boutons qui ne répondent pas",
    "Problèmes Wi-Fi ou Bluetooth",
    "Le téléphone se bloque ou redémarre automatiquement",
    "Problèmes tactiles ou écran qui ne répond pas"
  ];

  const repairServices = [
    {
      icon: Phone,
      title: language === 'ar' ? "إصلاح الشاشة" : "Réparation d'écran",
      description: language === 'ar' ? "استبدال شاشات الهواتف المكسورة بقطع أصلية مع ضمان 6 أشهر" : "Remplacement d'écrans de téléphones cassés avec pièces d'origine et garantie 6 mois",
      price: `${language === 'ar' ? 'من' : 'À partir de'} 150 ${getTranslation(language, 'currency')}`,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Wrench,
      title: language === 'ar' ? "إصلاح البطارية" : "Réparation de batterie",
      description: language === 'ar' ? "استبدال بطاريات الهواتف المنتفخة أو التالفة ببطاريات أصلية" : "Remplacement de batteries de téléphones gonflées ou endommagées par des batteries d'origine",
      price: `${language === 'ar' ? 'من' : 'À partir de'} 120 ${getTranslation(language, 'currency')}`,
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
      <Header language={language} onLanguageChange={onLanguageChange} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 bg-clip-text text-transparent">
              {getTranslation(language, 'repairsTitle')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {getTranslation(language, 'repairsDescription')}
          </p>
        </div>

        {/* Customer Problem Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{getTranslation(language, 'requestRepairTitle')}</h2>
            <p className="text-gray-600">{getTranslation(language, 'requestRepairDescription')}</p>
          </div>

          <form onSubmit={handleSubmitProblem} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="customerName" className="text-gray-700 font-medium">{getTranslation(language, 'fullName')}</Label>
                <Input
                  id="customerName"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={language === 'ar' ? "أدخل اسمك الكامل" : "Entrez votre nom complet"}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="customerPhone" className="text-gray-700 font-medium">{getTranslation(language, 'phoneNumberField')}</Label>
                <Input
                  id="customerPhone"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={language === 'ar' ? "أدخل رقم هاتفك" : "Entrez votre numéro de téléphone"}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="deviceModel" className="text-gray-700 font-medium">{getTranslation(language, 'deviceModel')}</Label>
              <Input
                id="deviceModel"
                type="text"
                value={deviceModel}
                onChange={(e) => setDeviceModel(e.target.value)}
                placeholder={language === 'ar' ? "مثال: iPhone 14 Pro أو Samsung Galaxy S23" : "Exemple: iPhone 14 Pro ou Samsung Galaxy S23"}
                required
                className="mt-2"
              />
            </div>

            {/* Common Problems Examples */}
            <div>
              <Label className="text-gray-700 font-medium mb-4 block">{getTranslation(language, 'commonProblems')}</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {commonProblems.map((problem, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleExampleClick(problem)}
                    className="flex items-center space-x-2 text-right p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-colors text-sm text-gray-700 hover:text-blue-600"
                  >
                    <ArrowRight size={16} />
                    <span>{problem}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="problemDescription" className="text-gray-700 font-medium">{getTranslation(language, 'problemDescription')}</Label>
              <Textarea
                id="problemDescription"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder={language === 'ar' ? "اشرح بالتفصيل ما هي المشكلة التي تواجهها مع هاتفك... أو اختر من الأمثلة أعلاه" : "Expliquez en détail quel est le problème que vous rencontrez avec votre téléphone... ou choisissez parmi les exemples ci-dessus"}
                required
                className="mt-2 min-h-[120px]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg flex items-center justify-center space-x-2"
            >
              <ArrowRight size={20} />
              <span>{getTranslation(language, 'submitRepair')}</span>
            </Button>
          </form>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center group">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {language === 'ar' ? 'الفحص المجاني' : 'Diagnostic gratuit'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' ? 'فحص شامل لتحديد المشكلة' : 'Diagnostic complet pour identifier le problème'}
            </p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {language === 'ar' ? 'عرض السعر' : 'Devis'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' ? 'تقدير مجاني وشفاف للتكلفة' : 'Estimation gratuite et transparente du coût'}
            </p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {language === 'ar' ? 'الإصلاح' : 'Réparation'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' ? 'إصلاح احترافي بقطع أصلية' : 'Réparation professionnelle avec pièces d\'origine'}
            </p>
          </div>
          
          <div className="text-center group">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-xl">4</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {language === 'ar' ? 'التسليم' : 'Livraison'}
            </h3>
            <p className="text-gray-600">
              {language === 'ar' ? 'اختبار شامل وتسليم آمن' : 'Test complet et livraison sécurisée'}
            </p>
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
            {language === 'ar' ? 'ضماناتنا وخدماتنا المميزة' : 'Nos garanties et services de qualité'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'ضمان 6 أشهر' : 'Garantie 6 mois'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'ضمان شامل على جميع أعمال الإصلاح' : 'Garantie complète sur tous les travaux de réparation'}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'إصلاح سريع' : 'Réparation rapide'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'معظم الإصلاحات تتم في نفس اليوم' : 'La plupart des réparations sont effectuées le jour même'}
              </p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'ar' ? 'قطع أصلية' : 'Pièces d\'origine'}
              </h3>
              <p className="text-gray-600">
                {language === 'ar' ? 'نستخدم قطع غيار أصلية مضمونة فقط' : 'Nous n\'utilisons que des pièces détachées d\'origine garanties'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Repairs;
