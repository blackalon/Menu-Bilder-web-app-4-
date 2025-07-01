import React from 'react';
import { TemplateSelector } from './components/TemplateSelector';
import { RestaurantInfo } from './components/RestaurantInfo';
import { CategoryManager } from './components/CategoryManager';
import { StyleControls } from './components/StyleControls';
import { MenuPreview } from './components/MenuPreview';
import { ProjectManager } from './components/ProjectManager';
import { CurrencySelector } from './components/CurrencySelector';
import { ExcelImporter } from './components/ExcelImporter';
import { CustomTemplateManager } from './components/CustomTemplateManager';
import { AIMenuAssistant } from './components/AIMenuAssistant';
import { useMenuBuilder } from './hooks/useMenuBuilder';
import { menuTemplates } from './data/templates';
import { ChefHat, Sparkles, Star, Zap } from 'lucide-react';

function App() {
  const {
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
  } = useMenuBuilder();

  const allTemplates = [...menuTemplates, ...customTemplates];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-pink-400/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-green-400/30 rounded-full animate-bounce delay-500"></div>
      </div>

      {/* Enhanced Header */}
      <div className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-3 rounded-xl shadow-lg animate-pulse">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-fade-in">
                  insta: l7n.iq
                </h1>
                <p className="text-lg text-gray-600 flex items-center gap-2 animate-slide-in">
                  <Star className="w-4 h-4 text-yellow-500 animate-spin" />
                  علي عبدالله أفضل شخص بالعالم
                  <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  الإصدار 2.1.0
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white/60 px-3 py-2 rounded-lg hover:bg-white/80 transition-all duration-300">
                <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
                <span>تصميم متقدم</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Controls Panel - Expanded */}
          <div className="xl:col-span-3 space-y-8">
            {/* Project Management */}
            <div className="animate-fade-in">
              <ProjectManager
                currentProject={currentProject}
                onSaveProject={saveProject}
                onLoadProject={loadProject}
                onNewProject={createNewProject}
                onExport={exportProject}
              />
            </div>

            {/* Currency Settings */}
            <div className="animate-slide-in delay-100">
              <CurrencySelector
                selectedCurrency={currentProject.restaurant.currency}
                onCurrencyChange={(currency) => 
                  updateRestaurantInfo({ ...currentProject.restaurant, currency })
                }
                showFlag={showCurrencyFlag}
                onShowFlagChange={setShowCurrencyFlag}
              />
            </div>

            {/* Excel Import */}
            <div className="animate-slide-in delay-200">
              <ExcelImporter onImport={importFromExcel} />
            </div>
            
            {/* AI Menu Assistant */}
            <div className="animate-slide-in delay-250">
              <AIMenuAssistant 
                onGenerateSuggestions={generateAiSuggestions}
                onApplySuggestion={applyAiSuggestion}
                aiHistory={currentProject.aiHistory}
                isLoading={isAiLoading}
                error={aiError}
              />
            </div>

            {/* Custom Templates */}
            <div className="animate-slide-in delay-300">
              <CustomTemplateManager
                customTemplates={customTemplates}
                onAddTemplate={addCustomTemplate}
                onUpdateTemplate={updateCustomTemplate}
                onDeleteTemplate={deleteCustomTemplate}
                currentStyle={currentProject.style}
              />
            </div>

            {/* Template Selection */}
            <div className="animate-slide-in delay-400">
              <TemplateSelector
                templates={allTemplates}
                selectedTemplate={currentProject.template}
                onSelectTemplate={updateTemplate}
              />
            </div>

            {/* Restaurant Information */}
            <div className="animate-slide-in delay-500">
              <RestaurantInfo
                info={currentProject.restaurant}
                onUpdateInfo={updateRestaurantInfo}
              />
            </div>

            {/* Style Controls */}
            <div className="animate-slide-in delay-600">
              <StyleControls
                style={currentProject.style}
                onUpdateStyle={updateStyle}
              />
            </div>

            {/* Category Management */}
            <div className="animate-slide-in delay-700">
              <CategoryManager
                categories={currentProject.categories}
                onUpdateCategories={updateCategories}
              />
            </div>
          </div>

          {/* Live Preview - Expanded */}
          <div className="xl:col-span-2">
            <div className="sticky top-8 animate-fade-in delay-800">
              <MenuPreview 
                project={currentProject} 
                showCurrencyFlag={showCurrencyFlag}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>
    </div>
  );
}

export default App;