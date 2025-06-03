
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
      text: language === 'ar' ? 'مرحباً! كيف يمكنني مساعدتك اليوم؟' : 'Bonjour! Comment puis-je vous aider aujourd\'hui?',
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

    // Simulate bot response
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
    }, 1500);
  };

  const getBotResponse = (userInput: string, lang: Language): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('سعر') || input.includes('prix')) {
      return lang === 'ar' 
        ? 'يمكنك مشاهدة أسعار جميع قطع الغيار في الكتالوج أعلاه. الأسعار تشمل الضمان والتركيب المجاني!'
        : 'Vous pouvez voir les prix de toutes les pièces détachées dans le catalogue ci-dessus. Les prix incluent la garantie et l\'installation gratuite!';
    }
    
    if (input.includes('ضمان') || input.includes('garantie')) {
      return lang === 'ar'
        ? 'نوفر ضمان شامل على جميع قطع الغيار: 6 أشهر للشاشات، سنة للبطاريات، 4 أشهر للسماعات.'
        : 'Nous offrons une garantie complète sur toutes les pièces : 6 mois pour les écrans, 1 an pour les batteries, 4 mois pour les haut-parleurs.';
    }
    
    if (input.includes('تركيب') || input.includes('installation')) {
      return lang === 'ar'
        ? 'نعم! نوفر خدمة التركيب المجانية لجميع قطع الغيار مع فنيين محترفين ومعتمدين.'
        : 'Oui! Nous offrons un service d\'installation gratuit pour toutes les pièces avec des techniciens professionnels et certifiés.';
    }
    
    if (input.includes('توصيل') || input.includes('livraison')) {
      return lang === 'ar'
        ? 'التوصيل مجاني داخل المدينة خلال 24 ساعة. للمدن الأخرى، رسوم رمزية 30 درهم.'
        : 'Livraison gratuite en ville sous 24h. Pour les autres villes, frais symboliques de 30 dirhams.';
    }

    if (input.includes('هاتف') || input.includes('téléphone') || input.includes('phone')) {
      return lang === 'ar'
        ? 'نتعامل مع جميع أنواع الهواتف: iPhone, Samsung, Huawei, Xiaomi, OnePlus وغيرها. ما نوع هاتفك؟'
        : 'Nous travaillons avec tous types de téléphones : iPhone, Samsung, Huawei, Xiaomi, OnePlus et autres. Quel est votre type de téléphone?';
    }

    return lang === 'ar'
      ? 'شكراً لسؤالك! يمكنك الاتصال بنا على 212612345678 أو زيارة متجرنا للحصول على مساعدة مفصلة.'
      : 'Merci pour votre question! Vous pouvez nous appeler au 212612345678 ou visiter notre magasin pour une aide détaillée.';
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Bot size={20} />
              <span className="font-semibold">
                {language === 'ar' ? 'مساعد 4phone' : 'Assistant 4phone'}
              </span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-2 space-x-reverse max-w-[70%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`p-2 rounded-full ${message.isBot ? 'bg-blue-100' : 'bg-green-100'}`}>
                    {message.isBot ? (
                      <Bot size={16} className="text-blue-600" />
                    ) : (
                      <User size={16} className="text-green-600" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 space-x-reverse">
                  <div className="p-2 rounded-full bg-blue-100">
                    <Bot size={16} className="text-blue-600" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2 space-x-reverse">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={language === 'ar' ? 'اكتب رسالتك...' : 'Tapez votre message...'}
                className="flex-1 p-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="p-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
