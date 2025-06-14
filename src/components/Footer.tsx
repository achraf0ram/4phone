
import React from 'react';
import { Phone, Mail, MapPin, Clock, Star, Users, Shield, Award, Facebook, Twitter, Instagram } from 'lucide-react';
import { Language } from '@/utils/translations';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-400">
              {language === 'ar' ? 'معلومات التواصل' : 'Informations de contact'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="text-blue-400" size={20} />
                <span>+212 6 12 34 56 78</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Mail className="text-blue-400" size={20} />
                <span>info@4phone.ma</span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <MapPin className="text-blue-400" size={20} />
                <span>
                  {language === 'ar' ? 'شارع الحسن الثاني، الرباط، المغرب' : 'Avenue Hassan II, Rabat, Maroc'}
                </span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Clock className="text-blue-400" size={20} />
                <span>
                  {language === 'ar' ? 'الإثنين - السبت: 9:00 - 19:00' : 'Lun - Sam: 9:00 - 19:00'}
                </span>
              </div>
            </div>
          </div>

          {/* Why We're the Best */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-green-400">
              {language === 'ar' ? 'لماذا نحن الأفضل؟' : 'Pourquoi nous ?'}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Star className="text-green-400" size={20} />
                <span>
                  {language === 'ar' ? 'جودة عالية وقطع غيار أصلية' : 'Haute qualité et pièces d\'origine'}
                </span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Clock className="text-green-400" size={20} />
                <span>
                  {language === 'ar' ? 'خدمة سريعة في نفس اليوم' : 'Service rapide le jour même'}
                </span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Users className="text-green-400" size={20} />
                <span>
                  {language === 'ar' ? 'فريق محترف ومعتمد' : 'Équipe professionnelle certifiée'}
                </span>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Shield className="text-green-400" size={20} />
                <span>
                  {language === 'ar' ? 'ضمان شامل 6 أشهر' : 'Garantie complète 6 mois'}
                </span>
              </div>
            </div>
          </div>

          {/* Platform Policies */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-purple-400">
              {language === 'ar' ? 'سياسة المنصة' : 'Politique de la plateforme'}
            </h3>
            <div className="space-y-3">
              <a href="#" className="block hover:text-purple-400 transition-colors">
                {language === 'ar' ? 'شروط الاستخدام' : 'Conditions d\'utilisation'}
              </a>
              <a href="#" className="block hover:text-purple-400 transition-colors">
                {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
              </a>
              <a href="#" className="block hover:text-purple-400 transition-colors">
                {language === 'ar' ? 'سياسة الإرجاع' : 'Politique de retour'}
              </a>
              <a href="#" className="block hover:text-purple-400 transition-colors">
                {language === 'ar' ? 'طرق الدفع' : 'Méthodes de paiement'}
              </a>
              <a href="#" className="block hover:text-purple-400 transition-colors">
                {language === 'ar' ? 'الضمانات' : 'Garanties'}
              </a>
            </div>
          </div>

          {/* Services & Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-orange-400">
              {language === 'ar' ? 'خدماتنا' : 'Nos services'}
            </h3>
            <div className="space-y-3 mb-6">
              <a href="/repairs" className="block hover:text-orange-400 transition-colors">
                {language === 'ar' ? 'إصلاح الهواتف' : 'Réparation de téléphones'}
              </a>
              <a href="/parts" className="block hover:text-orange-400 transition-colors">
                {language === 'ar' ? 'قطع الغيار' : 'Pièces détachées'}
              </a>
              <a href="/parts" className="block hover:text-orange-400 transition-colors">
                {language === 'ar' ? 'شراء الهواتف' : 'Achat de téléphones'}
              </a>
              <a href="/parts" className="block hover:text-orange-400 transition-colors">
                {language === 'ar' ? 'هواتف مستعملة' : 'Téléphones d\'occasion'}
              </a>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="font-semibold mb-3">
                {language === 'ar' ? 'تابعنا على' : 'Suivez-nous'}
              </h4>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2 rounded-lg">
                <Phone className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                4phone
              </span>
            </div>
            
            <div className="text-center text-gray-400">
              <p>
                {language === 'ar' 
                  ? '© 2024 4phone. جميع الحقوق محفوظة. منصتك الموثوقة لإصلاح الهواتف' 
                  : '© 2024 4phone. Tous droits réservés. Votre plateforme de confiance pour la réparation de téléphones'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-400">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Award className="text-yellow-400" size={16} />
                <span>
                  {language === 'ar' ? 'معتمدون' : 'Certifiés'}
                </span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Shield className="text-green-400" size={16} />
                <span>
                  {language === 'ar' ? 'مضمون' : 'Garanti'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
