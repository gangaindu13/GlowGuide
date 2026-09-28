import React from 'react';
import {
  Sparkles,
  MessageCircleHeart,
  ClipboardList,
  Sparkle,
  BookOpen,
  Heart,
  Layers,
  HelpCircle,
  User,
  ShieldCheck,
  Bot,
} from 'lucide-react';
import { UserProfile } from '../types';

export type ActiveTab =
  | 'quiz'
  | 'routine'
  | 'products'
  | 'concerns'
  | 'pantry'
  | 'ingredients'
  | 'profile';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedRoutineCount: number;
  userProfile: UserProfile;
  onNewConsultation: () => void;
  onOpenChatbot?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedRoutineCount,
  userProfile,
  onNewConsultation,
  onOpenChatbot,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-rose-100/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top Affirmation Bar */}
        <div className="py-1.5 border-b border-rose-100/50 flex items-center justify-between text-[11px] sm:text-xs text-rose-900/80">
          <div className="flex items-center gap-1.5">
            <span className="inline-block text-rose-400">✨</span>
            <span className="font-medium">Warm, non-judgmental skin & hair care guidance</span>
            <span className="hidden md:inline text-rose-300">·</span>
            <span className="hidden md:inline text-rose-700/70">Always remember to patch-test new products!</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('profile')}
              className="text-rose-700 hover:text-rose-950 font-medium flex items-center gap-1 transition-colors"
            >
              <User className="w-3 h-3 text-rose-500" />
              <span>{userProfile.name ? `Profile: ${userProfile.name}` : 'My Profile'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={onNewConsultation}
              className="hover:text-rose-950 font-medium text-stone-500 hover:text-rose-900 transition-colors"
            >
              Reset Session
            </button>
          </div>
        </div>

        {/* Main Nav */}
        <div className="py-3 sm:py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveTab('quiz')}
              className="text-left flex items-center gap-2.5 group focus-visible:outline-hidden cursor-pointer"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-rose-400 via-rose-300 to-amber-200 flex items-center justify-center text-white shadow-sm shadow-rose-200/50 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 text-white drop-shadow-xs" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-[#331E24]">
                    GlowGuide AI
                  </span>
                  <span className="text-[11px] text-rose-500 font-serif italic">✨ Assistant</span>
                </div>
                <p className="text-[11px] text-[#6B4B52] -mt-0.5">
                  Gentle skin & hair care routines
                </p>
              </div>
            </button>

            {/* Mobile quick profile & routine shortcuts */}
            <div className="md:hidden flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('profile')}
                className="text-xs text-rose-900 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-medium"
              >
                <User className="w-3.5 h-3.5 text-rose-500" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('routine')}
                className="text-xs text-rose-900 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-lg flex items-center gap-1 font-medium"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Routine</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="flex items-center gap-1 p-1 bg-stone-100/70 rounded-xl border border-stone-200/60 overflow-x-auto text-xs scrollbar-none">
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-white text-rose-950 shadow-xs border border-rose-100/80'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Sparkle className="w-3.5 h-3.5 text-rose-400" />
              <span>Glow Quiz</span>
            </button>

            <button
              onClick={() => setActiveTab('routine')}
              className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'routine'
                  ? 'bg-white text-rose-950 shadow-xs border border-rose-100/80'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5 text-rose-500" />
              <span>Routine</span>
              {savedRoutineCount > 0 && (
                <span className="text-[10px] bg-rose-500 text-white font-semibold rounded-full px-1.5 py-0.2">
                  {savedRoutineCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-white text-rose-950 shadow-xs border border-rose-100/80'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Product Types</span>
            </button>

            <button
              onClick={() => setActiveTab('concerns')}
              className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'concerns'
                  ? 'bg-white text-rose-950 shadow-xs border border-rose-100/80'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Concerns</span>
            </button>

            <button
              onClick={() => setActiveTab('pantry')}
              className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'pantry'
                  ? 'bg-white text-rose-950 shadow-xs border border-rose-100/80'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <span>🧴</span>
              <span>Pantry</span>
            </button>

            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ingredients'
                  ? 'bg-white text-rose-950 shadow-xs border border-rose-100/80'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-rose-500" />
              <span>Ingredients</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-rose-500 text-white shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>

            {onOpenChatbot && (
              <button
                onClick={onOpenChatbot}
                className="px-2.5 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/90 shadow-2xs"
                title="Chat with n8n AI Chatbot"
              >
                <Bot className="w-3.5 h-3.5 text-rose-600" />
                <span>AI Chatbot</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

