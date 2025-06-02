
export const translations = {
  ar: {
    // Header
    home: "الرئيسية",
    repairs: "الإصلاحات",
    parts: "قطع الغيار",
    
    // Home page
    welcomeTitle: "مرحباً بك في 4phone",
    welcomeDescription: "منصتك الشاملة لإصلاح الهواتف وبيع وشراء قطع الغيار الأصلية والهواتف المستعملة بأفضل الأسعار وأعلى جودة في الخدمة",
    bookRepair: "احجز إصلاح الآن",
    browseParts: "تصفح قطع الغيار",
    contactInfo: "معلومات التواصل",
    phoneNumber: "رقم الهاتف",
    email: "البريد الإلكتروني",
    address: "العنوان",
    
    // Repairs page
    repairsTitle: "خدمات الإصلاح المتخصصة",
    repairsDescription: "فريق من الفنيين المحترفين لإصلاح جميع أنواع الهواتف الذكية بأعلى معايير الجودة",
    requestRepairTitle: "اطلب إصلاح هاتفك الآن",
    requestRepairDescription: "صف لنا مشكلة هاتفك وسنتواصل معك لتقديم أفضل حل",
    fullName: "الاسم الكامل",
    phoneNumberField: "رقم الهاتف",
    deviceModel: "نوع وموديل الهاتف",
    commonProblems: "أمثلة للمشاكل الشائعة",
    problemDescription: "وصف المشكلة",
    submitRepair: "طلب إصلاح هاتفك",
    
    // Parts page
    partsTitle: "متجر قطع الغيار",
    partsDescription: "أكبر مجموعة من قطع غيار الهواتف الأصلية والمضمونة مع أفضل الأسعار في السوق",
    buyParts: "شراء قطع الغيار",
    sellPhone: "بيع هاتفك القديم",
    
    // Common
    currency: "درهم",
    addToCart: "أضف للسلة",
    outOfStock: "نفدت الكمية",
    original: "أصلي"
  },
  
  fr: {
    // Header
    home: "Accueil",
    repairs: "Réparations",
    parts: "Pièces détachées",
    
    // Home page
    welcomeTitle: "Bienvenue chez 4phone",
    welcomeDescription: "Votre plateforme complète pour la réparation de téléphones et l'achat/vente de pièces détachées originales et de téléphones d'occasion aux meilleurs prix et avec la plus haute qualité de service",
    bookRepair: "Réserver une réparation",
    browseParts: "Parcourir les pièces",
    contactInfo: "Informations de contact",
    phoneNumber: "Numéro de téléphone",
    email: "Email",
    address: "Adresse",
    
    // Repairs page
    repairsTitle: "Services de réparation spécialisés",
    repairsDescription: "Une équipe de techniciens professionnels pour réparer tous types de smartphones selon les plus hauts standards de qualité",
    requestRepairTitle: "Demandez la réparation de votre téléphone maintenant",
    requestRepairDescription: "Décrivez-nous le problème de votre téléphone et nous vous contacterons pour vous proposer la meilleure solution",
    fullName: "Nom complet",
    phoneNumberField: "Numéro de téléphone",
    deviceModel: "Type et modèle de l'appareil",
    commonProblems: "Exemples de problèmes courants",
    problemDescription: "Description du problème",
    submitRepair: "Demander la réparation",
    
    // Parts page
    partsTitle: "Magasin de pièces détachées",
    partsDescription: "La plus grande collection de pièces détachées originales et garanties pour téléphones aux meilleurs prix du marché",
    buyParts: "Acheter des pièces",
    sellPhone: "Vendre votre ancien téléphone",
    
    // Common
    currency: "DH",
    addToCart: "Ajouter au panier",
    outOfStock: "Rupture de stock",
    original: "Original"
  }
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.ar;

export const getTranslation = (language: Language, key: TranslationKey): string => {
  return translations[language][key] || translations.ar[key];
};
