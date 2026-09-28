import React, { useState } from 'react';
import { QuizState } from '../types';
import { Sparkles, ArrowRight, Check, Droplets, Wind, Sparkle, Heart, Flame } from 'lucide-react';

interface QuizProps {
  onSubmitQuiz: (answers: QuizState) => void;
  isLoading: boolean;
}

export const QuizSection: React.FC<QuizProps> = ({ onSubmitQuiz, isLoading }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    skinOiliness: 't-zone',
    skinDryness: 'sometimes',
    skinAcne: 'occasional',
    skinSensitivity: 'mildly',
    hairTexture: 'wavy',
    scalpType: 'oily-roots-dry-ends',
    hairConcerns: ['frizz'],
    customConcern: '',
  });

  const toggleHairConcern = (concern: string) => {
    setQuizState((prev) => {
      const exists = prev.hairConcerns.includes(concern);
      if (exists) {
        return {
          ...prev,
          hairConcerns: prev.hairConcerns.filter((c) => c !== concern),
        };
      } else {
        return {
          ...prev,
          hairConcerns: [...prev.hairConcerns, concern],
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitQuiz(quizState);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Editorial Hero Intro */}
      <div className="text-center space-y-3 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200/60 shadow-xs">
          <span>✨ Discover Your Unique Beauty Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#331E24] tracking-tight">
          Skin & Hair Self-Analysis
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Answer a few friendly, gentle questions below. GlowGuide AI will pinpoint your skin & hair profile and handcraft a morning & night routine just for you! 💖
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Skin Analysis */}
        <div className="bg-white rounded-3xl border border-rose-100/90 shadow-sm overflow-hidden transition-all">
          <div className="bg-gradient-to-r from-rose-100/70 via-rose-50 to-amber-50/50 px-6 py-4 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🌸</span>
              <div>
                <h2 className="font-serif font-bold text-lg text-rose-950">Part 1: Skin Analysis</h2>
                <p className="text-xs text-rose-800/80">Understanding your skin's moisture, oil balance & sensitivity</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-rose-700 bg-rose-200/60 px-2.5 py-1 rounded-full">
              4 Questions
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Question 1: Skin Oiliness */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[#3D2C2E]">
                1. Does your skin feel oily after a few hours?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'yes-all',
                    title: 'Yes, shiny all over',
                    desc: 'Cheeks, forehead, and nose all produce oil quickly.',
                  },
                  {
                    id: 't-zone',
                    title: 'Only in the T-Zone',
                    desc: 'Oily forehead, nose, and chin, but cheeks feel normal or dry.',
                  },
                  {
                    id: 'normal',
                    title: 'Balanced & comfortable',
                    desc: 'Not too oily, not too dry throughout the day.',
                  },
                  {
                    id: 'dry',
                    title: 'No, feels tight or dry',
                    desc: 'Craves moisturizer; rarely gets oily.',
                  },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setQuizState({ ...quizState, skinOiliness: opt.id })}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      quizState.skinOiliness === opt.id
                        ? 'border-rose-400 bg-rose-50/70 text-rose-950 shadow-xs'
                        : 'border-stone-200/80 hover:border-rose-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-inherit">{opt.title}</div>
                      <div className="text-xs text-stone-500 mt-0.5 leading-snug">{opt.desc}</div>
                    </div>
                    {quizState.skinOiliness === opt.id && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Dryness / Flakiness */}
            <div className="space-y-3 pt-2 border-t border-rose-100/60">
              <label className="block text-sm font-semibold text-[#3D2C2E]">
                2. Do you experience dryness or flakiness?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'rarely',
                    title: 'Rarely or never',
                    desc: 'Skin stays supple and hydrated easily.',
                  },
                  {
                    id: 'sometimes',
                    title: 'Sometimes (cheeks / lips)',
                    desc: 'Dry patches show up under makeup or dry winds.',
                  },
                  {
                    id: 'constantly',
                    title: 'Yes, constantly dry & tight',
                    desc: 'Often peels, flakes, or feels rough to touch.',
                  },
                  {
                    id: 'winter',
                    title: 'Only in cold/winter weather',
                    desc: 'Seasonal dryness when heaters or cold air hit.',
                  },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setQuizState({ ...quizState, skinDryness: opt.id })}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      quizState.skinDryness === opt.id
                        ? 'border-rose-400 bg-rose-50/70 text-rose-950 shadow-xs'
                        : 'border-stone-200/80 hover:border-rose-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-inherit">{opt.title}</div>
                      <div className="text-xs text-stone-500 mt-0.5 leading-snug">{opt.desc}</div>
                    </div>
                    {quizState.skinDryness === opt.id && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Acne or Pimples */}
            <div className="space-y-3 pt-2 border-t border-rose-100/60">
              <label className="block text-sm font-semibold text-[#3D2C2E]">
                3. Do you get acne or pimples often?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'frequent',
                    title: 'Frequently (active breakouts)',
                    desc: 'Frequent whiteheads, blackheads, or inflammatory bumps.',
                  },
                  {
                    id: 'occasional',
                    title: 'Occasionally (hormonal/stress)',
                    desc: 'A few pimples around cycle time or exam stress.',
                  },
                  {
                    id: 'rarely',
                    title: 'Rarely (just occasional spot)',
                    desc: 'One random pimple every couple of months.',
                  },
                  {
                    id: 'never',
                    title: 'Almost never',
                    desc: 'Pores stay clear with minimal congestion.',
                  },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setQuizState({ ...quizState, skinAcne: opt.id })}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      quizState.skinAcne === opt.id
                        ? 'border-rose-400 bg-rose-50/70 text-rose-950 shadow-xs'
                        : 'border-stone-200/80 hover:border-rose-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-inherit">{opt.title}</div>
                      <div className="text-xs text-stone-500 mt-0.5 leading-snug">{opt.desc}</div>
                    </div>
                    {quizState.skinAcne === opt.id && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Sensitivity */}
            <div className="space-y-3 pt-2 border-t border-rose-100/60">
              <label className="block text-sm font-semibold text-[#3D2C2E]">
                4. Is your skin sensitive to products?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'very-sensitive',
                    title: 'Very Sensitive',
                    desc: 'Easily turns red, stings, or gets irritated by perfumes & scrubs.',
                  },
                  {
                    id: 'mildly',
                    title: 'Somewhat Sensitive',
                    desc: 'Reacts only to strong active acids or harsh fragrances.',
                  },
                  {
                    id: 'resilient',
                    title: 'Resilient / Tolerant',
                    desc: 'Tolerates most skincare without redness or tingling.',
                  },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setQuizState({ ...quizState, skinSensitivity: opt.id })}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                      quizState.skinSensitivity === opt.id
                        ? 'border-rose-400 bg-rose-50/70 text-rose-950 shadow-xs'
                        : 'border-stone-200/80 hover:border-rose-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-inherit">{opt.title}</div>
                      <div className="text-xs text-stone-500 mt-0.5 leading-snug">{opt.desc}</div>
                    </div>
                    {quizState.skinSensitivity === opt.id && (
                      <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Hair & Scalp Analysis */}
        <div className="bg-white rounded-3xl border border-rose-100/90 shadow-sm overflow-hidden transition-all">
          <div className="bg-gradient-to-r from-purple-100/70 via-rose-50 to-pink-50/50 px-6 py-4 border-b border-rose-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">💆‍♀️</span>
              <div>
                <h2 className="font-serif font-bold text-lg text-rose-950">Part 2: Hair & Scalp Analysis</h2>
                <p className="text-xs text-rose-800/80">Understanding your hair texture, scalp oiliness, and concerns</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-rose-700 bg-rose-200/60 px-2.5 py-1 rounded-full">
              3 Questions
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Hair Question 1: Texture */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-[#3D2C2E]">
                1. What is your hair texture?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'straight', title: 'Straight', subtitle: 'Type 1', icon: '〰️' },
                  { id: 'wavy', title: 'Wavy', subtitle: 'Type 2A - 2C', icon: '🌊' },
                  { id: 'curly', title: 'Curly', subtitle: 'Type 3A - 3C', icon: '🌀' },
                  { id: 'coily', title: 'Coily / Kinky', subtitle: 'Type 4A - 4C', icon: '✨' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setQuizState({ ...quizState, hairTexture: opt.id })}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      quizState.hairTexture === opt.id
                        ? 'border-rose-400 bg-rose-50/70 text-rose-950 shadow-xs'
                        : 'border-stone-200/80 hover:border-rose-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="text-xl mb-1">{opt.icon}</div>
                    <div className="text-sm font-medium text-inherit">{opt.title}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{opt.subtitle}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Question 2: Scalp type */}
            <div className="space-y-3 pt-2 border-t border-rose-100/60">
              <label className="block text-sm font-semibold text-[#3D2C2E]">
                2. Is your scalp oily or dry?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    id: 'oily-quick',
                    title: 'Oily within 1–2 days',
                    desc: 'Roots get greasy and flat quickly, requiring frequent washes.',
                  },
                  {
                    id: 'balanced',
                    title: 'Balanced (3–4 days)',
                    desc: 'Scalp stays comfortable and fresh for several days.',
                  },
                  {
                    id: 'dry-itchy',
                    title: 'Dry & itchy scalp',
                    desc: 'Scalp feels tight, itchy, or produces dry powdery flakes.',
                  },
                  {
                    id: 'oily-roots-dry-ends',
                    title: 'Oily roots + Dry ends',
                    desc: 'Scalp gets greasy while lengths and ends remain thirsty & brittle.',
                  },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setQuizState({ ...quizState, scalpType: opt.id })}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      quizState.scalpType === opt.id
                        ? 'border-rose-400 bg-rose-50/70 text-rose-950 shadow-xs'
                        : 'border-stone-200/80 hover:border-rose-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium text-inherit">{opt.title}</div>
                      <div className="text-xs text-stone-500 mt-0.5 leading-snug">{opt.desc}</div>
                    </div>
                    {quizState.scalpType === opt.id && (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Question 3: Concerns (Multi-select) */}
            <div className="space-y-3 pt-2 border-t border-rose-100/60">
              <label className="block text-sm font-semibold text-[#3D2C2E]">
                3. Do you face dandruff, frizz, or hair fall?{' '}
                <span className="font-normal text-xs text-stone-500">(Choose all that apply)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'frizz', label: 'Frizz & Flyaways', emoji: '☁️' },
                  { id: 'dandruff', label: 'Dandruff & Flakes', emoji: '❄️' },
                  { id: 'hair-fall', label: 'Hair Fall & Shedding', emoji: '🍂' },
                  { id: 'split-ends', label: 'Split Ends & Damage', emoji: '✂️' },
                  { id: 'dullness', label: 'Dullness / Lack of Shine', emoji: '✨' },
                  { id: 'thinning', label: 'Lack of Volume', emoji: '💨' },
                ].map((item) => {
                  const isSelected = quizState.hairConcerns.includes(item.id);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleHairConcern(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-rose-400 bg-rose-50/70 text-rose-950 font-medium shadow-xs'
                          : 'border-stone-200/80 hover:border-rose-200 hover:bg-stone-50 text-stone-700'
                      }`}
                    >
                      <span className="text-xs sm:text-sm flex items-center gap-1.5">
                        <span>{item.emoji}</span>
                        <span>{item.label}</span>
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-rose-600 stroke-[3] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Notes / Specific Goals */}
            <div className="space-y-2 pt-2 border-t border-rose-100/60">
              <label className="block text-sm font-medium text-stone-700">
                Any specific concerns, routine preferences, or climate notes?{' '}
                <span className="text-stone-400 font-normal text-xs">(optional)</span>
              </label>
              <input
                type="text"
                value={quizState.customConcern}
                onChange={(e) => setQuizState({ ...quizState, customConcern: e.target.value })}
                placeholder="e.g. 'I live in a hot humid climate and wear a hijab daily' or 'Prefer only budget-friendly drugstore items'"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 focus:outline-hidden focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all bg-stone-50/40"
              />
            </div>
          </div>
        </div>

        {/* Submit Action Card */}
        <div className="bg-gradient-to-r from-rose-500 via-rose-400 to-amber-300 p-1 rounded-3xl shadow-lg shadow-rose-200/50">
          <div className="bg-[#FFFDF9] rounded-[22px] p-6 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-rose-950">
                Ready for your tailored Glow Guide?
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                GlowGuide AI will assemble your personalized morning & night routine, tips, and gentle home care in seconds! 💖
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto min-w-[280px] px-8 py-3.5 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium rounded-full shadow-md shadow-rose-300/50 transition-all transform active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing Glow Guide...</span>
                </>
              ) : (
                <>
                  <span>Generate My Beauty Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
