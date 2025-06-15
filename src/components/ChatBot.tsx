
import React, { useState, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Image as ImageIcon, MessageSquare } from 'lucide-react';
import { getTranslation, Language } from '@/utils/translations';
import { toast } from "@/components/ui/use-toast";

/** Perplexity endpoint/model constants */
const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";
const PERPLEXITY_MODEL = "llama-3.1-sonar-small-128k-online";
const WHATSAPP_NUMBER = '+212620740008';

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

const COMMON_SOLUTIONS = {
  ar: [
    "١. أعد تشغيل هاتفك.",
    "٢. جرّب إزالة البطارية (إذا أمكن) ثم تركيبها مجددًا.",
    "٣. تأكد من تحديث النظام أو التطبيقات.",
    "٤. افحص الشاحن أو الكابل، وغالبًا جرب كابل/شاحن آخر.",
    "٥. إذا ظلت المشكلة، يُفضل زيارة مركز الصيانة."  
  ],
  fr: [
    "1. Redémarrez votre téléphone.",
    "2. Essayez de retirer et remettre la batterie si possible.",
    "3. Vérifiez les mises à jour système/applications.",
    "4. Testez avec un autre câble ou chargeur.",
    "5. Si le problème persiste, rendez-vous en centre de réparation."  
  ]
};

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

  // Perplexity API Key logic
  const [apiKey, setApiKey] = useState<string>(() =>
    localStorage.getItem('perplexityApiKey') || ''
  );
  const [showApiInput, setShowApiInput] = useState(!localStorage.getItem('perplexityApiKey'));
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save API key to localStorage
  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({ title: language === "ar" ? "ادخل المفتاح!" : "Entrez la clé API !" });
      return;
    }
    localStorage.setItem('perplexityApiKey', apiKey.trim());
    setShowApiInput(false);
    toast({ title: language === "ar" ? "تم حفظ المفتاح!" : "Clé API sauvegardée !" });
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

  // معالجة إرسال الرسالة
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

    // إذا لم يوجد مفتاح API
    if (!apiKey) {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text:
            language === 'ar'
              ? 'يرجى إدخال مفتاح Perplexity API الخاص بك في الحقل بالأعلى لتفعيل خدمة الرد الذكي.'
              : "Veuillez saisir votre clé API Perplexity ci-dessus pour activer la réponse intelligente.",
          isBot: true,
          timestamp: new Date(),
        }
      ]);
      setIsTyping(false);
      handleRemoveImage();
      setShowApiInput(true);
      return;
    }

    // تجهيز الرسالة لإرسالها إلى Perplexity
    try {
      const payload = {
        model: PERPLEXITY_MODEL,
        messages: [
          {
            role: 'system',
            content: language === 'ar'
              ? "ساعد الزبون في حل مشاكل الهاتف باقتضاب وخصص الحل حسب وصف المشكلة واعطه خطوات عملية واضحة. إذا كان هناك أكثر من احتمال، قدم الاحتمال الأكثر شيوعًا أولًا. اشرح باختصار شديد وبلغة بسيطة."
              : "Aide le client à résoudre ses problèmes de téléphone brièvement, adapte les solutions à la description, donne des étapes claires et simples.",
          },
          { role: 'user', content: userMessage.text }
        ],
        temperature: 0.1,
        top_p: 0.8,
        max_tokens: 350,
        return_images: false
      };

      const response = await fetch(PERPLEXITY_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        // if response is not JSON (e.g. 401), try fallback
        throw new Error("API error or vérifier la clé");
      }

      let aiReply: string | undefined =
        result.choices && result.choices[0]?.message?.content;

      // إذا api رجع نص فاضي، يقترح الحلول الشائعة
      if (!aiReply || typeof aiReply !== "string" || aiReply.length < 3) {
        aiReply =
          (language === "ar"
            ? "لم أتمكن من فهم المشكلة بدقة. جرب الخطوات التالية التي تصلح أغلب الأعطال:\n"
            : "Je n'ai pas pu comprendre précisément votre problème. Essayez ces étapes qui résolvent la majorité des pannes :\n") +
          COMMON_SOLUTIONS[language].join("\n");
      }

      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text: aiReply,
          isBot: true,
          timestamp: new Date()
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          text:
            (language === "ar"
              ? "حدث خطأ أو أن مفتاح Perplexity غير صحيح. يمكنك تجربة إدخاله مجددًا. إذا تعذر الرد الذكي، جرب هذه الحلول المنتشرة:\n"
              : "Erreur API ou clé Perplexity invalide. Réessayez d'ajouter votre clé. À défaut, testez ces solutions courantes :\n") +
            COMMON_SOLUTIONS[language].join("\n"),
          isBot: true,
          timestamp: new Date()
        }
      ]);
      setShowApiInput(true);
    } finally {
      setIsTyping(false);
      setInputText("");
      setPreviewUrl(null);
      setSelectedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
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

      {/* إدخال مفتاح Perplexity API (أول مرة فقط أو عند الخطأ) */}
      {showApiInput && isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center flex flex-col items-center gap-4">
            <div className="flex items-center space-x-2 mb-1">
              <Bot size={22} className="text-blue-600" />
              <span className="font-bold text-lg">
                {language === "ar"
                  ? "تفعيل الرد الذكي"
                  : "Activation de la réponse intelligente"}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-3">
              {language === "ar"
                ? "أدخل مفتاح Perplexity API الخاص بك ليتمكن المساعد من الرد على الأعطال تلقائيًا."
                : "Entrez votre clé API Perplexity pour permettre au bot de répondre automatiquement à vos problèmes."}
            </p>
            <input
              type="text"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="p-2 border rounded w-full text-center"
            />
            <button
              onClick={handleSaveApiKey}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-5 py-2 rounded font-bold hover:shadow-lg mt-2"
            >
              {language === "ar" ? "حفظ المفتاح" : "Enregistrer la clé"}
            </button>
            <button
              className="text-red-500 hover:underline mt-2 text-xs"
              onClick={() => setShowApiInput(false)}
            >
              {language === "ar" ? "إغلاق" : "Fermer"}
            </button>
          </div>
        </div>
      )}

      {/* نافذة الدردشة */}
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
            {messages.map((message) => {
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
