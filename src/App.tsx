import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { QuizSection } from './components/QuizSection';
import { RoutineShelf } from './components/RoutineShelf';
import { ProductRecommenderView } from './components/ProductRecommenderView';
import { CommonConcernsView } from './components/CommonConcernsView';
import { PantryRemediesView } from './components/PantryRemediesView';
import { IngredientsView } from './components/IngredientsView';
import { UserProfileView } from './components/UserProfileView';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { N8nChatbot } from './components/N8nChatbot';
import {
  QuizState,
  RoutineData,
  UserProfile,
  ProductCategoryRecommendation,
  CommonConcern,
  RemedyItem,
} from './types';
import { parseRoutineResponse } from './utils/routineParser';
import { DEFAULT_USER_PROFILE } from './data/beautyData';

const DEFAULT_ROUTINE: RoutineData = {
  skinType: 'Combination (Oily T-Zone, Balanced Cheeks)',
  hairType: 'Wavy (Type 2B) · Balanced Scalp',
  recommendedProducts: [
    { category: 'Cleanser', description: 'Low-pH gentle foaming gel cleanser with green tea' },
    { category: 'Moisturizer', description: 'Lightweight, oil-free water gel moisturizer' },
    { category: 'Shampoo', description: 'Sulfate-free scalp-balancing shampoo with rosemary' },
  ],
  morningSteps: [
    { id: 'am-1', title: 'Gentle lukewarm water splash or low-pH gel cleanser', completed: false },
    { id: 'am-2', title: 'Hydrating rosewater mist or hyaluronic toner on damp skin', completed: false },
    { id: 'am-3', title: 'Lightweight oil-free gel moisturizer', completed: false },
    { id: 'am-4', title: 'Broad-spectrum SPF 50 sunscreen (never skip!)', completed: false },
  ],
  nightSteps: [
    { id: 'pm-1', title: 'Gentle micellar water or cleansing balm to remove sunscreen', completed: false },
    { id: 'pm-2', title: 'Gentle barrier-friendly foaming wash', completed: false },
    { id: 'pm-3', title: 'Niacinamide or Centella calming serum', completed: false },
    { id: 'pm-4', title: 'Nourishing ceramide night cream', completed: false },
    { id: 'pm-5', title: 'Loose silk scrunchie braid to prevent hair friction while sleeping', completed: false },
  ],
  tips: [
    'Always apply hydrating products to slightly damp skin to lock in max moisture.',
    'Swap to a mulberry silk or satin pillowcase to cut down morning hair frizz by 80%.',
    'Drink a glass of water when you wake up to gently hydrate your skin cells from within.',
    'Never pick or squeeze pimples – pop on a cute hydrocolloid pimple patch instead!',
    'Remember to patch-test any new product on your inner wrist for 24-48 hours before full application.',
  ],
  extraCare: [
    'Once a week: Soothing Oatmeal & Honey DIY face mask for 15 minutes',
    'Twice a month: Gentle scalp massage with 2 drops of diluted rosemary oil before washing',
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('quiz');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // User Profile with persistent storage
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('glowguide_user_profile_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_USER_PROFILE;
  });

  // User Routine
  const [routine, setRoutine] = useState<RoutineData>(() => {
    try {
      const saved = localStorage.getItem('glowguide_routine_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ROUTINE;
  });

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('glowguide_user_profile_v3', JSON.stringify(userProfile));
    } catch (e) {
      console.error(e);
    }
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('glowguide_routine_v3', JSON.stringify(routine));
    } catch (e) {
      console.error(e);
    }
  }, [routine]);

  // Direct AI Routine Synthesizer (calls Gemini and parses into routine shelf)
  const generateRoutineFromAI = async (analysisPrompt: string, contextPayload: any) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: analysisPrompt }],
          context: contextPayload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.reply || '';
        const parsed = parseRoutineResponse(replyText);

        if (parsed && (parsed.morningSteps.length > 0 || parsed.nightSteps.length > 0)) {
          setRoutine(parsed);
          setActiveTab('routine');
          showToast('✨ Custom Glow Guide & Routine successfully generated!');
          return;
        }
      }
    } catch (err) {
      console.warn('API connection notice:', err);
    } finally {
      setIsLoading(false);
    }

    // Resilient smart routine fallback if offline or model timeout
    const isOily = userProfile.skinType.toLowerCase().includes('oily');
    const isDry = userProfile.skinType.toLowerCase().includes('dry');
    const isCurl = userProfile.hairTexture.toLowerCase().includes('curl') || userProfile.hairTexture.toLowerCase().includes('wavy');

    const synthesized: RoutineData = {
      skinType: `${userProfile.skinType} Skin`,
      hairType: `${userProfile.hairTexture} · ${userProfile.scalpType}`,
      recommendedProducts: [
        {
          category: 'Cleanser',
          description: isOily ? 'Low-pH gentle foaming gel cleanser' : 'Hydrating milky cream cleanser',
        },
        {
          category: 'Moisturizer',
          description: isDry ? 'Barrier-repair ceramide rich cream' : 'Lightweight, oil-free water gel moisturizer',
        },
        {
          category: 'Shampoo',
          description: isCurl ? 'Moisturizing sulfate-free curl shampoo' : 'Gentle clarifying scalp-balancing wash',
        },
      ],
      morningSteps: [
        {
          id: `am-${Date.now()}-1`,
          title: isOily ? 'Gentle cleanse with low-pH gel wash' : 'Lukewarm water splash to protect natural barrier lipids',
          completed: false,
        },
        {
          id: `am-${Date.now()}-2`,
          title: 'Hydrating Centella or Rosewater mist on damp skin',
          completed: false,
        },
        {
          id: `am-${Date.now()}-3`,
          title: isDry ? 'Nourishing barrier moisture cream' : 'Weightless oil-free gel moisturizer',
          completed: false,
        },
        {
          id: `am-${Date.now()}-4`,
          title: 'Broad-spectrum SPF 50 sunscreen (never skip!)',
          completed: false,
        },
      ],
      nightSteps: [
        {
          id: `pm-${Date.now()}-1`,
          title: 'Gentle micellar water or cleansing balm to dissolve daytime SPF',
          completed: false,
        },
        {
          id: `pm-${Date.now()}-2`,
          title: 'Mild sulfate-free face cleanser with warm water',
          completed: false,
        },
        {
          id: `pm-${Date.now()}-3`,
          title: 'Niacinamide 2% or Cica calming serum for pore & blemish balance',
          completed: false,
        },
        {
          id: `pm-${Date.now()}-4`,
          title: 'Nourishing night moisturizer',
          completed: false,
        },
      ],
      tips: [
        'Always apply hydrating essences and moisturizers to damp skin to lock in max moisture.',
        'Use cute hydrocolloid star patches instead of squeezing or picking active bumps.',
        'Always patch-test any new bottle on your inner wrist for 24 hours first! ✨',
      ],
      extraCare: [
        'Weekly: Soothing Colloidal Oatmeal & Honey mask for 15 minutes',
        'Twice monthly: Rosemary scalp massage for 3 minutes before washing',
      ],
    };

    setRoutine(synthesized);
    setActiveTab('routine');
    showToast('✨ Custom Glow Guide & Routine successfully generated!');
  };

  // Handle Quiz Submission
  const handleQuizSubmit = (quiz: QuizState) => {
    const detectedSkin =
      quiz.skinOiliness === 'yes-all'
        ? 'Oily'
        : quiz.skinOiliness === 't-zone'
        ? 'Combination'
        : quiz.skinOiliness === 'dry'
        ? 'Dry'
        : 'Normal';

    const detectedHair =
      quiz.hairTexture === 'straight'
        ? 'Straight (Type 1)'
        : quiz.hairTexture === 'wavy'
        ? 'Wavy (Type 2)'
        : quiz.hairTexture === 'curly'
        ? 'Curly (Type 3)'
        : 'Coily / Kinky (Type 4)';

    const detectedScalp =
      quiz.scalpType === 'oily-quick'
        ? 'Oily (needs wash in 1-2 days)'
        : quiz.scalpType === 'balanced'
        ? 'Balanced (lasts 3-4 days)'
        : quiz.scalpType === 'dry-itchy'
        ? 'Dry & Itchy Scalp'
        : 'Oily Roots & Dry Lengths';

    const updatedProfile: UserProfile = {
      ...userProfile,
      skinType: detectedSkin,
      hairTexture: detectedHair,
      scalpType: detectedScalp,
      concerns: Array.from(new Set([...userProfile.concerns, ...quiz.hairConcerns])),
      updatedAt: new Date().toISOString(),
    };

    setUserProfile(updatedProfile);

    const prompt = `Please analyze my skin & hair profile and generate my customized beauty guide:
Skin Oiliness: ${quiz.skinOiliness}
Skin Dryness: ${quiz.skinDryness}
Breakouts: ${quiz.skinAcne}
Sensitivity: ${quiz.skinSensitivity}
Hair Texture: ${quiz.hairTexture}
Scalp: ${quiz.scalpType}
Concerns: ${quiz.hairConcerns.join(', ')}
${quiz.customConcern ? `Notes: ${quiz.customConcern}` : ''}

Output format:
✨ Skin Type:
✨ Hair Type:

💖 Recommended Products:
- Cleanser:
- Moisturizer:
- Shampoo:

🌿 Routine:
Morning:
- Step 1
- Step 2
Night:
- Step 1
- Step 2

🌸 Tips:
- Tip 1
- Tip 2

⚠️ Disclaimer:
This is general guidance and not medical advice.`;

    generateRoutineFromAI(prompt, { userProfile: updatedProfile, fromQuiz: true });
  };

  // Consult with saved profile
  const handleConsultWithProfile = (prof: UserProfile) => {
    setUserProfile(prof);
    const prompt = `Please generate my tailored beauty guide based on my saved beauty profile:
Name: ${prof.name}
Skin Type: ${prof.skinType}
Hair: ${prof.hairTexture} (Scalp: ${prof.scalpType})
Concerns: ${prof.concerns.join(', ')}
Favorites: ${prof.preferredIngredients.join(', ')}
Avoid: ${prof.ingredientsToAvoid.join(', ')}
${prof.climateNotes ? `Climate: ${prof.climateNotes}` : ''}

Output format:
✨ Skin Type:
✨ Hair Type:

💖 Recommended Products:
- Cleanser:
- Moisturizer:
- Shampoo:

🌿 Routine:
Morning:
Night:

🌸 Tips:

⚠️ Disclaimer:
This is general guidance and not medical advice.`;

    generateRoutineFromAI(prompt, { userProfile: prof, fromProfile: true });
  };

  // Add Product Category to Routine
  const handleAddProductToRoutine = (cat: ProductCategoryRecommendation) => {
    const isMorning = cat.howToUse.toLowerCase().includes('morning') || cat.id.includes('sunscreen');
    const newStep = {
      id: `step-${Date.now()}`,
      title: `${cat.categoryName} (${cat.whatToLookFor[0]?.split(':')[1]?.trim() || 'Gentle formulation'})`,
      completed: false,
    };

    if (isMorning) {
      setRoutine((prev) => ({
        ...prev,
        morningSteps: [...prev.morningSteps, newStep],
      }));
      showToast(`☀️ Added ${cat.categoryName} to Morning Routine!`);
    } else {
      setRoutine((prev) => ({
        ...prev,
        nightSteps: [...prev.nightSteps, newStep],
      }));
      showToast(`🌙 Added ${cat.categoryName} to Night Routine!`);
    }
  };

  // Add Concern Tips to Routine
  const handleAddTipsToRoutine = (concern: CommonConcern) => {
    setRoutine((prev) => ({
      ...prev,
      tips: Array.from(new Set([...prev.tips, concern.actionableTips[0]])),
      extraCare: Array.from(new Set([...(prev.extraCare || []), concern.gentleHomeRemedy])),
    }));
    showToast(`🌸 Added ${concern.title} tips & ritual to your routine!`);
  };

  // Add Remedy to Routine
  const handleAddToRoutineExtraCare = (remedy: RemedyItem) => {
    setRoutine((prev) => ({
      ...prev,
      extraCare: Array.from(
        new Set([...(prev.extraCare || []), `${remedy.title} (${remedy.timeNeeded}): ${remedy.tagline}`])
      ),
    }));
    showToast(`🍯 Added ${remedy.title} to your Weekly Care Checklist!`);
  };

  // Add Ingredient to Favorites
  const handleAddToFavorites = (ingName: string) => {
    setUserProfile((prev) => ({
      ...prev,
      preferredIngredients: Array.from(new Set([...prev.preferredIngredients, ingName])),
    }));
    showToast(`💖 Saved ${ingName} to your Favorite Ingredients in Profile!`);
  };

  // Reset session
  const handleNewConsultation = () => {
    if (confirm('Start a fresh analysis? Your saved profile will remain safe.')) {
      setActiveTab('quiz');
      showToast('🌸 Ready for a new beauty quiz!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#3D2C2E] flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#331E24] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-2xl shadow-xl border border-rose-900/30 flex items-center gap-2 animate-fade-in">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedRoutineCount={routine.morningSteps.length + routine.nightSteps.length}
        userProfile={userProfile}
        onNewConsultation={handleNewConsultation}
        onOpenChatbot={() => setIsChatbotOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'quiz' && (
          <QuizSection onSubmitQuiz={handleQuizSubmit} isLoading={isLoading} />
        )}

        {activeTab === 'routine' && (
          <RoutineShelf
            routine={routine}
            onUpdateRoutine={setRoutine}
            onOpenProducts={() => setActiveTab('products')}
            onOpenQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'products' && (
          <ProductRecommenderView
            userProfile={userProfile}
            onAddToRoutine={handleAddProductToRoutine}
            onOpenProfile={() => setActiveTab('profile')}
          />
        )}

        {activeTab === 'concerns' && (
          <CommonConcernsView
            onAddTipsToRoutine={handleAddTipsToRoutine}
            onExploreProductCategory={() => setActiveTab('products')}
          />
        )}

        {activeTab === 'pantry' && (
          <PantryRemediesView onAddToRoutineExtraCare={handleAddToRoutineExtraCare} />
        )}

        {activeTab === 'ingredients' && (
          <IngredientsView onAddToFavorites={handleAddToFavorites} />
        )}

        {activeTab === 'profile' && (
          <UserProfileView
            profile={userProfile}
            onSaveProfile={(updated) => {
              setUserProfile(updated);
              showToast('💖 Profile saved! GlowGuide will now use these preferences.');
            }}
            onConsultWithProfile={handleConsultWithProfile}
          />
        )}

        {/* Universal Gentle Disclaimer Banner */}
        <div className="mt-12">
          <DisclaimerBanner />
        </div>
      </main>

      {/* Aesthetic Quiet Footer */}
      <footer className="border-t border-rose-100/70 bg-[#FFFBF7] py-6 sm:py-8 mt-12 text-xs text-stone-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 font-serif font-bold text-sm text-[#331E24]">
              <span>GlowGuide AI</span>
              <span className="text-rose-400">✨</span>
            </div>
            <p className="text-stone-500">
              Gentle, encouraging skin & hair guidance for young women and girls.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-stone-500">
            <span>Non-medical guidance</span>
            <span>·</span>
            <span>Brand-free categories</span>
            <span>·</span>
            <span>Patch-test safety</span>
            <span>·</span>
            <span>Positive beauty confidence 🌸</span>
          </div>
        </div>
      </footer>

      {/* n8n AI Chatbot Widget */}
      <N8nChatbot
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen((prev) => !prev)}
      />
    </div>
  );
}
