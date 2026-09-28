import React, { useState } from 'react';
import { INGREDIENT_GLOSSARY } from '../data/beautyData';
import { Search, Sparkles, BookOpen, Heart, ArrowUpRight } from 'lucide-react';

interface Props {
  onAddToFavorites?: (name: string) => void;
}

export const IngredientsView: React.FC<Props> = ({ onAddToFavorites }) => {
  const [search, setSearch] = useState('');

  const filtered = INGREDIENT_GLOSSARY.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.bestFor.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="text-center space-y-3 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200/60 shadow-xs">
          <span>🌿 Decoding Beauty Actives With Zero Stress</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#331E24]">
          Girl-Friendly Ingredient Guide
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
          Ever get confused by chemical names on skincare bottles? Here are the most beloved gentle ingredients, explained simply so you feel confident choosing what touches your skin! ✨
        </p>

        {/* Search Input */}
        <div className="max-w-md mx-auto relative pt-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search e.g. 'Niacinamide', 'Pores', 'Rosemary'..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-stone-200 focus:outline-hidden focus:border-rose-400 focus:ring-2 focus:ring-rose-100 bg-white"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 mt-1" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-rose-100/90 shadow-sm p-5 space-y-3.5 hover:border-rose-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                  {item.role}
                </span>
                <span className="text-[11px] font-medium text-stone-500">
                  {item.gentleLevel}
                </span>
              </div>

              <h3 className="font-serif font-bold text-lg text-rose-950">
                {item.name}
              </h3>

              <div className="text-xs text-rose-900/80 font-medium bg-rose-50/40 p-2 rounded-xl border border-rose-100/50">
                <span>Best For: </span>
                <span className="text-stone-700">{item.bestFor}</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {onAddToFavorites && (
              <button
                onClick={() => onAddToFavorites(item.name)}
                className="w-full text-xs font-medium text-rose-700 hover:text-rose-950 bg-stone-50 hover:bg-rose-50 border border-stone-200/80 hover:border-rose-200 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
                <span>Save to Favorite Ingredients</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
