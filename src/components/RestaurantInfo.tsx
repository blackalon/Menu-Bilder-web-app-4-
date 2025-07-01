import React from 'react';
import { RestaurantInfo as RestaurantInfoType } from '../types/menu';
import { Upload, Image as ImageIcon, Settings } from 'lucide-react';

interface RestaurantInfoProps {
  info: RestaurantInfoType;
  onUpdateInfo: (info: RestaurantInfoType) => void;
}

export const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ info, onUpdateInfo }) => {
  const handleInputChange = (field: keyof RestaurantInfoType, value: string | boolean) => {
    onUpdateInfo({ ...info, [field]: value });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdateInfo({ ...info, logo: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">معلومات المطعم</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم المطعم *
          </label>
          <input
            type="text"
            value={info.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="اسم المطعم"
            dir="rtl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الهاتف
          </label>
          <input
            type="text"
            value={info.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="رقم الهاتف"
            dir="rtl"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            وصف المطعم
          </label>
          <textarea
            value={info.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="وصف مختصر عن المطعم"
            dir="rtl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            العنوان
          </label>
          <input
            type="text"
            value={info.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="عنوان المطعم"
            dir="rtl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الموقع الإلكتروني
          </label>
          <input
            type="url"
            value={info.website || ''}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            شعار المطعم
          </label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              رفع الشعار
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
            
            {info.logo && (
              <div className="flex items-center gap-2">
                <img src={info.logo} alt="Logo" className="w-12 h-12 object-contain rounded" />
                <span className="text-sm text-green-600">تم رفع الشعار</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            موضع الشعار
          </label>
          <div className="flex gap-2">
            {[
              { value: 'top-left', label: 'يسار أعلى' },
              { value: 'top-center', label: 'وسط أعلى' },
              { value: 'top-right', label: 'يمين أعلى' }
            ].map((position) => (
              <button
                key={position.value}
                onClick={() => handleInputChange('logoPosition', position.value as any)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  info.logoPosition === position.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {position.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Features */}
        <div className="md:col-span-2 border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            الميزات الاختيارية
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showCalories"
                checked={info.showCalories || false}
                onChange={(e) => handleInputChange('showCalories', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="showCalories" className="text-sm font-medium text-gray-700">
                عرض السعرات الحرارية
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showAllergens"
                checked={info.showAllergens || false}
                onChange={(e) => handleInputChange('showAllergens', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="showAllergens" className="text-sm font-medium text-gray-700">
                عرض مؤشرات الحساسية
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showRatings"
                checked={info.showRatings || false}
                onChange={(e) => handleInputChange('showRatings', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="showRatings" className="text-sm font-medium text-gray-700">
                عرض تقييمات العملاء
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="enableCart"
                checked={info.enableCart || false}
                onChange={(e) => handleInputChange('enableCart', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="enableCart" className="text-sm font-medium text-gray-700">
                تفعيل السلة (للطلبات)
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};