export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  structuredRoutine?: RoutineData | null;
}

export interface RoutineStep {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}

export interface RoutineData {
  skinType?: string;
  hairType?: string;
  recommendedProducts?: { category: string; description: string }[];
  morningSteps: RoutineStep[];
  nightSteps: RoutineStep[];
  tips: string[];
  extraCare?: string[];
  disclaimer?: string;
}

export interface QuizState {
  // Skin Questions (1-4)
  skinOiliness: string; // "yes-all" | "t-zone" | "normal" | "dry"
  skinDryness: string; // "rarely" | "sometimes" | "constantly" | "winter"
  skinAcne: string; // "frequent" | "occasional" | "rarely" | "never"
  skinSensitivity: string; // "very-sensitive" | "mildly" | "resilient"
  
  // Hair Questions (1-3)
  hairTexture: string; // "straight" | "wavy" | "curly" | "coily"
  scalpType: string; // "oily-quick" | "balanced" | "dry-itchy" | "oily-roots-dry-ends"
  hairConcerns: string[]; // ["dandruff", "frizz", "hair-fall", "split-ends", "dullness"]
  
  // Extra detail
  customConcern: string;
}

export interface RemedyItem {
  id: string;
  title: string;
  category: 'skin' | 'hair';
  timeNeeded: string;
  tagline: string;
  ingredients: string[];
  instructions: string[];
  benefit: string;
  patchTestTip: string;
}

export interface UserProfile {
  name: string;
  skinType: string;
  hairTexture: string;
  scalpType: string;
  concerns: string[];
  preferredIngredients: string[];
  ingredientsToAvoid: string[];
  climateNotes?: string;
  updatedAt: string;
}

export interface ProductCategoryRecommendation {
  id: string;
  targetArea: 'skin' | 'hair';
  categoryName: string;
  situation?: string;
  quickBenefit?: string;
  stickerType?:
    | 'foam-cleanser'
    | 'cream-cleanser'
    | 'gel-cream'
    | 'rich-cream'
    | 'sunscreen-tube'
    | 'dropper-serum'
    | 'shampoo-bottle'
    | 'leave-in-spray'
    | 'curl-butter'
    | 'hair-mask'
    | 'scalp-drops'
    | 'pimple-patch';
  pillBadge?: string;
  bestForSkinType?: string[];
  bestForHairType?: string[];
  bestForConcerns: string[];
  whyItHelps: string;
  whatToLookFor: string[];
  avoidIfPossible: string[];
  textureGuide: string;
  howToUse: string;
  patchTestTip: string;
}

export interface CommonConcern {
  id: string;
  title: string;
  emoji: string;
  category: 'skin' | 'hair';
  shortSummary: string;
  explanation: string;
  actionableTips: string[];
  gentleHomeRemedy: string;
  dermatologistDisclaimer: string;
  recommendedCategoryKeywords: string[];
}


export interface IngredientInfo {
  name: string;
  bestFor: string;
  role: string;
  gentleLevel: 'Very Gentle' | 'Gentle' | 'Use 1-2x/week';
  description: string;
}
