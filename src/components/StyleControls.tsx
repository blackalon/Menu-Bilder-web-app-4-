import React, { useState } from 'react';
import { MenuStyle } from '../types/menu';
import { Palette, Type, Layout, Upload, Image as ImageIcon, Play, Moon, Sun, Sparkles } from 'lucide-react';

interface StyleControlsProps {
  style: MenuStyle;
  onUpdateStyle: (style: MenuStyle) => void;
}

export const StyleControls: React.FC<StyleControlsProps> = ({ style, onUpdateStyle }) => {
  const [showColorPalettes, setShowColorPalettes] = useState(false);

  const handleColorChange = (colorKey: keyof MenuStyle, value: string) => {
    onUpdateStyle({ ...style, [colorKey]: value });
  };

  const handleFontSizeChange = (sizeKey: keyof MenuStyle['fontSize'], value: number) => {
    onUpdateStyle({
      ...style,
      fontSize: { ...style.fontSize, [sizeKey]: value }
    });
  };

  const handleBackgroundUpload = (file: File, type: 'image' | 'video') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (type === 'image') {
        onUpdateStyle({ ...style, backgroundImage: result, backgroundVideo: undefined });
      } else {
        onUpdateStyle({ ...style, backgroundVideo: result, backgroundImage: undefined });
      }
    };
    reader.readAsDataURL(file);
  };

  const colorPalettes = [
    {
      name: 'أزرق كلاسيكي',
      colors: {
        primaryColor: '#1E40AF',
        secondaryColor: '#3B82F6',
        accentColor: '#F59E0B',
        backgroundColor: '#F8FAFC',
        textColor: '#1F2937'
      }
    },
    {
      name: 'أخضر طبيعي',
      colors: {
        primaryColor: '#059669',
        secondaryColor: '#10B981',
        accentColor: '#F59E0B',
        backgroundColor: '#F0FDF4',
        textColor: '#1F2937'
      }
    },
    {
      name: 'أحمر أنيق',
      colors: {
        primaryColor: '#DC2626',
        secondaryColor: '#EF4444',
        accentColor: '#F59E0B',
        backgroundColor: '#FEF2F2',
        textColor: '#1F2937'
      }
    },
    {
      name: 'بنفسجي عصري',
      colors: {
        primaryColor: '#7C3AED',
        secondaryColor: '#8B5CF6',
        accentColor: '#F59E0B',
        backgroundColor: '#FAF5FF',
        textColor: '#1F2937'
      }
    },
    {
      name: 'ذهبي فاخر',
      colors: {
        primaryColor: '#92400E',
        secondaryColor: '#D97706',
        accentColor: '#DC2626',
        backgroundColor: '#FFFBEB',
        textColor: '#1F2937'
      }
    },
    {
      name: 'رمادي احترافي',
      colors: {
        primaryColor: '#374151',
        secondaryColor: '#6B7280',
        accentColor: '#3B82F6',
        backgroundColor: '#F9FAFB',
        textColor: '#1F2937'
      }
    }
  ];

  const applyColorPalette = (palette: any) => {
    onUpdateStyle({ ...style, ...palette.colors });
    setShowColorPalettes(false);
  };

  const fontOptions = [
    { value: 'Inter', label: 'Inter - عصري', preview: 'font-sans' },
    { value: 'Georgia', label: 'Georgia - كلاسيكي', preview: 'font-serif' },
    { value: 'Arial', label: 'Arial - بسيط', preview: 'font-sans' },
    { value: 'Helvetica', label: 'Helvetica - نظيف', preview: 'font-sans' },
    { value: 'Times New Roman', label: 'Times - تقليدي', preview: 'font-serif' },
    { value: 'Roboto', label: 'Roboto - حديث', preview: 'font-sans' },
    { value: 'Open Sans', label: 'Open Sans - ودود', preview: 'font-sans' },
    { value: 'Amiri', label: 'أميري - عربي أنيق', preview: 'font-serif' },
    { value: 'Cairo', label: 'القاهرة - عربي عصري', preview: 'font-sans' },
    { value: 'Tajawal', label: 'تجوال - عربي بسيط', preview: 'font-sans' }
  ];

  const colorOptions = [
    { key: 'primaryColor' as keyof MenuStyle, label: 'اللون الأساسي', icon: '🎨' },
    { key: 'secondaryColor' as keyof MenuStyle, label: 'اللون الثانوي', icon: '🖌️' },
    { key: 'accentColor' as keyof MenuStyle, label: 'لون التمييز', icon: '✨' },
    { key: 'backgroundColor' as keyof MenuStyle, label: 'لون الخلفية', icon: '🏠' },
    { key: 'textColor' as keyof MenuStyle, label: 'لون النص', icon: '📝' }
  ];

  const fontSizeOptions = [
    { key: 'title' as keyof MenuStyle['fontSize'], label: 'العنوان الرئيسي', icon: '📰' },
    { key: 'category' as keyof MenuStyle['fontSize'], label: 'عناوين الأصناف', icon: '📋' },
    { key: 'item' as keyof MenuStyle['fontSize'], label: 'أسماء العناصر', icon: '🍽️' },
    { key: 'price' as keyof MenuStyle['fontSize'], label: 'الأسعار', icon: '💰' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Palette className="w-5 h-5 text-purple-500" />
        تخصيص التصميم المتقدم
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Colors */}
        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl border border-red-100">
          <h3 className="font-semibold mb-3 text-red-800 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            الألوان
          </h3>
          
          <div className="mb-4">
            <button
              onClick={() => setShowColorPalettes(!showColorPalettes)}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md flex items-center gap-2 justify-center"
            >
              <Sparkles className="w-4 h-4" />
              قوالب ألوان جاهزة
            </button>
            
            {showColorPalettes && (
              <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                {colorPalettes.map((palette, index) => (
                  <button
                    key={index}
                    onClick={() => applyColorPalette(palette)}
                    className="w-full text-right px-3 py-2 hover:bg-purple-100 text-sm rounded-lg border border-purple-200 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>{palette.name}</span>
                      <div className="flex gap-1">
                        {Object.values(palette.colors).slice(0, 3).map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            {colorOptions.map((option) => (
              <div key={option.key}>
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                  <span>{option.icon}</span>
                  {option.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={style[option.key] as string}
                    onChange={(e) => handleColorChange(option.key, e.target.value)}
                    className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer shadow-sm"
                  />
                  <input
                    type="text"
                    value={style[option.key] as string}
                    onChange={(e) => handleColorChange(option.key, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <h3 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
            <Type className="w-4 h-4" />
            الخطوط والأحجام
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                نوع الخط
              </label>
              <select
                value={style.fontFamily}
                onChange={(e) => onUpdateStyle({ ...style, fontFamily: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {fontOptions.map((font) => (
                  <option key={font.value} value={font.value} className={font.preview}>
                    {font.label}
                  </option>
                ))}
              </select>
              <div className="mt-2 p-2 bg-white rounded border text-sm" style={{ fontFamily: style.fontFamily }}>
                معاينة الخط: مرحباً بكم في مطعمنا
              </div>
            </div>

            {fontSizeOptions.map((option) => (
              <div key={option.key}>
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                  <span>{option.icon}</span>
                  {option.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={style.fontSize[option.key]}
                    onChange={(e) => handleFontSizeChange(option.key, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12">
                    {style.fontSize[option.key]}px
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
          <h3 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
            <Layout className="w-4 h-4" />
            التخطيط والمظهر
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                نمط العرض
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { value: 'grid', label: '🔲 شبكة', desc: 'عرض منظم' },
                  { value: 'card', label: '🃏 بطاقات', desc: 'عرض مفصل' },
                  { value: 'list', label: '📋 قائمة', desc: 'عرض مضغوط' }
                ].map((layout) => (
                  <button
                    key={layout.value}
                    onClick={() => onUpdateStyle({ ...style, layout: layout.value as any })}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-right ${
                      style.layout === layout.value
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-200'
                    }`}
                  >
                    <div>
                      <div>{layout.label}</div>
                      <div className="text-xs opacity-75">{layout.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>🔢</span>
                عدد العناصر في الصف
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="6"
                  value={style.itemsPerRow}
                  onChange={(e) => onUpdateStyle({ ...style, itemsPerRow: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-8">
                  {style.itemsPerRow}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>🔄</span>
                انحناء الحواف
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={style.borderRadius}
                  onChange={(e) => onUpdateStyle({ ...style, borderRadius: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-12">
                  {style.borderRadius}px
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>📏</span>
                المسافات
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="8"
                  max="32"
                  value={style.spacing}
                  onChange={(e) => onUpdateStyle({ ...style, spacing: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-12">
                  {style.spacing}px
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-1">
                <span>🌫️</span>
                شدة الظلال
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={style.shadowIntensity}
                  onChange={(e) => onUpdateStyle({ ...style, shadowIntensity: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 w-8">
                  {style.shadowIntensity}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="animations"
                checked={style.animations || false}
                onChange={(e) => onUpdateStyle({ ...style, animations: e.target.checked })}
                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor="animations" className="text-sm font-medium text-gray-700 flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                تفعيل التأثيرات المتحركة
              </label>
            </div>
          </div>
        </div>

        {/* Background & Theme */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-100">
          <h3 className="font-semibold mb-3 text-purple-800">الخلفية والثيم</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                نمط الثيم
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => onUpdateStyle({ ...style, theme: 'light' })}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 justify-center ${
                    style.theme === 'light' || !style.theme
                      ? 'bg-yellow-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-yellow-100 border border-gray-200'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  فاتح
                </button>
                <button
                  onClick={() => onUpdateStyle({ ...style, theme: 'dark' })}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 justify-center ${
                    style.theme === 'dark'
                      ? 'bg-gray-800 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  مظلم
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <label className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-1 shadow-md flex-1 justify-center">
                <ImageIcon className="w-3 h-3" />
                صورة خلفية
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleBackgroundUpload(file, 'image');
                  }}
                  className="hidden"
                />
              </label>
              <label className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-1 shadow-md flex-1 justify-center">
                <Play className="w-3 h-3" />
                فيديو خلفية
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleBackgroundUpload(file, 'video');
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {(style.backgroundImage || style.backgroundVideo) && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  شفافية الخلفية
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={style.backgroundOpacity}
                    onChange={(e) => onUpdateStyle({ ...style, backgroundOpacity: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12">
                    {style.backgroundOpacity}%
                  </span>
                </div>
              </div>
            )}

            {(style.backgroundImage || style.backgroundVideo) && (
              <button
                onClick={() => onUpdateStyle({ ...style, backgroundImage: undefined, backgroundVideo: undefined })}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-lg text-sm hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md"
              >
                إزالة الخلفية
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};