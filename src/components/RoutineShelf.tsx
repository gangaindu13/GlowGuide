import React, { useState } from 'react';
import { RoutineData, RoutineStep } from '../types';
import { ProductSticker, StickerType } from './ProductSticker';
import {
  Sun,
  Moon,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Sparkles,
  Share2,
  Copy,
  Check,
  RotateCcw,
  Heart,
  Droplets,
  Layers,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

function getStickerForCategory(catName: string): StickerType {
  const lower = catName.toLowerCase();
  if (lower.includes('cleanser') || lower.includes('wash')) {
    return lower.includes('cream') || lower.includes('milk') ? 'cream-cleanser' : 'foam-cleanser';
  }
  if (lower.includes('moisturizer') || lower.includes('cream')) {
    return lower.includes('rich') || lower.includes('barrier') ? 'rich-cream' : 'gel-cream';
  }
  if (lower.includes('shampoo')) return 'shampoo-bottle';
  if (lower.includes('sunscreen') || lower.includes('spf')) return 'sunscreen-tube';
  if (lower.includes('serum') || lower.includes('drops') || lower.includes('oil')) return 'dropper-serum';
  if (lower.includes('mask')) return 'hair-mask';
  if (lower.includes('spray') || lower.includes('leave-in')) return 'leave-in-spray';
  if (lower.includes('patch')) return 'pimple-patch';
  return 'gel-cream';
}

interface RoutineShelfProps {
  routine: RoutineData;
  onUpdateRoutine: (updated: RoutineData) => void;
  onOpenProducts?: () => void;
  onOpenQuiz: () => void;
}

export const RoutineShelf: React.FC<RoutineShelfProps> = ({
  routine,
  onUpdateRoutine,
  onOpenProducts,
  onOpenQuiz,
}) => {
  const [activeTab, setActiveTab] = useState<'morning' | 'night'>('morning');
  const [newStepText, setNewStepText] = useState('');
  const [copied, setCopied] = useState(false);

  // Toggle step completion
  const handleToggleStep = (time: 'morning' | 'night', stepId: string) => {
    if (time === 'morning') {
      const updatedSteps = routine.morningSteps.map((s) =>
        s.id === stepId ? { ...s, completed: !s.completed } : s
      );
      onUpdateRoutine({ ...routine, morningSteps: updatedSteps });
    } else {
      const updatedSteps = routine.nightSteps.map((s) =>
        s.id === stepId ? { ...s, completed: !s.completed } : s
      );
      onUpdateRoutine({ ...routine, nightSteps: updatedSteps });
    }
  };

  // Add custom step
  const handleAddStep = (time: 'morning' | 'night') => {
    if (!newStepText.trim()) return;
    const newStep: RoutineStep = {
      id: `custom-${Math.random().toString(36).substring(2, 7)}`,
      title: newStepText.trim(),
      completed: false,
    };
    if (time === 'morning') {
      onUpdateRoutine({ ...routine, morningSteps: [...routine.morningSteps, newStep] });
    } else {
      onUpdateRoutine({ ...routine, nightSteps: [...routine.nightSteps, newStep] });
    }
    setNewStepText('');
  };

  // Remove step
  const handleRemoveStep = (time: 'morning' | 'night', stepId: string) => {
    if (time === 'morning') {
      onUpdateRoutine({
        ...routine,
        morningSteps: routine.morningSteps.filter((s) => s.id !== stepId),
      });
    } else {
      onUpdateRoutine({
        ...routine,
        nightSteps: routine.nightSteps.filter((s) => s.id !== stepId),
      });
    }
  };

  // Reset day's checkboxes
  const handleResetChecklist = () => {
    const resetMorning = routine.morningSteps.map((s) => ({ ...s, completed: false }));
    const resetNight = routine.nightSteps.map((s) => ({ ...s, completed: false }));
    onUpdateRoutine({ ...routine, morningSteps: resetMorning, nightSteps: resetNight });
  };

  // Calculate completion
  const totalSteps = routine.morningSteps.length + routine.nightSteps.length;
  const completedSteps =
    routine.morningSteps.filter((s) => s.completed).length +
    routine.nightSteps.filter((s) => s.completed).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  // Copy routine summary
  const handleCopyRoutine = () => {
    const text = `🌸 My GlowGuide AI Routine 🌸\n\n✨ Skin Type: ${routine.skinType || 'Not specified'}\n✨ Hair Type: ${routine.hairType || 'Not specified'}\n\n☀️ Morning Routine:\n${routine.morningSteps.map((s, i) => `${i + 1}. ${s.title}`).join('\n')}\n\n🌙 Night Routine:\n${routine.nightSteps.map((s, i) => `${i + 1}. ${s.title}`).join('\n')}\n\n🌿 Tips:\n${routine.tips.map((t) => `- ${t}`).join('\n')}\n\n⚠️ Note: General guidance and not a medical diagnosis.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentSteps = activeTab === 'morning' ? routine.morningSteps : routine.nightSteps;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      {/* Top Profile Card */}
      <div className="bg-white rounded-3xl border border-rose-100/90 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Active Beauty Regimen</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#331E24]">
              Daily Glow Checklist
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Check off your steps each morning and evening to stay consistent & confident! 💖
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyRoutine}
              className="text-xs text-stone-700 bg-stone-50 hover:bg-stone-100 border border-stone-200 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Share / Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetChecklist}
              className="text-xs text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
              title="Reset checkmarks for today"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Daily</span>
            </button>
          </div>
        </div>

        {/* Profile Attributes & Glow Meter */}
        <div className="mt-6 pt-6 border-t border-rose-100/70 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-100/80">
            <div className="text-[11px] text-stone-500 uppercase font-semibold tracking-wider">
              Skin Profile
            </div>
            <div className="text-sm font-bold text-rose-950 mt-0.5">
              {routine.skinType || 'Combination / Normal'}
            </div>
          </div>

          <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100/80">
            <div className="text-[11px] text-stone-500 uppercase font-semibold tracking-wider">
              Hair Profile
            </div>
            <div className="text-sm font-bold text-purple-950 mt-0.5">
              {routine.hairType || 'Wavy 2B · Balanced'}
            </div>
          </div>

          {/* Glow Meter */}
          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-100/80">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-stone-500 uppercase font-semibold tracking-wider">
                Today's Glow Meter
              </span>
              <span className="font-bold text-amber-900">{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200/50 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-rose-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recommended Product Types (if present) */}
        {routine.recommendedProducts && routine.recommendedProducts.length > 0 && (
          <div className="mt-6 pt-6 border-t border-rose-100/70 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">💖</span>
                <h3 className="font-serif font-bold text-sm text-rose-950">
                  Recommended Product Types
                </h3>
                <span className="text-[10px] text-rose-700 bg-rose-50 border border-rose-200/60 px-2 py-0.5 rounded-full font-medium">
                  Brand-Free
                </span>
              </div>
              {onOpenProducts && (
                <button
                  onClick={onOpenProducts}
                  className="text-xs text-rose-700 hover:text-rose-900 font-medium flex items-center gap-1 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Browse Category Guide</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {routine.recommendedProducts.map((prod, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 rounded-2xl border border-rose-100 shadow-2xs flex items-center gap-3"
                >
                  <ProductSticker type={getStickerForCategory(prod.category)} size="sm" />
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block truncate">
                      {prod.category}
                    </span>
                    <p className="text-xs text-stone-800 font-medium leading-snug line-clamp-2">
                      {prod.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-amber-800 bg-amber-50/70 border border-amber-200/60 rounded-xl px-3 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                <strong>Patch-Test Reminder:</strong> Always test a dab on your inner wrist for 24–48 hours before full use! ✨
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Routine Checklists */}
      <div className="bg-white rounded-3xl border border-rose-100/90 shadow-sm overflow-hidden">
        {/* Morning / Night Switcher */}
        <div className="flex border-b border-rose-100">
          <button
            onClick={() => setActiveTab('morning')}
            className={`flex-1 py-4 px-6 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'morning'
                ? 'border-amber-400 text-amber-950 bg-amber-50/30'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sun className={`w-4 h-4 ${activeTab === 'morning' ? 'text-amber-500' : ''}`} />
            <span>Morning Glow Routine</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-1">
              {routine.morningSteps.filter((s) => s.completed).length} / {routine.morningSteps.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('night')}
            className={`flex-1 py-4 px-6 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'night'
                ? 'border-indigo-400 text-indigo-950 bg-indigo-50/30'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Moon className={`w-4 h-4 ${activeTab === 'night' ? 'text-indigo-500' : ''}`} />
            <span>Night Beauty Routine</span>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full ml-1">
              {routine.nightSteps.filter((s) => s.completed).length} / {routine.nightSteps.length}
            </span>
          </button>
        </div>

        {/* Steps List */}
        <div className="p-6 sm:p-8 space-y-4">
          {currentSteps.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-stone-500 text-sm">No steps added yet for this routine.</p>
              <button
                onClick={onOpenQuiz}
                className="text-xs font-semibold text-rose-600 bg-rose-50 px-4 py-2 rounded-xl hover:bg-rose-100 transition-colors"
              >
                ✨ Generate Routine with Quiz
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {currentSteps.map((step, idx) => (
                <div
                  key={step.id}
                  onClick={() => handleToggleStep(activeTab, step.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    step.completed
                      ? 'bg-rose-50/40 border-rose-200 text-stone-400'
                      : 'bg-white border-stone-200/80 hover:border-rose-300 hover:shadow-2xs text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <button
                      type="button"
                      className="shrink-0 focus:outline-hidden"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleStep(activeTab, step.id);
                      }}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-rose-500 fill-rose-100" />
                      ) : (
                        <Circle className="w-5 h-5 text-stone-300 group-hover:text-rose-400 transition-colors" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-rose-400">Step {idx + 1}</span>
                        <span
                          className={`text-sm font-medium ${
                            step.completed ? 'line-through text-stone-400' : 'text-stone-900'
                          }`}
                        >
                          {step.title}
                        </span>
                      </div>
                      {step.description && (
                        <p className="text-xs text-stone-500 mt-0.5">{step.description}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveStep(activeTab, step.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-all"
                    title="Remove step"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add custom step */}
          <div className="pt-4 border-t border-rose-100 flex items-center gap-2">
            <input
              type="text"
              value={newStepText}
              onChange={(e) => setNewStepText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddStep(activeTab);
              }}
              placeholder={`Add a custom ${activeTab} step (e.g. 'Gua Sha massage with squalane')...`}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:border-rose-400 bg-stone-50/50"
            />
            <button
              onClick={() => handleAddStep(activeTab)}
              className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Routine Tips & Guidance */}
      {routine.tips.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-50/50 to-teal-50/30 rounded-3xl border border-emerald-100 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌿</span>
            <h3 className="font-serif font-bold text-lg text-emerald-950">Glow Tips for Your Journey</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#244233]">
            {routine.tips.map((tip, idx) => (
              <div key={idx} className="bg-white/80 p-3.5 rounded-2xl border border-emerald-100/80 flex items-start gap-2 shadow-2xs">
                <span className="text-emerald-500 font-bold shrink-0 mt-0.5">·</span>
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
