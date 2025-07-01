import { useState, useCallback } from 'react';
import { MenuProject, MenuTemplate, RestaurantInfo, MenuCategory, MenuStyle, Currency, AIMenuSuggestion, AIPromptHistory } from '../types/menu';
import { menuTemplates } from '../data/templates';
import { defaultCurrency } from '../data/currencies';

export const useMenuBuilder = () => {
  const [customTemplates, setCustomTemplates] = useState<MenuTemplate[]>([]);
  const [showCurrencyFlag, setShowCurrencyFlag] = useState(true);
  
  const [currentProject, setCurrentProject] = useState<MenuProject>({
    id: Date.now().toString(),
    name: '',
    restaurant: {
      name: '',
      description: '',
      logoPosition: 'top-center',
      currency: defaultCurrency,
      enableBooking: false,
      enableOnlineOrdering: false,
      enableLoyaltyProgram: false,
      enableReviews: false,
      enableMultiLanguage: false,
      enableSocialSharing: false,
      enableAnalytics: false,
      enableQRCode: false,
      enableAutoBackup: false,
      enableSeasonalMenus: false,
      enableTimeBasedMenus: false,
      enablePromotions: false,
      enableInventoryManagement: false
    },
    template: menuTemplates[0],
    categories: [],
    style: {
      ...menuTemplates[0].style,
      backgroundOpacity: 100,
      borderRadius: 8,
      spacing: 16,
      shadowIntensity: 2,
      enableMotionEffects: false,
      customFonts: [],
      enableSearch: false,
      enableFeaturedItems: false,
      enableLivePreview: false,
      customTemplateOptions: {
        seasonalThemes: false,
        specialEvents: false,
        holidayDecorations: false
      }
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    hasCart: false
  });

  const updateRestaurantInfo = useCallback((info: RestaurantInfo) => {
    setCurrentProject(prev => ({
      ...prev,
      restaurant: info,
      updatedAt: new Date()
    }));
  }, []);

  const updateTemplate = useCallback((template: MenuTemplate) => {
    setCurrentProject(prev => ({
      ...prev,
      template,
      style: { ...template.style, backgroundOpacity: 100, borderRadius: 8, spacing: 16, shadowIntensity: 2 },
      updatedAt: new Date()
    }));
  }, []);

  const updateCategories = useCallback((categories: MenuCategory[]) => {
    setCurrentProject(prev => ({
      ...prev,
      categories,
      updatedAt: new Date()
    }));
  }, []);

  const updateStyle = useCallback((style: MenuStyle) => {
    setCurrentProject(prev => ({
      ...prev,
      style,
      updatedAt: new Date()
    }));
  }, []);

  const saveProject = useCallback((project: MenuProject) => {
    setCurrentProject(project);
  }, []);

  const loadProject = useCallback((project: MenuProject) => {
    setCurrentProject(project);
  }, []);

  const createNewProject = useCallback(() => {
    setCurrentProject({
      id: Date.now().toString(),
      name: '',
      restaurant: {
        name: '',
        description: '',
        logoPosition: 'top-center',
        currency: defaultCurrency,
        enableBooking: false,
        enableOnlineOrdering: false,
        enableLoyaltyProgram: false,
        enableReviews: false,
        enableMultiLanguage: false,
        enableSocialSharing: false,
        enableAnalytics: false,
        enableQRCode: false,
        enableAutoBackup: false,
        enableSeasonalMenus: false,
        enableTimeBasedMenus: false,
        enablePromotions: false,
        enableInventoryManagement: false
      },
      template: menuTemplates[0],
      categories: [],
      style: {
        ...menuTemplates[0].style,
        backgroundOpacity: 100,
        borderRadius: 8,
        spacing: 16,
        shadowIntensity: 2,
        enableMotionEffects: false,
        customFonts: [],
        enableSearch: false,
        enableFeaturedItems: false,
        enableLivePreview: false,
        customTemplateOptions: {
          seasonalThemes: false,
          specialEvents: false,
          holidayDecorations: false
        }
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      hasCart: false
    });
  }, []);

  const addCustomTemplate = useCallback((template: MenuTemplate) => {
    setCustomTemplates(prev => [...prev, template]);
  }, []);

  const updateCustomTemplate = useCallback((template: MenuTemplate) => {
    setCustomTemplates(prev => prev.map(t => t.id === template.id ? template : t));
  }, []);

  const deleteCustomTemplate = useCallback((templateId: string) => {
    setCustomTemplates(prev => prev.filter(t => t.id !== templateId));
  }, []);

  const importFromExcel = useCallback((categories: MenuCategory[]) => {
    setCurrentProject(prev => ({
      ...prev,
      categories,
      updatedAt: new Date()
    }));
  }, []);

  const exportProject = useCallback((format: 'pdf' | 'html' | 'png') => {
    switch (format) {
      case 'pdf':
        console.log('Exporting as PDF...');
        break;
      case 'html':
        const htmlContent = generateHTML(currentProject, showCurrencyFlag);
        downloadFile(htmlContent, `${currentProject.name || 'menu'}.html`, 'text/html');
        break;
      case 'png':
        console.log('Exporting as PNG...');
        break;
      default:
        break;
    }
  }, [currentProject, showCurrencyFlag]);

  // AI Assistant Functions
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const generateAiSuggestions = useCallback(async (prompt: string) => {
    setIsAiLoading(true);
    setAiError(null);
    
    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a unique ID for this suggestion
      const suggestionId = Date.now().toString();
      
      // Create sample AI response based on the prompt
      let response = "";
      let suggestions: AIMenuSuggestion[] = [];
      
      if (prompt.includes("قائمة") || prompt.includes("menu")) {
        response = "إليك بعض الاقتراحات لتحسين قائمة الطعام الخاصة بك:";
        
        // Generate a sample category suggestion
        if (prompt.includes("فئة") || prompt.includes("category") || Math.random() > 0.5) {
          const categorySuggestion: AIMenuSuggestion = {
            id: `cat-${suggestionId}-1`,
            type: 'category',
            name: 'المأكولات البحرية',
            description: 'فئة جديدة للمأكولات البحرية الطازجة',
            data: {
              id: `cat-${suggestionId}-1`,
              name: 'المأكولات البحرية',
              items: [
                {
                  id: `item-${suggestionId}-1`,
                  name: 'سمك السلمون المشوي',
                  description: 'سمك سلمون طازج مشوي مع صلصة الليمون والأعشاب',
                  price: 85,
                  calories: 320,
                  allergens: 'سمك',
                  isSpecialOffer: true,
                  originalPrice: 95,
                  rating: 4.8
                },
                {
                  id: `item-${suggestionId}-2`,
                  name: 'روبيان مقلي',
                  description: 'روبيان مقلي مع صلصة الثوم والزبدة',
                  price: 75,
                  calories: 280,
                  allergens: 'قشريات، منتجات ألبان',
                  rating: 4.6
                }
              ]
            },
            createdAt: new Date(),
            applied: false
          };
          suggestions.push(categorySuggestion);
        }
        
        // Generate a sample item suggestion
        if (prompt.includes("طبق") || prompt.includes("item") || Math.random() > 0.5) {
          const itemSuggestion: AIMenuSuggestion = {
            id: `item-${suggestionId}-3`,
            type: 'item',
            name: 'برجر لحم واجيو',
            description: 'إضافة برجر لحم واجيو الفاخر إلى قائمتك',
            data: {
              id: `item-${suggestionId}-3`,
              name: 'برجر لحم واجيو',
              description: 'برجر لحم واجيو فاخر مع جبنة شيدر وصلصة خاصة',
              price: 65,
              calories: 750,
              allergens: 'جلوتين، منتجات ألبان',
              isSpecialOffer: true,
              originalPrice: 75,
              rating: 4.9
            },
            createdAt: new Date(),
            applied: false
          };
          suggestions.push(itemSuggestion);
        }
        
        // Generate a sample style suggestion
        if (prompt.includes("ستايل") || prompt.includes("style") || Math.random() > 0.5) {
          const styleSuggestion: AIMenuSuggestion = {
            id: `style-${suggestionId}`,
            type: 'style',
            name: 'تصميم عصري',
            description: 'تحديث ألوان وخطوط القائمة لمظهر أكثر عصرية',
            data: {
              primaryColor: '#3B82F6',
              secondaryColor: '#1E40AF',
              accentColor: '#F59E0B',
              fontFamily: 'Tajawal, sans-serif',
              fontSize: {
                title: 32,
                category: 24,
                item: 18,
                price: 20
              },
              borderRadius: 12,
              shadowIntensity: 3,
              enableMotionEffects: true
            },
            createdAt: new Date(),
            applied: false
          };
          suggestions.push(styleSuggestion);
        }
      }
      
      // Create a new AI prompt history entry
      const promptHistory: AIPromptHistory = {
        id: suggestionId,
        prompt,
        response,
        suggestions,
        createdAt: new Date()
      };
      
      // Update the project with the new AI history
      setCurrentProject(prev => ({
        ...prev,
        aiHistory: [...(prev.aiHistory || []), promptHistory],
        updatedAt: new Date()
      }));
      
      setIsAiLoading(false);
      return promptHistory;
    } catch (error) {
      setIsAiLoading(false);
      setAiError(error instanceof Error ? error.message : 'حدث خطأ أثناء توليد الاقتراحات');
      throw error;
    }
  }, []);

  const applyAiSuggestion = useCallback((suggestionId: string) => {
    setCurrentProject(prev => {
      // Find the suggestion in the AI history
      const aiHistory = prev.aiHistory || [];
      let appliedSuggestion: AIMenuSuggestion | undefined;
      
      // Update the AI history to mark the suggestion as applied
      const updatedAiHistory = aiHistory.map(history => {
        const updatedSuggestions = history.suggestions.map(suggestion => {
          if (suggestion.id === suggestionId) {
            appliedSuggestion = suggestion;
            return { ...suggestion, applied: true };
          }
          return suggestion;
        });
        
        return { ...history, suggestions: updatedSuggestions };
      });
      
      // If no suggestion was found, return the previous state
      if (!appliedSuggestion) return prev;
      
      // Apply the suggestion based on its type
      switch (appliedSuggestion.type) {
        case 'category':
          return {
            ...prev,
            categories: [...prev.categories, appliedSuggestion.data as MenuCategory],
            aiHistory: updatedAiHistory,
            updatedAt: new Date()
          };
          
        case 'item':
          // Find the first category to add the item to (in a real app, you'd want to specify the category)
          if (prev.categories.length === 0) return prev;
          
          return {
            ...prev,
            categories: prev.categories.map((category, index) => 
              index === 0 
                ? { ...category, items: [...category.items, appliedSuggestion!.data as MenuItem] }
                : category
            ),
            aiHistory: updatedAiHistory,
            updatedAt: new Date()
          };
          
        case 'style':
          return {
            ...prev,
            style: { ...prev.style, ...(appliedSuggestion.data as Partial<MenuStyle>) },
            aiHistory: updatedAiHistory,
            updatedAt: new Date()
          };
          
        case 'template':
          // In a real app, you'd want to handle template suggestions differently
          return {
            ...prev,
            aiHistory: updatedAiHistory,
            updatedAt: new Date()
          };
          
        default:
          return prev;
      }
    });
  }, []);

  return {
    currentProject,
    customTemplates,
    showCurrencyFlag,
    setShowCurrencyFlag,
    updateRestaurantInfo,
    updateTemplate,
    updateCategories,
    updateStyle,
    saveProject,
    loadProject,
    createNewProject,
    addCustomTemplate,
    updateCustomTemplate,
    deleteCustomTemplate,
    importFromExcel,
    exportProject,
    // AI features
    generateAiSuggestions,
    applyAiSuggestion,
    isAiLoading,
    aiError
  };
};

const generateHTML = (project: MenuProject, showCurrencyFlag: boolean): string => {
  const { restaurant, categories, style } = project;
  
  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${restaurant.name}</title>
    ${style.enableSearch ? '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">' : ''}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: ${style.fontFamily}, sans-serif;
            background-color: ${style.backgroundColor};
            color: ${style.textColor};
            padding: 20px;
            line-height: 1.6;
            ${style.backgroundImage ? `background-image: url(${style.backgroundImage}); background-size: cover; background-position: center;` : ''}
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            text-align: ${restaurant.logoPosition.includes('center') ? 'center' : 
                        restaurant.logoPosition.includes('right') ? 'right' : 'left'};
            margin-bottom: 30px;
        }
        .logo { width: 80px; height: 80px; object-fit: contain; border-radius: ${style.borderRadius}px; }
        .restaurant-name {
            font-size: ${style.fontSize.title}px;
            color: ${style.primaryColor};
            font-weight: bold;
            margin: 10px 0;
        }
        .category {
            margin-bottom: 40px;
        }
        .category-title {
            font-size: ${style.fontSize.category}px;
            color: ${style.secondaryColor};
            font-weight: bold;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid ${style.secondaryColor};
            border-radius: ${style.borderRadius}px;
        }
        .items {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: ${style.spacing}px;
        }
        .item {
            border: 1px solid #ddd;
            border-radius: ${style.borderRadius}px;
            padding: 15px;
            background: rgba(255,255,255,0.9);
            box-shadow: 0 ${style.shadowIntensity}px ${style.shadowIntensity * 2}px rgba(0,0,0,0.1);
            ${style.enableMotionEffects ? 'transition: transform 0.3s ease; cursor: pointer;' : ''}
            ${style.enableFeaturedItems ? 'position: relative;' : ''}
        }
        ${style.enableMotionEffects ? '.item:hover { transform: translateY(-5px); }' : ''}
        .featured-badge {
            position: absolute;
            top: -10px;
            right: -10px;
            background: ${style.accentColor};
            color: white;
            padding: 5px 10px;
            border-radius: ${style.borderRadius}px;
            font-size: 12px;
            font-weight: bold;
        }
        .search-container {
            margin-bottom: 20px;
            text-align: center;
        }
        .search-input {
            padding: 10px;
            width: 100%;
            max-width: 500px;
            border: 1px solid #ddd;
            border-radius: ${style.borderRadius}px;
            font-size: 16px;
        }
        .item-image {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: ${style.borderRadius}px;
            margin-bottom: 10px;
        }
        .item-name {
            font-size: ${style.fontSize.item}px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .item-description {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 10px;
        }
        .item-price {
            font-size: ${style.fontSize.price}px;
            color: ${style.accentColor};
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        ${style.enableSearch ? `
        <div class="search-container">
            <input type="text" class="search-input" placeholder="ابحث في القائمة..." id="menuSearch">
        </div>
        ` : ''}
        <div class="header">
            ${restaurant.logo ? `<img src="${restaurant.logo}" alt="Logo" class="logo">` : ''}
            <h1 class="restaurant-name">${restaurant.name}</h1>
            ${restaurant.description ? `<p>${restaurant.description}</p>` : ''}
            ${restaurant.phone ? `<p>${restaurant.phone}</p>` : ''}
        </div>

        ${categories.map(category => `
            <div class="category">
                <h2 class="category-title">${category.name}</h2>
                <div class="items">
                    ${category.items.map(item => `
                        <div class="item">
                            ${item.image ? `<img src="${item.image}" alt="${item.name}" class="item-image">` : ''}
                            <h3 class="item-name">${item.name}</h3>
                            ${item.description ? `<p class="item-description">${item.description}</p>` : ''}
                            <p class="item-price">${showCurrencyFlag && restaurant.currency.flag ? restaurant.currency.flag + ' ' : ''}${item.price} ${restaurant.currency.symbol}</p>
                            ${item.isSpecialOffer && style.enableFeaturedItems ? '<span class="featured-badge">عرض مميز</span>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('')}
    </div>
    ${style.enableSearch ? `
    <script>
        document.getElementById('menuSearch').addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            document.querySelectorAll('.item').forEach(item => {
                const itemName = item.querySelector('.item-name').textContent.toLowerCase();
                const itemDesc = item.querySelector('.item-description')?.textContent.toLowerCase() || '';
                const isVisible = itemName.includes(searchTerm) || itemDesc.includes(searchTerm);
                item.style.display = isVisible ? 'block' : 'none';
            });
        });
    </script>
    ` : ''}
</body>
</html>
  `;
};

const downloadFile = (content: string, filename: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};