import React, { useState } from 'react';
import { PRODUCT_CATEGORIES } from '../data/beautyData';
import { ProductCategoryRecommendation, UserProfile } from '../types';
import { ProductSticker } from './ProductSticker';
import {
  Sparkles,
  ShieldCheck,
  Check,
  Plus,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface Props {
  userProfile: UserProfile;
  onAddToRoutine: (category: ProductCategoryRecommendation) => void;
  onOpenProfile: () => void;
}

export const ProductRecommenderView: React.FC<Props> = ({
  userProfile,
  onAddToRoutine,
  onOpenProfile,
}) => {
  const [filterMode, setFilterMode] = useState<'profile' | 'all' | 'skin' | 'hair'>('profile');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter recommendations based on user profile or manual mode
  const filteredProducts = PRODUCT_CATEGORIES.filter((item) => {
    if (filterMode === 'all') return true;
    if (filterMode === 'skin') return item.targetArea === 'skin';
    if (filterMode === 'hair') return item.targetArea === 'hair';

    // 'profile' mode: match user's skin type, hair texture, or selected concerns
    if (item.targetArea === 'skin') {
      const matchesSkin = item.bestForSkinType?.some(
        (st) =>
          st.toLowerCase() === userProfile.skinType.toLowerCase() ||
          userProfile.skinType.toLowerCase().includes(st.toLowerCase()) ||
          st === 'All'
      );
      const matchesConcerns = item.bestForConcerns.some((c) =>
        userProfile.concerns.some(
          (userC) =>
            userC.toLowerCase().includes(c.toLowerCase()) ||
            c.toLowerCase().includes(userC.toLowerCase())
        )
      );
      return matchesSkin || matchesConcerns;
    } else {
      const matchesHair = item.bestForHairType?.some(
        (ht) =>
          userProfile.hairTexture.toLowerCase().includes(ht.toLowerCase()) ||
          userProfile.scalpType.toLowerCase().includes(ht.toLowerCase()) ||
          ht === 'All Hair Types' ||
          ht === 'All'
      );
      const matchesConcerns = item.bestForConcerns.some((c) =>
        userProfile.concerns.some(
          (userC) =>
            userC.toLowerCase().includes(c.toLowerCase()) ||
            c.toLowerCase().includes(userC.toLowerCase())
        )
      );
      return matchesHair || matchesConcerns;
    }
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Editorial Header */}
      <div className="text-center space-y-3 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200/60 shadow-xs">
          <span>🧴 Unbiased & 100% Brand-Free Beauty Types</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#331E24]">
          Product Categories Guide
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
          Pick products by <strong>what your skin & hair actually need</strong>, not by expensive marketing hype! Clear situations, cute visual guides, and label tips. 💖
        </p>
      </div>

      {/* Golden Patch-Testing Reminder Banner */}
      <div className="bg-gradient-to-r from-amber-50/90 via-rose-50/70 to-amber-50/60 border border-amber-200/80 rounded-3xl p-5 shadow-xs flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
        </div>
        <div className="space-y-1.5 text-xs text-amber-950 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm sm:text-base text-amber-900">
              Golden Patch-Test Rule 🌟
            </span>
            <span className="text-[10px] bg-amber-200/70 text-amber-900 font-semibold px-2 py-0.5 rounded-full">
              Safe Routine Habit
            </span>
          </div>
          <p className="text-stone-700 leading-relaxed text-[11px] sm:text-xs">
            Always dab a pea-sized amount inside your inner wrist or behind your ear for 24 hours before trying any new bottle. If calm with zero redness, you’re ready to glow! ✨
          </p>
        </div>
      </div>

      {/* Profile Bar & Filters */}
      <div className="bg-white rounded-3xl border border-rose-100/90 p-4 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs">
            <span className="text-stone-500">Tailoring for: </span>
            <strong className="text-rose-950">{userProfile.name || 'You'}</strong>
            <span className="text-stone-400 mx-1">·</span>
            <span className="text-rose-800 font-medium">
              {userProfile.skinType} Skin & {userProfile.hairTexture} Hair
            </span>
          </div>
        </div>

        {/* Filter Switcher */}
        <div className="flex flex-wrap items-center gap-2 text-xs w-full md:w-auto justify-between md:justify-end">
          <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200/70 font-medium">
            <button
              onClick={() => setFilterMode('profile')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'profile'
                  ? 'bg-white text-rose-950 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              💖 For My Profile
            </button>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setFilterMode('skin')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'skin'
                  ? 'bg-white text-rose-950 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🌸 Skin
            </button>
            <button
              onClick={() => setFilterMode('hair')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterMode === 'hair'
                  ? 'bg-white text-purple-950 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              💆‍♀️ Hair
            </button>
          </div>

          <button
            onClick={onOpenProfile}
            className="text-xs font-medium text-rose-700 hover:text-rose-900 bg-rose-50 border border-rose-200/80 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            Adjust Profile
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProducts.length === 0 ? (
          <div className="col-span-2 text-center py-10 bg-white rounded-3xl border border-rose-100 p-8 space-y-3">
            <p className="text-stone-500 text-sm">No items match this filter.</p>
            <button
              onClick={() => setFilterMode('all')}
              className="px-4 py-2 bg-rose-500 text-white text-xs font-medium rounded-xl hover:bg-rose-600 cursor-pointer"
            >
              View All Product Types
            </button>
          </div>
        ) : (
          filteredProducts.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-rose-100/90 shadow-xs hover:border-rose-300 hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  {/* Card Header with Sticker Illustration */}
                  <div className="flex items-start gap-4">
                    <ProductSticker type={item.stickerType} size="md" />

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">
                          {item.targetArea === 'skin' ? '🌸 Skin' : '💆‍♀️ Hair'}
                        </span>
                        {item.pillBadge && (
                          <span className="text-[10px] font-medium text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                            {item.pillBadge}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif font-bold text-base sm:text-lg text-[#331E24] leading-snug">
                        {item.categoryName}
                      </h3>
                    </div>
                  </div>

                  {/* Situation Callout: Simple, Instant Understanding */}
                  {item.situation && (
                    <div className="p-2.5 rounded-2xl bg-amber-50/50 border border-amber-200/50 text-xs text-amber-950 flex items-start gap-2">
                      <span className="font-bold shrink-0 text-amber-700">👉 Situation:</span>
                      <p className="leading-relaxed text-stone-700 font-medium">
                        {item.situation}
                      </p>
                    </div>
                  )}

                  {/* Quick Benefit */}
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {item.quickBenefit || item.whyItHelps}
                  </p>

                  {/* Quick Label Tips */}
                  <div className="space-y-1 p-2.5 bg-stone-50/70 rounded-xl border border-stone-200/60 text-xs">
                    <span className="text-[10px] font-bold text-stone-900 uppercase tracking-wider block">
                      Label Checklist:
                    </span>
                    <ul className="space-y-1 text-stone-600 text-[11px]">
                      {item.whatToLookFor.slice(0, 2).map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Avoid / Skip warning */}
                  {item.avoidIfPossible && item.avoidIfPossible.length > 0 && (
                    <div className="text-[11px] text-stone-600 flex items-start gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-rose-950 font-medium">Skip: </strong>
                        {item.avoidIfPossible.join(', ')}
                      </span>
                    </div>
                  )}

                  {/* Collapsible How-To & Texture */}
                  {isExpanded && (
                    <div className="space-y-2 pt-2 border-t border-rose-100 text-xs text-stone-600 animate-fade-in">
                      <div className="flex items-start gap-1.5">
                        <strong className="text-rose-950 text-[11px] shrink-0">Texture:</strong>
                        <span className="text-[11px]">{item.textureGuide}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <strong className="text-rose-950 text-[11px] shrink-0">How to Use:</strong>
                        <span className="text-[11px]">{item.howToUse}</span>
                      </div>
                      <div className="p-2 bg-rose-50/50 rounded-xl text-[10px] text-rose-900 italic">
                        {item.patchTestTip}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Bar */}
                <div className="pt-3 border-t border-rose-100/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="text-[11px] text-stone-500 hover:text-stone-800 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less info' : 'Texture & details'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3 h-3" />
                    ) : (
                      <ChevronDown className="w-3 h-3" />
                    )}
                  </button>

                  <button
                    onClick={() => onAddToRoutine(item)}
                    className="text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 px-3.5 py-1.5 rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Routine</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
