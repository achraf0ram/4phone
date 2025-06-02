
import React, { useState } from 'react';
import { X, Star, ShoppingCart, Truck, Shield, Phone, MapPin, User, Mail } from 'lucide-react';
import { Language } from '@/utils/translations';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  rating: number;
  inStock: boolean;
  description: string;
  features: string[];
  warranty: string;
  brand: string;
  compatibility: string[];
}

interface ProductDetailsModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ 
  product, 
  isOpen, 
  onClose, 
  language 
}) => {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitOrder = () => {
    console.log('Order submitted:', { product, quantity, formData });
    alert(language === 'ar' ? 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.' : 'Votre commande a été envoyée avec succès ! Nous vous contacterons bientôt.');
    onClose();
    setShowPurchaseForm(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      notes: ''
    });
  };

  const calculateTotal = () => {
    const price = parseInt(product.price.replace(/[^\d]/g, ''));
    return price * quantity;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        
        <div className="relative inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {!showPurchaseForm ? (
            /* Product Details View */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {language === 'ar' ? 'أصلي' : 'Original'}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 mr-2">({product.rating})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    {product.originalPrice}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {language === 'ar' ? 'خصم' : 'Promo'}
                  </span>
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {language === 'ar' ? 'المميزات:' : 'Caractéristiques:'}
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Shield className="text-blue-500" size={18} />
                    <span className="text-gray-600">
                      {language === 'ar' ? 'الضمان:' : 'Garantie:'} {product.warranty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Truck className="text-green-500" size={18} />
                    <span className="text-gray-600">
                      {language === 'ar' ? 'توصيل مجاني' : 'Livraison gratuite'}
                    </span>
                  </div>
                </div>

                {/* Compatibility */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {language === 'ar' ? 'متوافق مع:' : 'Compatible avec:'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.map((device, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {device}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <label className="text-gray-700 font-semibold">
                      {language === 'ar' ? 'الكمية:' : 'Quantité:'}
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPurchaseForm(true)}
                    disabled={!product.inStock}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                      product.inStock
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={20} />
                    <span>
                      {product.inStock 
                        ? (language === 'ar' ? 'اشتري الآن' : 'Acheter maintenant')
                        : (language === 'ar' ? 'غير متوفر' : 'Non disponible')
                      }
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Purchase Form View */
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                {language === 'ar' ? 'إتمام عملية الشراء' : 'Finaliser l\'achat'}
              </h2>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">
                  {language === 'ar' ? 'ملخص الطلب:' : 'Résumé de la commande:'}
                </h3>
                <div className="flex items-center space-x-4 space-x-reverse mb-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-gray-600">
                      {language === 'ar' ? 'الكمية:' : 'Quantité:'} {quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{calculateTotal()} MAD</p>
                  </div>
                </div>
              </div>

              {/* Purchase Form */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'الاسم الكامل *' : 'Nom complet *'}
                    </label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Entrez votre nom complet'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'رقم الهاتف *' : 'Numéro de téléphone *'}
                    </label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        placeholder="05xxxxxxxx"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {language === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (optionnel)'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder={language === 'ar' ? 'example@email.com' : 'example@email.com'}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'العنوان *' : 'Adresse *'}
                    </label>
                    <div className="relative">
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                        placeholder={language === 'ar' ? 'الشارع والحي' : 'Rue et quartier'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {language === 'ar' ? 'المدينة *' : 'Ville *'}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                      placeholder={language === 'ar' ? 'المدينة' : 'Ville'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {language === 'ar' ? 'ملاحظات إضافية' : 'Notes supplémentaires'}
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    placeholder={language === 'ar' ? 'أي ملاحظات أو تعليمات خاصة...' : 'Toutes notes ou instructions spéciales...'}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => setShowPurchaseForm(false)}
                    className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    {language === 'ar' ? 'العودة' : 'Retour'}
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={!formData.name || !formData.phone || !formData.address || !formData.city}
                    className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {language === 'ar' ? 'تأكيد الطلب' : 'Confirmer la commande'}
                  </button>
                </div>

                <p className="text-sm text-gray-600 text-center">
                  {language === 'ar' 
                    ? 'سنتواصل معك خلال 24 ساعة لتأكيد الطلب وترتيب التوصيل'
                    : 'Nous vous contacterons dans les 24 heures pour confirmer la commande et organiser la livraison'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;

