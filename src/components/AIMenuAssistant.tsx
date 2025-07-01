import React, { useState, useRef, useEffect } from 'react';
import { AIMenuSuggestion, AIPromptHistory } from '../types/menu';
import { Sparkles, Brain, Lightbulb, Check, X, ChevronDown, ChevronUp, Loader2, Send, MessageSquare } from 'lucide-react';

interface AIMenuAssistantProps {
  onGenerateSuggestions: (prompt: string) => Promise<AIPromptHistory>;
  onApplySuggestion: (suggestionId: string) => void;
  aiHistory?: AIPromptHistory[];
  isLoading: boolean;
  error: string | null;
}

export const AIMenuAssistant: React.FC<AIMenuAssistantProps> = ({
  onGenerateSuggestions,
  onApplySuggestion,
  aiHistory = [],
  isLoading,
  error
}) => {
  const [prompt, setPrompt] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedHistory, setExpandedHistory] = useState<string[]>([]);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [aiHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    try {
      await onGenerateSuggestions(prompt);
      setPrompt('');
    } catch (err) {
      console.error('Error generating suggestions:', err);
    }
  };

  const toggleHistoryItem = (id: string) => {
    setExpandedHistory(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderSuggestion = (suggestion: AIMenuSuggestion) => {
    const suggestionTypeIcons = {
      'category': <div className="p-1 rounded-full bg-green-100 text-green-600"><Lightbulb size={16} /></div>,
      'item': <div className="p-1 rounded-full bg-blue-100 text-blue-600"><Lightbulb size={16} /></div>,
      'style': <div className="p-1 rounded-full bg-purple-100 text-purple-600"><Lightbulb size={16} /></div>,
      'template': <div className="p-1 rounded-full bg-orange-100 text-orange-600"><Lightbulb size={16} /></div>,
    };

    return (
      <div 
        key={suggestion.id}
        className={suggestion.applied ? 'ai-suggestion-applied' : 'ai-suggestion'}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {suggestionTypeIcons[suggestion.type]}
            <span className="font-medium text-gray-800">{suggestion.name}</span>
          </div>
          {!suggestion.applied ? (
            <button
              onClick={() => onApplySuggestion(suggestion.id)}
              className="text-xs px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex items-center gap-1"
            >
              <Check size={12} />
              تطبيق
            </button>
          ) : (
            <span className="text-xs px-3 py-1 bg-green-500 text-white rounded-full flex items-center gap-1">
              <Check size={12} />
              تم التطبيق
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{suggestion.description}</p>
      </div>
    );
  };

  return (
    <div className="ai-assistant-container">
      {/* Header */}
      <div 
        className="ai-assistant-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-white font-bold flex items-center gap-2">
                مساعد القائمة الذكي
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              </h3>
              <p className="text-white/80 text-sm">دع الذكاء الاصطناعي يساعدك في إنشاء قائمة طعام مميزة</p>
            </div>
          </div>
          <div className="text-white">
            {isExpanded ? <ChevronUp size={20} className="transition-transform duration-300" /> : <ChevronDown size={20} className="transition-transform duration-300" />}
          </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4">
          {/* Chat History */}
          <div 
            ref={chatContainerRef}
            className="ai-chat-container"
          >
            {aiHistory.length === 0 ? (
              <div className="text-center text-gray-500 py-8 animate-fade-in">
                <div className="text-4xl mb-2 animate-float">✨</div>
                <p className="text-lg font-medium mb-2">أهلاً بك في مساعد القائمة الذكي!</p>
                <p className="text-sm opacity-80">اطلب مني اقتراح أصناف أو فئات أو تصاميم لقائمتك</p>
              </div>
            ) : (
              aiHistory.map((history, index) => (
                <div key={history.id} className={`mb-4 last:mb-0 animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleHistoryItem(history.id)}
                  >
                    <div className="flex items-start gap-2">
                      <div className="bg-gray-100 p-2 rounded-full mt-1 shadow-md">
                        <MessageSquare className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{history.prompt}</p>
                        <p className="text-sm text-gray-500">{new Date(history.createdAt).toLocaleString('ar-SA')}</p>
                      </div>
                    </div>
                    <div>
                      {expandedHistory.includes(history.id) ? (
                        <ChevronUp size={16} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-500" />
                      )}
                    </div>
                  </div>

                  {expandedHistory.includes(history.id) && (
                    <div className="mt-3 pl-8">
                      <div className="flex items-start gap-2">
                        <div className="bg-indigo-100 p-2 rounded-full mt-1">
                          <Brain className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg w-full">
                          <p className="text-gray-800">{history.response}</p>
                          
                          {history.suggestions.length > 0 && (
                            <div className="mt-3">
                              {history.suggestions.map(renderSuggestion)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex items-start gap-2 mt-4">
                <div className="bg-indigo-100 p-2 rounded-full mt-1">
                  <Brain className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg w-full flex items-center justify-center">
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                  <span className="ml-2 text-indigo-600">جاري التفكير...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 mt-4">
                <div className="bg-red-100 p-2 rounded-full mt-1">
                  <X className="w-4 h-4 text-red-600" />
                </div>
                <div className="bg-red-50 p-3 rounded-lg w-full">
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="relative bg-gradient-to-r from-white/50 to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/50 p-1 rounded-lg">
            <textarea
              ref={promptInputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="اطلب من الذكاء الاصطناعي اقتراح أفكار لقائمة الطعام..."
              className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none shadow-inner transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-400"
              rows={3}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className={`absolute bottom-3 left-3 p-2 rounded-full ${!prompt.trim() || isLoading ? 'bg-gray-200 text-gray-500' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95'} transition-colors`}
            >
              <Send size={18} />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
            <div>
              <p>يمكنك طلب اقتراحات لفئات، أطباق، أو تصاميم جديدة</p>
            </div>
            <div>
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">الإصدار 1.0</span>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};