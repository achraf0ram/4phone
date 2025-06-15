
import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { getTranslation, Language } from '@/utils/translations';

interface ChatBotProps {
  language: Language;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot: React.FC<ChatBotProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: language === 'ar' ? 'مرحباً بك في 4phone! 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟ 📱✨' : 'Bienvenue chez 4phone! 👋 Je suis votre assistant intelligent. Comment puis-je vous aider aujourd\'hui? 📱✨',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response with more realistic delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText, language);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1000); // Random delay between 1-2 seconds
  };

  const getBotResponse = (userInput: string, lang: Language): string => {
    const input = userInput.toLowerCase();
    
    // Greetings and basic interactions
    if (input.includes('مرحبا') || input.includes('السلام') || input.includes('أهلا') || 
        input.includes('bonjour') || input.includes('salut') || input.includes('hello')) {
      return lang === 'ar' 
        ? 'أهلاً وسهلاً بك! 😊 أنا هنا لمساعدتك في كل ما يتعلق بخدمات 4phone. اسأل عن أي شيء!'
        : 'Bonjour et bienvenue! 😊 Je suis là pour vous aider avec tous les services 4phone. N\'hésitez pas à poser vos questions!';
    }

    // Thanks
    if (input.includes('شكر') || input.includes('merci') || input.includes('thank')) {
      return lang === 'ar'
        ? 'العفو! 😊 أي خدمة أخرى يمكنني مساعدتك فيها؟'
        : 'De rien! 😊 Puis-je vous aider avec autre chose?';
    }

    // Pricing inquiries
    if (input.includes('سعر') || input.includes('تكلفة') || input.includes('فلوس') || 
        input.includes('prix') || input.includes('coût') || input.includes('tarif')) {
      return lang === 'ar' 
        ? '💰 أسعارنا تنافسية جداً:\n📱 إصلاح الشاشات: 80-300 درهم\n🔋 بطاريات: 50-150 درهم\n🔊 سماعات: 40-120 درهم\n📞 اتصل بنا للحصول على عرض سعر دقيق لهاتفك!'
        : '💰 Nos prix sont très compétitifs:\n📱 Réparation écrans: 80-300 dirhams\n🔋 Batteries: 50-150 dirhams\n🔊 Haut-parleurs: 40-120 dirhams\n📞 Appelez-nous pour un devis précis!';
    }
    
    // Warranty inquiries
    if (input.includes('ضمان') || input.includes('كفالة') || input.includes('garantie')) {
      return lang === 'ar'
        ? '🛡️ نوفر ضمان شامل وموثوق:\n📱 الشاشات: 6 أشهر ضمان كامل\n🔋 البطاريات: سنة كاملة\n🔊 السماعات: 4 أشهر\n✅ نستبدل القطعة مجاناً في حالة العيب!'
        : '🛡️ Nous offrons une garantie complète:\n📱 Écrans: 6 mois de garantie\n🔋 Batteries: 1 an complet\n🔊 Haut-parleurs: 4 mois\n✅ Remplacement gratuit en cas de défaut!';
    }
    
    // Installation services
    if (input.includes('تركيب') || input.includes('تصليح') || input.includes('إصلاح') ||
        input.includes('installation') || input.includes('réparation')) {
      return lang === 'ar'
        ? '🔧 خدمة التركيب المجانية مع فنيين محترفين:\n⚡ تركيب فوري في المتجر\n🏠 خدمة منزلية متاحة\n👨‍🔧 فريق معتمد ومدرب\n📱 فحص شامل بعد التركيب مجاناً!'
        : '🔧 Service d\'installation gratuit avec techniciens pro:\n⚡ Installation immédiate en magasin\n🏠 Service à domicile disponible\n👨‍🔧 Équipe certifiée et formée\n📱 Test complet après installation!';
    }
    
    // Delivery services
    if (input.includes('توصيل') || input.includes('شحن') || input.includes('ديليفري') ||
        input.includes('livraison') || input.includes('delivery')) {
      return lang === 'ar'
        ? '🚚 خدمة التوصيل السريعة:\n🏙️ مجاني داخل المدينة خلال 24 ساعة\n🌍 للمدن الأخرى: 30 درهم فقط\n⚡ توصيل سريع في نفس اليوم متاح\n📦 تغليف آمن ومحكم'
        : '🚚 Service de livraison rapide:\n🏙️ Gratuit en ville sous 24h\n🌍 Autres villes: seulement 30 dirhams\n⚡ Livraison express le jour même\n📦 Emballage sécurisé';
    }

    // Phone models and compatibility
    if (input.includes('هاتف') || input.includes('آيفون') || input.includes('سامسونغ') || input.includes('شاومي') ||
        input.includes('téléphone') || input.includes('iphone') || input.includes('samsung') || input.includes('xiaomi')) {
      return lang === 'ar'
        ? '📱 نتعامل مع جميع الماركات:\n🍎 iPhone (جميع الموديلات)\n📱 Samsung, Huawei, Xiaomi\n🔧 OnePlus, Oppo, Vivo\n❓ لست متأكد من نوع هاتفك؟ أرسل لنا صورة وسنساعدك!'
        : '📱 Nous travaillons avec toutes les marques:\n🍎 iPhone (tous modèles)\n📱 Samsung, Huawei, Xiaomi\n🔧 OnePlus, Oppo, Vivo\n❓ Pas sûr de votre modèle? Envoyez une photo!';
    }

    // Store hours and location
    if (input.includes('وقت') || input.includes('مفتوح') || input.includes('عنوان') || input.includes('موقع') ||
        input.includes('horaire') || input.includes('ouvert') || input.includes('adresse') || input.includes('localisation')) {
      return lang === 'ar'
        ? '🕒 أوقات العمل:\n📅 السبت - الخميس: 9:00 - 21:00\n📅 الجمعة: 14:00 - 21:00\n📍 العنوان: شارع الرئيسي، المدينة\n🗺️ يمكنك العثور علينا بسهولة!'
        : '🕒 Horaires d\'ouverture:\n📅 Samedi - Jeudi: 9h00 - 21h00\n📅 Vendredi: 14h00 - 21h00\n📍 Adresse: Rue Principale, Ville\n🗺️ Facile à trouver!';
    }

    // Used phones
    if (input.includes('مستعمل') || input.includes('قديم') || input.includes('بيع') ||
        input.includes('occasion') || input.includes('usagé') || input.includes('vendre')) {
      return lang === 'ar'
        ? '📱 خدمات الهواتف المستعملة:\n💰 نشتري هاتفك بأفضل سعر\n🔍 تقييم مجاني وفوري\n✅ هواتف مستعملة مفحوصة ومضمونة\n📞 أحضر هاتفك للتقييم!'
        : '📱 Services téléphones d\'occasion:\n💰 Nous achetons votre téléphone au meilleur prix\n🔍 Évaluation gratuite et immédiate\n✅ Téléphones d\'occasion vérifiés\n📞 Apportez votre téléphone!';
    }

    // Technical problems
    if (input.includes('مشكلة') || input.includes('عطل') || input.includes('لا يعمل') ||
        input.includes('problème') || input.includes('panne') || input.includes('marche pas')) {
      return lang === 'ar'
        ? '🔧 حل المشاكل التقنية:\n🔍 تشخيص مجاني للمشكلة\n⚡ إصلاح سريع في معظم الحالات\n💡 استشارة تقنية مجانية\n📞 اتصل بنا أو احضر هاتفك للفحص!'
        : '🔧 Résolution problèmes techniques:\n🔍 Diagnostic gratuit du problème\n⚡ Réparation rapide dans la plupart des cas\n💡 Consultation technique gratuite\n📞 Appelez ou apportez votre téléphone!';
    }

    // Contact and communication
    if (input.includes('اتصال') || input.includes('تواصل') || input.includes('رقم') ||
        input.includes('contact') || input.includes('appeler') || input.includes('numéro')) {
      return lang === 'ar'
        ? '📞 تواصل معنا بسهولة:\n📱 الهاتف: 212612345678\n💬 واتساب متاح 24/7\n📧 البريد الإلكتروني متاح\n🏪 زيارة المتجر مرحب بها دائماً!'
        : '📞 Contactez-nous facilement:\n📱 Téléphone: 212612345678\n💬 WhatsApp disponible 24/7\n📧 Email disponible\n🏪 Visites en magasin toujours bienvenues!';
    }

    // Default responses with helpful suggestions
    const defaultResponses = {
      ar: [
        '🤔 لم أفهم سؤالك تماماً. يمكنك السؤال عن:\n💰 الأسعار والتكاليف\n🔧 خدمات الإصلاح\n🛡️ الضمان والكفالة\n🚚 التوصيل والشحن\n📱 أنواع الهواتف المدعومة',
        '💡 أقترح عليك الاتصال بنا على 212612345678 للحصول على مساعدة مفصلة، أو يمكنك زيارة متجرنا مباشرة!',
        '🎯 هل تريد معرفة المزيد عن خدماتنا؟ اسأل عن الإصلاح، قطع الغيار، الأسعار، أو أي خدمة أخرى!'
      ],
      fr: [
        '🤔 Je n\'ai pas bien compris votre question. Vous pouvez demander sur:\n💰 Les prix et coûts\n🔧 Services de réparation\n🛡️ Garantie\n🚚 Livraison\n📱 Types de téléphones supportés',
        '💡 Je suggère de nous appeler au 212612345678 pour une aide détaillée, ou visitez directement notre magasin!',
        '🎯 Voulez-vous en savoir plus sur nos services? Demandez sur la réparation, pièces détachées, prix, ou tout autre service!'
      ]
    };

    const responses = defaultResponses[lang];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <>
      {/* Chat Button - Enhanced with pulse animation */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-pulse"
        >
          <MessageCircle size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* Chat Window - Enhanced design */}
      {isOpen && (
        <div className="fixed inset-4 md:bottom-6 md:right-6 md:inset-auto md:w-96 md:h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Header - Enhanced with gradient */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="bg-white bg-opacity-20 p-1.5 rounded-full">
                <Bot size={18} />
              </div>
              <div>
                <span className="font-semibold text-sm md:text-base">
                  {language === 'ar' ? 'مساعد 4phone الذكي' : 'Assistant 4phone Intelligent'}
                </span>
                <div className="text-xs opacity-90">
                  {language === 'ar' ? 'متصل الآن' : 'En ligne maintenant'}
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-white hover:bg-opacity-20 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages - Enhanced scrolling */}
          <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}
              >
                <div className={`flex items-start space-x-2 space-x-reverse max-w-[85%] md:max-w-[75%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`p-1.5 md:p-2 rounded-full ${message.isBot ? 'bg-blue-100' : 'bg-green-100'} shadow-sm`}>
                    {message.isBot ? (
                      <Bot size={12} className="md:w-4 md:h-4 text-blue-600" />
                    ) : (
                      <User size={12} className="md:w-4 md:h-4 text-green-600" />
                    )}
                  </div>
                  <div
                    className={`p-3 md:p-3 rounded-2xl shadow-sm ${
                      message.isBot
                        ? 'bg-white text-gray-800 border border-gray-100'
                        : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                    }`}
                  >
                    <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    <div className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                      {message.timestamp.toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="p-1.5 md:p-2 rounded-full bg-blue-100 shadow-sm">
                    <Bot size={12} className="md:w-4 md:h-4 text-blue-600" />
                  </div>
                  <div className="bg-white p-3 md:p-3 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input - Enhanced design */}
          <div className="p-3 md:p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-2 space-x-reverse">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Tapez votre message ici...'}
                className="flex-1 p-3 text-sm border border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white shadow-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transform hover:scale-105"
              >
                <Send size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
