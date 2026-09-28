import React, { useState } from 'react';
import { COMMON_CONCERNS } from '../data/beautyData';
import { CommonConcern } from '../types';
import {
  Sparkles,
  Heart,
  AlertCircle,
  HelpCircle,
  Plus,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Search,
  Layers,
} from 'lucide-react';

interface Props {
  onAddTipsToRoutine?: (concern: CommonConcern) => void;
  onExploreProductCategory?: (keyword?: string) => void;
}

export const CommonConcernsView: React.FC<Props> = ({
  onAddTipsToRoutine,
  onExploreProductCategory,
}) => {
  const [filter, setFilter] = useState<'all' | 'skin' | 'hair'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredConcerns = COMMON_CONCERNS.filter((c) => {
    const matchesCategory = filter === 'all' || c.category === filter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Hero Header */}
      <div className="text-center space-y-3 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200/60 shadow-xs">
          <span>🌸 Safe, Reassuring & Zero-Judgment Guidance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#331E24]">
          Common Concerns Library
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
          Breakouts, flakes, frizz, and shedding happen to every girl! Here are friendly, easy-to-understand explanations and simple home care tips so you can care for your skin and hair with confidence. 💖
        </p>

        {/* Filter Controls & Search */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="inline-flex p-1 bg-stone-100/80 rounded-xl border border-stone-200/70 text-xs font-medium">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                filter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Concerns ({COMMON_CONCERNS.length})
            </button>
            <button
              onClick={() => setFilter('skin')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                filter === 'skin'
                  ? 'bg-white text-rose-950 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              🌸 Skin Concerns
            </button>
            <button
              onClick={() => setFilter('hair')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                filter === 'hair'
                  ? 'bg-white text-purple-950 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              💆‍♀️ Hair & Scalp
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concerns (acne, frizz...)"
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-hidden focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Concerns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredConcerns.map((concern) => {
          const isExpanded = expandedId === concern.id;

          return (
            <div
              key={concern.id}
              className="bg-white rounded-3xl border border-rose-100/90 shadow-sm p-6 sm:p-7 space-y-5 flex flex-col justify-between hover:border-rose-300 transition-all hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Header of card */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-2xl bg-rose-50 border border-rose-100">
                      {concern.emoji}
                    </span>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600">
                        {concern.category === 'skin' ? 'Skin Concern' : 'Hair & Scalp Concern'}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-[#331E24]">
                        {concern.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] text-rose-800 bg-rose-50 font-medium px-2.5 py-0.5 rounded-full border border-rose-100 shrink-0">
                    Gentle Care
                  </span>
                </div>

                {/* Short friendly situation explanation */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-amber-50/40 border border-amber-200/50">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wide">
                      What's Happening:
                    </span>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : concern.id)}
                      className="text-[10px] text-stone-500 hover:text-stone-800 underline cursor-pointer"
                    >
                      {isExpanded ? 'Less science' : 'Why it happens'}
                    </button>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {concern.shortSummary}
                  </p>
                  {isExpanded && (
                    <p className="text-xs text-stone-600 leading-relaxed pt-1.5 border-t border-amber-200/40">
                      {concern.explanation}
                    </p>
                  )}
                </div>

                {/* 2-3 Actionable Tips */}
                <div className="space-y-2 p-4 bg-stone-50/70 rounded-2xl border border-stone-200/60">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>3 Actionable Home Care Tips:</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {concern.actionableTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-snug">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gentle Kitchen/Home Remedy */}
                <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100/70 space-y-1">
                  <div className="text-[11px] font-bold text-rose-900 uppercase tracking-wide flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                    <span>Gentle Home Ritual</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{concern.gentleHomeRemedy}"
                  </p>
                </div>

                {/* Mandatory Gentle Dermatologist Disclaimer */}
                <div className="p-3 bg-rose-50/60 border border-rose-200/70 rounded-xl flex items-start gap-2 text-[11px] text-rose-900 leading-relaxed">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <p>{concern.dermatologistDisclaimer}</p>
                </div>

                {/* Helpful category tags */}
                {concern.recommendedCategoryKeywords.length > 0 && (
                  <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="text-stone-400 font-medium">Helpful product types:</span>
                    {concern.recommendedCategoryKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-rose-100 flex flex-wrap items-center justify-between gap-2">
                {onExploreProductCategory && (
                  <button
                    onClick={() => onExploreProductCategory(concern.recommendedCategoryKeywords[0])}
                    className="text-xs font-medium text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5 text-rose-500" />
                    <span>View Product Types</span>
                  </button>
                )}
                {onAddTipsToRoutine && (
                  <button
                    onClick={() => onAddTipsToRoutine(concern)}
                    className="text-xs font-medium text-white bg-rose-500 hover:bg-rose-600 px-3.5 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Care Tips to Routine</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
