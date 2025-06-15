
import React, { useState, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { getTranslation, Language } from '@/utils/translations';
import { toast } from "@/components/ui/use-toast";

interface ChatBotProps {
  language: Language;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  imageUrl?: string;
}

const WHATSAPP_NUMBER = '+212620740008';

const ChatBot: React.FC<ChatBotProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: language === 'ar'
        ? 'مرحباً بك في 4phone! 👋 أنا مساعدك الذكي الجديد. اسألني عن أي عطل في هاتفك، أو أرسل صورة للمشكلة. للتواصل المباشر اضغط زر واتساب في أي وقت. 📱✨'
        : 'Bienvenue chez 4phone! 👋 Je suis votre assistant intelligent. Posez-moi vos questions sur vos pannes, ou envoyez une photo. Pour un contact direct, cliquez sur WhatsApp à tout moment. 📱✨',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // إزالة apiKey
  // const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('perplexityApiKey') || '');
  // const [showApiInput, setShowApiInput] = useState(!localStorage.getItem('perplexityApiKey'));
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showApiKeyErrorAction, setShowApiKeyErrorAction] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // إزالة منطق حفظ api key وحذفه

  // اختيار صورة
  const handleSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // إزالة الصورة
  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // كشف هل المستخدم يريد تواصل واتساب
  const isContactIntent = (txt: string) => {
    const arMatch = /(اتصل|تواصل|رقم|whatsapp|واتساب|تسأل|اتواص|تواصل معي)/i;
    const frMatch = /(contact|appeler|numéro|whatsapp|wa.me)/i;
    return arMatch.test(txt) || frMatch.test(txt);
  };

  // إرسال رسالة (نص + صورة إن وجدت)
  const handleSendMessage = async () => {
    if ((!inputText.trim() && !selectedImage) || isTyping) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText || (selectedImage ? (language === 'ar' ? 'صورة مرفقة' : 'Image attachée') : ''),
      isBot: false,
      timestamp: new Date(),
      imageUrl: previewUrl || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // إذا المستخدم يطلب واتساب، أعطيه زرا مباشرا
    if (isContactIntent(userMessage.text)) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            text:
              language === 'ar'
                ? 'للتواصل المباشر اضغط على الزر أدناه لفتح واتساب مع خدمة العملاء.'
                : 'Cliquez sur le bouton ci-dessous pour discuter directement sur WhatsApp!',
            isBot: true,
            timestamp: new Date()
          }
        ]);
        setIsTyping(false);
      }, 700);
      handleRemoveImage();
      return;
    }

    // هنا يمكن إضافة ذكاء اصطناعي أو رسالة افتراضية
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 2,
          text: language === 'ar'
            ? 'عذرًا لم يتم دمج خدمة الرد الآلي تلقائيًا حالياً. للتواصل بشأن العطل، يمكنك استخدام زر واتساب أدناه.'
            : "Le service de réponse automatique n'est pas activé pour le moment. Veuillez contacter via WhatsApp.",
          isBot: true,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
      setShowApiKeyErrorAction(false);
      handleRemoveImage();
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-pulse"
        >
          <MessageCircle size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* لم يعد هناك showApiInput ولا إدخال api key */}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-4 md:bottom-6 md:right-6 md:inset-auto md:w-96 md:h-[500px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          {/* Header */}
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

          {/* الرسائل */}
          <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message, idx) => {
              // إذا كانت هذه رسالة الخطأ، أظهر الزر تحتها فقط
              const isErrorApiKeyMsg = message.text.includes("Perplexity API") && message.isBot;
              return (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
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
                      className={`p-3 md:p-3 rounded-2xl shadow-sm ${message.isBot
                        ? 'bg-white text-gray-800 border border-gray-100'
                        : 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                      }`}
                    >
                      {/* إذا الرسالة بها صورة */}
                      {message.imageUrl && (
                        <img src={message.imageUrl} alt="upload" className="mb-2 rounded max-h-40 object-contain border" />
                      )}
                      <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      {/* حذف زر تغيير المفتاح */}
                      {/* إذا هي رسالة البوت وتخص التواصل/واتساب, أظهر زر الفتح */}
                      {message.isBot && isContactIntent(message.text) && (
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 mt-2 text-white bg-green-600 hover:bg-green-700 rounded shadow transition space-x-1"
                        >
                          <MessageSquare size={16} />
                          <span>{language === "ar" ? "تواصل عبر واتساب" : "Contacter via WhatsApp"}</span>
                        </a>
                      )}
                      <div className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                        {message.timestamp.toLocaleTimeString('ar-MA', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {isTyping && (
              <div className="flex justify-start animate-fade-in">
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

          {/* إدخال نص وصورة اسفل الشات */}
          <div className="p-3 md:p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-end space-x-2 space-x-reverse">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder={language === 'ar' ? 'اكتب رسالتك هنا...' : 'Tapez votre message ici...'}
                className="flex-1 p-3 text-sm border border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white shadow-sm"
                disabled={isTyping}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`p-3 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full transition-all duration-300 shadow-sm ${selectedImage ? 'border-2 border-blue-400' : ''}`}
                title={language === 'ar' ? "إرفاق صورة" : "Ajouter image"}
                disabled={isTyping}
              >
                <ImageIcon size={16} />
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleSelectImage}
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={(!inputText.trim() && !selectedImage) || isTyping}
                className="p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transform hover:scale-105"
              >
                <Send size={14} className="md:w-4 md:h-4" />
              </button>
            </div>
            {/* إظهار معاينة الصورة قبل الإرسال */}
            {previewUrl && (
              <div className="flex mt-2 items-center space-x-2 space-x-reverse">
                <img src={previewUrl} alt="preview" className="h-16 w-16 rounded border object-contain" />
                <button onClick={handleRemoveImage} className="text-xs text-red-600 hover:underline">
                  {language === 'ar' ? "حذف الصورة" : "Supprimer l'image"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* تحريك Fade-in */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
};

export default ChatBot;

