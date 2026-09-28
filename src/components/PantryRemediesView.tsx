import React, { useState } from 'react';
import { PANTRY_REMEDIES } from '../data/beautyData';
import { RemedyItem } from '../types';
import { Sparkles, Clock, ShieldCheck, Heart, Plus } from 'lucide-react';

interface Props {
  onAddToRoutineExtraCare?: (remedy: RemedyItem) => void;
}

export const PantryRemediesView: React.FC<Props> = ({ onAddToRoutineExtraCare }) => {
  const [filter, setFilter] = useState<'all' | 'skin' | 'hair'>('all');

  const filteredRemedies = PANTRY_REMEDIES.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Intro Header */}
      <div className="text-center space-y-3 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200/60 shadow-xs">
          <span>🧴 Gentle, Safe & Kitchen-Fresh Beauty</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#331E24]">
          Pantry Secrets & DIY Care
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
          Nourish your skin and hair using gentle ingredients from your kitchen. No harsh fragrances, zero micro-tears, and always tested with kindness! 🍯
        </p>

        {/* Filter Tabs */}
        <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200/70 text-xs font-medium">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Remedies ({PANTRY_REMEDIES.length})
          </button>
          <button
            onClick={() => setFilter('skin')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              filter === 'skin'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            🌸 Skin Masks
          </button>
          <button
            onClick={() => setFilter('hair')}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              filter === 'hair'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            💆‍♀️ Hair & Scalp Elixirs
          </button>
        </div>
      </div>

      {/* Grid of Remedies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRemedies.map((remedy) => (
          <div
            key={remedy.id}
            className="bg-white rounded-3xl border border-rose-100/90 shadow-sm p-6 sm:p-7 space-y-5 flex flex-col justify-between hover:border-rose-200 transition-all hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-600">
                    {remedy.category === 'skin' ? '🌸 Skin Care Mask' : '💆‍♀️ Hair Care Rinse'}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-[#331E24] mt-0.5">
                    {remedy.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-stone-500 bg-stone-50 border border-stone-200/60 px-2.5 py-1 rounded-full shrink-0">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{remedy.timeNeeded}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic">
                "{remedy.tagline}"
              </p>

              {/* Ingredients List */}
              <div className="space-y-1.5 p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100/60">
                <span className="text-xs font-bold text-rose-950 uppercase tracking-wide">
                  What You'll Need:
                </span>
                <ul className="text-xs text-stone-700 space-y-1">
                  {remedy.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-rose-400 font-bold">·</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Easy Steps:
                </span>
                <ol className="text-xs text-stone-600 space-y-1.5 list-decimal pl-4">
                  {remedy.instructions.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Patch Test Advisory */}
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 flex items-start gap-2 text-xs text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Skin Safe Note:</strong> {remedy.patchTestTip}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-rose-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">100% natural & gentle</span>
              {onAddToRoutineExtraCare && (
                <button
                  onClick={() => onAddToRoutineExtraCare(remedy)}
                  className="text-xs font-medium text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-rose-500" />
                  <span>Add to Weekly Care</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
