import React, { useState, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Image as ImageIcon, MessageSquare, Key, Delete } from 'lucide-react';
import { getTranslation, Language } from '@/utils/translations';
import { toast } from "@/components/ui/use-toast"; // إضافة التوست

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
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('perplexityApiKey') || '');
  const [showApiInput, setShowApiInput] = useState(!localStorage.getItem('perplexityApiKey'));
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showApiKeyErrorAction, setShowApiKeyErrorAction] = useState(false); // إضافة حالة جديدة

  const fileInputRef = useRef<HTMLInputElement>(null);

  // حفظ Perplexity API KEY محلياً
  const handleSaveApiKey = () => {
    if (apiKey.trim().length > 10) {
      localStorage.setItem('perplexityApiKey', apiKey.trim());
      setShowApiInput(false);
      setShowApiKeyErrorAction(false);
      toast({
        title: language === "ar" ? "تم حفظ المفتاح" : "Clé API enregistrée",
        description: language === "ar"
          ? "تم تحديث مفتاح Perplexity بنجاح"
          : "Clé Perplexity API mise à jour avec succès",
      });
    }
  };

  // حذف مفتاح Perplexity API من التخزين المحلي
  const handleDeleteApiKey = () => {
    localStorage.removeItem('perplexityApiKey');
    setApiKey('');
    setShowApiInput(false);
    toast({
      title: language === "ar" ? "تم حذف المفتاح" : "Clé supprimée",
      description: language === "ar"
        ? "تم إزالة مفتاح Perplexity بنجاح."
        : "Clé Perplexity API supprimée avec succès.",
    });
  };

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

    // ذكاء اصطناعي (Perplexity) للرد على الرسائل/المشاكل
    try {
      // رسالة نظام (prompt)
      let prompt = '';
      if (language === "ar") {
        prompt = "أنت مساعد محترف في إصلاح الهواتف والرد على مشاكلها، اجب باختصار ودقة وبأسلوب ودود. إذا أرسل المستخدم صورة، حاول تقديم نصائح عامة حول مشاكل الهواتف الشائعة.";
      } else {
        prompt = "Vous êtes un assistant professionnel dans la réparation de téléphones. Répondez brièvement, précisément et avec amabilité. Si une image est envoyée, essayez de donner des conseils généraux sur les problèmes courants des téléphones.";
      }

      // تحضير الرسائل
      const messagesForApi: any[] = [
        { role: "system", content: prompt }
      ];

      let messageContent = inputText;
      if (selectedImage && !inputText.trim()) {
        messageContent = language === "ar" ? "أرفقت صورة لمشكلة في هاتفي، هل يمكنك مساعدتي؟" : "J'ai attaché une image d'un problème avec mon téléphone, pouvez-vous m'aider?";
      } else if (selectedImage && inputText.trim()) {
        messageContent = inputText + (language === "ar" ? " (مع صورة مرفقة)" : " (avec image attachée)");
      }

      messagesForApi.push({ role: "user", content: messageContent });

      // طلب إلى Perplexity
      const apiMsg = {
        model: 'llama-3.1-sonar-small-128k-online',
        messages: messagesForApi,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: 350,
        return_images: false,
        return_related_questions: false
      };

      const res = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiMsg)
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      let botText = (data.choices && data.choices[0]?.message?.content) || (
        language === 'ar'
          ? 'عذرًا لم أتمكن من الفهم. أعد المحاولة أو تواصل معنا عبر واتساب!'
          : "Je n'ai pas compris, merci de réessayer ou de nous contacter via WhatsApp."
      );

      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 2,
          text: botText,
          isBot: true,
          timestamp: new Date()
        }
      ]);
      setShowApiKeyErrorAction(false); // إخفاء الزر عند نجاح الاستجابة
    } catch (err) {
      console.error('Error calling Perplexity API:', err);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 2,
          text: language === 'ar'
            ? 'حدث خطأ أثناء محاولة الرد الآلي. تأكد من صحة مفتاح Perplexity API أو تواصل معنا مباشرة عبر واتساب.'
            : "Erreur lors de la génération de la réponse AI. Veuillez vérifier votre clé API ou nous contacter directement via WhatsApp.",
          isBot: true,
          timestamp: new Date()
        }
      ]);
      toast({
        title: language === 'ar' ? 'خطأ المفتاح' : 'Erreur de clé',
        description: language === 'ar'
          ? 'يرجى التأكد من مفتاح Perplexity API أو تغييره.'
          : "Veuillez vérifier ou remplacer votre clé Perplexity API.",
        variant: "destructive"
      });
      setShowApiKeyErrorAction(true); // إظهار الزر عند وقوع الخطأ
    } finally {
      setIsTyping(false);
      handleRemoveImage();
    }
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

      {/* نافذة سؤال مفتاح Perplexity */}
      {isOpen && showApiInput && (
        <div className="fixed inset-4 md:bottom-6 md:right-6 md:inset-auto md:w-96 md:h-fit bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 overflow-hidden">
          <div className="p-6">
            <div className="font-bold text-lg mb-3 flex items-center gap-2">
              <Key size={18} className="text-blue-500" />
              {language === "ar" ? "أدخل مفتاح Perplexity API" : "Renseignez la clé API Perplexity"}
              <button
                onClick={handleDeleteApiKey}
                className="ml-auto p-1 rounded hover:bg-red-50 transition"
                title={language === "ar" ? "حذف المفتاح الحالي" : "Supprimer la clé actuelle"}
              >
                <Delete size={16} className="text-red-600" />
              </button>
            </div>
            <input
              type="password"
              placeholder="API Key..."
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              className="border p-3 rounded w-full mb-4"
            />
            <button
              className="bg-blue-600 text-white w-full rounded py-2 hover:bg-blue-700 mb-2 disabled:opacity-50"
              onClick={handleSaveApiKey}
              disabled={apiKey.length < 12}
            >
              {language === "ar" ? "حفظ ومتابعة" : "Enregistrer & Continuer"}
            </button>
            <div className="text-xs text-gray-500">
              {language === "ar" ? "ستُخزن محلياً ولن ترسل خارج جهازك" : "La clé API sera sauvegardée localement."}
            </div>
          </div>
        </div>
      )}

      {/* Chat Window - Enhanced design */}
      {isOpen && !showApiInput && (
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
                      {/* زر إدخال مفتاح جديد عند الخطأ في المفتاح */}
                      {isErrorApiKeyMsg && showApiKeyErrorAction && (
                        <button
                          onClick={() => setShowApiInput(true)}
                          className="mt-2 bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-xs transition-colors"
                        >
                          {language === "ar" ? "تغيير مفتاح Perplexity" : "Changer la clé Perplexity"}
                        </button>
                      )}
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
