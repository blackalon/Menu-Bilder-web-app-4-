import React, { useState, useRef } from 'react';
import { MenuProject } from '../types/menu';
import { ZoomIn, ZoomOut, Star, ShoppingCart, Download, FileImage, FileText, Trash2, Plus, Minus } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface MenuPreviewProps {
  project: MenuProject;
  showCurrencyFlag: boolean;
}

export const MenuPreview: React.FC<MenuPreviewProps> = ({ project, showCurrencyFlag }) => {
  const { restaurant, categories, style } = project;
  const [zoomLevel, setZoomLevel] = useState(100);
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const menuRef = useRef<HTMLDivElement>(null);

  const exportAsPNG = async () => {
    if (!menuRef.current) return;
    const canvas = await html2canvas(menuRef.current);
    const link = document.createElement('a');
    link.download = `${restaurant.name || 'menu'}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const exportAsPDF = async () => {
    if (!menuRef.current) return;
    const canvas = await html2canvas(menuRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${restaurant.name || 'menu'}.pdf`);
  };

  const removeFromCart = (itemId: string) => {
    if (!restaurant.enableCart) return;
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const addToCart = (itemId: string) => {
    if (!restaurant.enableCart) return;
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const getGridClass = () => {
    switch (style.itemsPerRow) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      case 5: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5';
      case 6: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6';
      default: return 'grid-cols-1 md:grid-cols-2';
    }
  };

  const getLayoutClass = () => {
    switch (style.layout) {
      case 'grid': return `grid ${getGridClass()}`;
      case 'card': return 'space-y-4';
      case 'list': return 'space-y-2';
      default: return `grid ${getGridClass()}`;
    }
  };

  const getShadowClass = () => {
    const intensity = style.shadowIntensity;
    if (intensity <= 2) return 'shadow-sm';
    if (intensity <= 4) return 'shadow-md';
    if (intensity <= 6) return 'shadow-lg';
    if (intensity <= 8) return 'shadow-xl';
    return 'shadow-2xl';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const totalCartItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <div className="menu-container rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="menu-controls px-4 py-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">معاينة المنيو المباشرة</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={exportAsPDF}
              className="zoom-button"
              title="تصدير كملف PDF"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={exportAsPNG}
              className="zoom-button"
              title="تصدير كصورة PNG"
            >
              <FileImage className="w-4 h-4" />
            </button>
            {restaurant.enableCart && totalCartItems > 0 && (
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-lg cursor-pointer hover:bg-white/30 transition-colors">
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm">{totalCartItems}</span>
              </div>
            )}
            <button
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
              className="zoom-button"
              disabled={zoomLevel <= 50}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
              className="zoom-button"
              disabled={zoomLevel >= 150}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        ref={menuRef}
        className="p-6 min-h-96 max-h-[600px] overflow-y-auto relative transition-all duration-300"
        style={{ 
          backgroundColor: style.theme === 'dark' ? '#1F2937' : style.backgroundColor,
          color: style.theme === 'dark' ? '#F9FAFB' : style.textColor,
          fontFamily: style.fontFamily,
          transform: `scale(${zoomLevel / 100})`,
          transformOrigin: 'top center'
        }}
      >
        {/* Background Image/Video */}
        {style.backgroundImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${style.backgroundImage})`,
              opacity: style.backgroundOpacity / 100
            }}
          />
        )}
        {style.backgroundVideo && (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: style.backgroundOpacity / 100 }}
            autoPlay
            muted
            loop
          >
            <source src={style.backgroundVideo} type="video/mp4" />
          </video>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className={`menu-header flex items-center mb-6 ${
            restaurant.logoPosition === 'top-center' ? 'justify-center text-center' :
            restaurant.logoPosition === 'top-right' ? 'justify-end text-right' : 'justify-start text-left'
          } ${style.animations ? 'animate-fade-in' : ''}`}>
            {restaurant.logo && (
              <img 
                src={restaurant.logo} 
                alt="Logo" 
                className="w-16 h-16 object-contain rounded-lg mr-4 shadow-md transition-transform hover:scale-105"
                style={{ borderRadius: `${style.borderRadius}px` }}
              />
            )}
            <div>
              <h1 
                style={{ 
                  fontSize: `${style.fontSize.title}px`,
                  color: style.theme === 'dark' ? '#F9FAFB' : style.primaryColor
                }}
                className="font-bold leading-tight"
              >
                {restaurant.name || 'اسم المطعم'}
              </h1>
              {restaurant.description && (
                <p className="text-sm opacity-80 mt-1">
                  {restaurant.description}
                </p>
              )}
              {restaurant.phone && (
                <p className="text-sm opacity-70 mt-1">
                  {restaurant.phone}
                </p>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-8">
            {categories.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>لم يتم إضافة أصناف بعد</p>
                <p className="text-sm">ابدأ بإضافة الأصناف والعناصر لرؤية المنيو</p>
              </div>
            ) : (
              categories.map((category, categoryIndex) => (
                <div 
                  key={category.id}
                  className={style.animations ? 'animate-slide-in' : ''}
                  style={{ animationDelay: `${categoryIndex * 0.1}s` }}
                >
                  <h2 
                    style={{ 
                      fontSize: `${style.fontSize.category}px`,
                      color: style.theme === 'dark' ? '#E5E7EB' : style.secondaryColor,
                      borderRadius: `${style.borderRadius}px`
                    }}
                    className="menu-category"
                    dir="rtl"
                  >
                    {category.name}
                  </h2>
                  
                  {category.items.length === 0 ? (
                    <p className="text-gray-500 text-sm">لا توجد عناصر في هذا الصنف</p>
                  ) : (
                    <div 
                      className={getLayoutClass()}
                      style={{ gap: `${style.spacing}px` }}
                    >
                      {category.items.map((item, itemIndex) => (
                        <div 
          key={item.id} 
          className={`
            menu-item
            ${style.layout === 'card' ? `border p-4 ${getShadowClass()}` : 
              style.layout === 'list' ? 'flex items-center justify-between border-b pb-2' : 
              `border p-3 ${getShadowClass()}`}
            ${item.isSpecialOffer ? 'special-offer' : ''}
            ${restaurant.enableCart ? 'cursor-pointer' : ''}
          `}
                          style={{ 
                            borderRadius: `${style.borderRadius}px`,
                            backgroundColor: style.layout !== 'list' ? 
                              (style.theme === 'dark' ? 'rgba(55,65,81,0.9)' : 'rgba(255,255,255,0.9)') : 
                              'transparent',
                            animationDelay: style.animations ? `${(categoryIndex * 0.1) + (itemIndex * 0.05)}s` : undefined
                          }}
                          onClick={() => addToCart(item.id)}
                        >
                          {style.layout === 'list' ? (
                            <>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 
                                    style={{ 
                                      fontSize: `${style.fontSize.item}px`,
                                      color: style.theme === 'dark' ? '#F9FAFB' : style.textColor
                                    }}
                                    className="font-semibold"
                                    dir="rtl"
                                  >
                                    {item.name}
                                  </h3>
                                  {item.isSpecialOffer && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                      عرض خاص
                                    </span>
                                  )}
                                </div>
                                {item.description && (
                                  <p className="text-sm opacity-80 mt-1" dir="rtl">
                                    {item.description}
                                  </p>
                                )}
                                
                                {/* Optional info */}
                                <div className="flex items-center gap-4 mt-1">
                                  {restaurant.showCalories && item.calories && (
                                    <span className="text-xs text-gray-500">
                                      🔥 {item.calories} سعرة
                                    </span>
                                  )}
                                  {restaurant.showRatings && item.rating && (
                                    <div className="rating-stars">
                                      <div className="flex">
                                        {renderStars(item.rating)}
                                      </div>
                                      {item.reviewCount && (
                                        <span className="text-xs text-gray-500">
                                          ({item.reviewCount})
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                                
                                {restaurant.showAllergens && item.allergens && (
                                  <p className="text-xs text-orange-600 mt-1">
                                    ⚠️ {item.allergens}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                {item.image && (
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-12 h-12 object-cover transition-transform hover:scale-110"
                                    style={{ borderRadius: `${style.borderRadius}px` }}
                                  />
                                )}
                                <div className="text-right">
                                  <span 
                                    style={{ 
                                      fontSize: `${style.fontSize.price}px`,
                                      color: style.accentColor
                                    }}
                                    className="font-bold block menu-price"
                                  >
                                    {showCurrencyFlag && restaurant.currency.flag} {item.price} {restaurant.currency.symbol}
                                  </span>
                                  {item.originalPrice && item.isSpecialOffer && (
                                    <span className="text-sm text-gray-500 line-through block">
                                      {item.originalPrice} {restaurant.currency.symbol}
                                    </span>
                                  )}
                                  {restaurant.enableCart && cart[item.id] && (
                                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                      {cart[item.id]}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {item.image && (
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-32 object-cover mb-3 menu-item-image"
                                  style={{ borderRadius: `${style.borderRadius}px` }}
                                />
                              )}
                              <div className="flex items-center gap-2 mb-2">
                                <h3 
                                  style={{ 
                                    fontSize: `${style.fontSize.item}px`,
                                    color: style.theme === 'dark' ? '#F9FAFB' : style.textColor
                                  }}
                                  className="font-semibold"
                                  dir="rtl"
                                >
                                  {item.name}
                                </h3>
                                {item.isSpecialOffer && (
                                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                                    عرض خاص
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="menu-description mb-3" dir="rtl">
                                  {item.description}
                                </p>
                              )}
                              
                              {/* Optional info */}
                              <div className="space-y-1 mb-3">
                                {restaurant.showCalories && item.calories && (
                                  <p className="text-xs text-gray-500">
                                    🔥 {item.calories} سعرة حرارية
                                  </p>
                                )}
                                {restaurant.showAllergens && item.allergens && (
                                  <p className="text-xs text-orange-600">
                                    ⚠️ {item.allergens}
                                  </p>
                                )}
                                {restaurant.showRatings && item.rating && (
                                  <div className="flex items-center gap-1">
                                    <div className="flex">
                                      {renderStars(item.rating)}
                                    </div>
                                    {item.reviewCount && (
                                      <span className="text-xs text-gray-500">
                                        ({item.reviewCount} تقييم)
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div>
                                  <span 
                                    style={{ 
                                      fontSize: `${style.fontSize.price}px`,
                                      color: style.accentColor
                                    }}
                                    className="font-bold block"
                                  >
                                    {showCurrencyFlag && restaurant.currency.flag} {item.price} {restaurant.currency.symbol}
                                  </span>
                                  {item.originalPrice && item.isSpecialOffer && (
                                    <span className="text-sm text-gray-500 line-through">
                                      {item.originalPrice} {restaurant.currency.symbol}
                                    </span>
                                  )}
                                </div>
                                {restaurant.enableCart && (
                                  <div className="flex items-center gap-2">
                                    {cart[item.id] && (
                                      <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                                        {cart[item.id]}
                                      </span>
                                    )}
                                    <div className="flex items-center gap-2">
                                      {cart[item.id] ? (
                                        <>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              removeFromCart(item.id);
                                            }}
                                            className="cart-button"
                                          >
                                            <Minus className="w-4 h-4" />
                                          </button>
                                          <span className="text-sm">{cart[item.id]}</span>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              addToCart(item.id);
                                            }}
                                            className="cart-button"
                                          >
                                            <Plus className="w-4 h-4" />
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setCart(prev => {
                                                const newCart = { ...prev };
                                                delete newCart[item.id];
                                                return newCart;
                                              });
                                            }}
                                            className="cart-button text-red-500"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                          </button>
                                        </>
                                      ) : (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(item.id);
                                          }}
                                          className="cart-button"
                                        >
                                          <ShoppingCart className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};