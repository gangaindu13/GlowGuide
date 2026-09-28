import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  SKIN_TYPE_CHOICES,
  HAIR_TEXTURE_CHOICES,
  SCALP_TYPE_CHOICES,
  CONCERN_OPTIONS,
  POPULAR_INGREDIENTS,
  INGREDIENT_AVOID_OPTIONS,
} from '../data/beautyData';
import {
  User,
  Sparkles,
  Save,
  Check,
  Plus,
  X,
  Heart,
  Droplets,
  Wind,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';

interface Props {
  profile: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
  onConsultWithProfile: (profile: UserProfile) => void;
}

export const UserProfileView: React.FC<Props> = ({
  profile,
  onSaveProfile,
  onConsultWithProfile,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [customConcern, setCustomConcern] = useState('');
  const [customPreferred, setCustomPreferred] = useState('');
  const [customAvoid, setCustomAvoid] = useState('');
  const [justSaved, setJustSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...formData, updatedAt: new Date().toISOString() };
    onSaveProfile(updated);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2500);
  };

  const toggleArrayItem = (field: 'concerns' | 'preferredIngredients' | 'ingredientsToAvoid', item: string) => {
    setFormData((prev) => {
      const exists = prev[field].includes(item);
      if (exists) {
        return { ...prev, [field]: prev[field].filter((x) => x !== item) };
      } else {
        return { ...prev, [field]: [...prev[field], item] };
      }
    });
  };

  const addCustomItem = (field: 'concerns' | 'preferredIngredients' | 'ingredientsToAvoid', val: string, setVal: (v: string) => void) => {
    const trimmed = val.trim();
    if (!trimmed || formData[field].includes(trimmed)) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], trimmed],
    }));
    setVal('');
  };

  const removeArrayItem = (field: 'concerns' | 'preferredIngredients' | 'ingredientsToAvoid', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((x) => x !== item),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Editorial Header */}
      <div className="text-center space-y-3 px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200/60 shadow-xs">
          <span>💖 Your Personal Beauty Dossier</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#331E24]">
          My Glow Profile
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
          Save your identified skin type, hair texture, common concerns, and ingredient likes/dislikes. GlowGuide AI automatically remembers this profile during all future chats to tailor routines just for you! ✨
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card 1: Identity & Skin */}
        <div className="bg-white rounded-3xl border border-rose-100/90 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-rose-100">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🌸</span>
              <h2 className="font-serif font-bold text-lg text-rose-950">
                1. Basic Info & Skin Type
              </h2>
            </div>
            <span className="text-xs text-stone-400">Stored privately in your browser</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Your Preferred Name / Nickname
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Maya, Sophie..."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:border-rose-400 focus:ring-2 focus:ring-rose-100 bg-[#FFFDFB]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
                Local Climate & Lifestyle Notes
              </label>
              <input
                type="text"
                value={formData.climateNotes || ''}
                onChange={(e) => setFormData({ ...formData, climateNotes: e.target.value })}
                placeholder="e.g. Humid summers, wears hijab, air-conditioned office..."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:border-rose-400 focus:ring-2 focus:ring-rose-100 bg-[#FFFDFB]"
              />
            </div>
          </div>

          {/* Skin Type Selector */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
              Identified Skin Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SKIN_TYPE_CHOICES.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, skinType: type })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    formData.skinType === type
                      ? 'border-rose-400 bg-rose-50 text-rose-950 shadow-xs'
                      : 'border-stone-200/80 hover:border-rose-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>{type}</span>
                  {formData.skinType === type && (
                    <Check className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Card 2: Hair & Scalp Type */}
        <div className="bg-white rounded-3xl border border-rose-100/90 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-rose-100">
            <span className="text-xl">💆‍♀️</span>
            <h2 className="font-serif font-bold text-lg text-rose-950">
              2. Hair Texture & Scalp Characteristics
            </h2>
          </div>

          {/* Hair Texture */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
              Hair Texture Pattern
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {HAIR_TEXTURE_CHOICES.map((texture) => (
                <button
                  type="button"
                  key={texture}
                  onClick={() => setFormData({ ...formData, hairTexture: texture })}
                  className={`p-3 rounded-xl border text-center text-xs font-medium transition-all ${
                    formData.hairTexture === texture
                      ? 'border-purple-400 bg-purple-50 text-purple-950 shadow-xs'
                      : 'border-stone-200/80 hover:border-purple-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div>{texture}</div>
                  {formData.hairTexture === texture && (
                    <span className="inline-block mt-1 text-[10px] text-purple-600 font-bold">
                      ✓ Selected
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Scalp Oiliness / Dryness */}
          <div className="space-y-2 pt-2 border-t border-rose-100/60">
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wide">
              Scalp Behavior
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SCALP_TYPE_CHOICES.map((scalp) => (
                <button
                  type="button"
                  key={scalp}
                  onClick={() => setFormData({ ...formData, scalpType: scalp })}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    formData.scalpType === scalp
                      ? 'border-purple-400 bg-purple-50 text-purple-950 shadow-xs'
                      : 'border-stone-200/80 hover:border-purple-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>{scalp}</span>
                  {formData.scalpType === scalp && (
                    <Check className="w-3.5 h-3.5 text-purple-600 stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Card 3: Common Concerns */}
        <div className="bg-white rounded-3xl border border-rose-100/90 shadow-sm overflow-hidden p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">✨</span>
              <h2 className="font-serif font-bold text-lg text-rose-950">
                3. My Primary Concerns
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {formData.concerns.length} selected
            </span>
          </div>

          <p className="text-xs text-stone-500">
            Select the issues you want GlowGuide to actively keep in mind when recommending products and daily steps:
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {CONCERN_OPTIONS.map((concern) => {
              const isSelected = formData.concerns.includes(concern);
              return (
                <button
                  type="button"
                  key={concern}
                  onClick={() => toggleArrayItem('concerns', concern)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{concern}</span>
                </button>
              );
            })}
          </div>

          {/* Custom concern input */}
          <div className="pt-2 flex items-center gap-2">
            <input
              type="text"
              value={customConcern}
              onChange={(e) => setCustomConcern(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addCustomItem('concerns', customConcern, setCustomConcern);
                }
              }}
              placeholder="Add another concern (e.g. 'Chin congestion')..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50"
            />
            <button
              type="button"
              onClick={() => addCustomItem('concerns', customConcern, setCustomConcern)}
              className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-medium flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Profile Card 4: Ingredient Preferences & Avoid List */}
        <div className="bg-white rounded-3xl border border-rose-100/90 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-rose-100">
            <span className="text-xl">🌿</span>
            <h2 className="font-serif font-bold text-lg text-rose-950">
              4. Ingredient Preferences & Triggers to Avoid
            </h2>
          </div>

          {/* Loved Ingredients */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
              <span>💖 Ingredients You Love / Prefer:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {POPULAR_INGREDIENTS.map((ing) => {
                const isSelected = formData.preferredIngredients.includes(ing);
                return (
                  <button
                    type="button"
                    key={ing}
                    onClick={() => toggleArrayItem('preferredIngredients', ing)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-950 border border-emerald-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{ing}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom preferred */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customPreferred}
                onChange={(e) => setCustomPreferred(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomItem('preferredIngredients', customPreferred, setCustomPreferred);
                  }
                }}
                placeholder="Add other ingredient (e.g. 'Propolis', 'Mugwort')..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50"
              />
              <button
                type="button"
                onClick={() => addCustomItem('preferredIngredients', customPreferred, setCustomPreferred)}
                className="px-3 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-medium flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Ingredients to Avoid */}
          <div className="space-y-3 pt-4 border-t border-rose-100/60">
            <label className="block text-xs font-semibold text-rose-800 uppercase tracking-wide flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>🚫 Ingredients You Prefer to Avoid / Sensitivities:</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {INGREDIENT_AVOID_OPTIONS.map((item) => {
                const isSelected = formData.ingredientsToAvoid.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleArrayItem('ingredientsToAvoid', item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-rose-700 text-white shadow-xs'
                        : 'bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200/60'
                    }`}
                  >
                    {isSelected ? <X className="w-3 h-3 stroke-[3]" /> : null}
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom Avoid */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customAvoid}
                onChange={(e) => setCustomAvoid(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addCustomItem('ingredientsToAvoid', customAvoid, setCustomAvoid);
                  }
                }}
                placeholder="Add sensitivity (e.g. 'Lavender oil', 'Benzoyl peroxide')..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/50"
              />
              <button
                type="button"
                onClick={() => addCustomItem('ingredientsToAvoid', customAvoid, setCustomAvoid)}
                className="px-3 py-2 bg-rose-100 hover:bg-rose-200 text-rose-900 rounded-xl text-xs font-medium flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button Bar */}
        <div className="bg-gradient-to-r from-rose-50 via-[#FFF5F6] to-amber-50 p-6 rounded-3xl border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="font-serif font-bold text-base text-rose-950">
              Save & Synchronize My Profile
            </h4>
            <p className="text-xs text-stone-500">
              All future GlowGuide AI sessions will tailor routines strictly around these settings!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              {justSaved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Profile Saved! ✨</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onConsultWithProfile(formData)}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Generate Routine & Products ✨</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
