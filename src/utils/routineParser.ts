import { RoutineData, RoutineStep } from '../types';

export function parseRoutineResponse(text: string): RoutineData | null {
  if (!text) return null;

  const hasRoutineMarker =
    text.includes('Routine:') ||
    text.includes('Morning:') ||
    text.includes('Night:') ||
    text.includes('Recommended Products:') ||
    text.includes('Skin Type:');

  if (!hasRoutineMarker) return null;

  const routine: RoutineData = {
    morningSteps: [],
    nightSteps: [],
    tips: [],
    recommendedProducts: [],
    extraCare: [],
  };

  // Extract Skin Type
  const skinMatch = text.match(/(?:✨|\*)?\s*Skin Type:\s*([^\n\r]+)/i);
  if (skinMatch && skinMatch[1]) {
    routine.skinType = skinMatch[1].replace(/[*_]/g, '').trim();
  }

  // Extract Hair Type
  const hairMatch = text.match(/(?:✨|\*)?\s*Hair Type:\s*([^\n\r]+)/i);
  if (hairMatch && hairMatch[1]) {
    routine.hairType = hairMatch[1].replace(/[*_]/g, '').trim();
  }

  // Extract Recommended Products
  const productsSection = text.match(/(?:💖|\*)?\s*Recommended Products:?\s*([\s\S]*?)(?:🌿\s*Routine|Morning:|🌸\s*Tips|⚠️|$)/i);
  if (productsSection && productsSection[1]) {
    const lines = productsSection[1].split('\n');
    lines.forEach((line) => {
      const clean = line.replace(/^[-*•\d.]+\s*/, '').replace(/[*_]/g, '').trim();
      if (clean && clean.includes(':')) {
        const [cat, ...descParts] = clean.split(':');
        const desc = descParts.join(':').trim();
        if (cat.trim() && desc) {
          routine.recommendedProducts?.push({
            category: cat.trim(),
            description: desc,
          });
        }
      } else if (clean && clean.length > 3 && !clean.toLowerCase().includes('patch-test')) {
        routine.recommendedProducts?.push({
          category: 'Recommended',
          description: clean,
        });
      }
    });
  }

  // Extract Morning Routine
  const morningSection = text.match(/Morning:?\s*([\s\S]*?)(?:Night:?|🌸\s*Tips|🌿|💫|⚠️|$)/i);
  if (morningSection && morningSection[1]) {
    const lines = morningSection[1].split('\n');
    lines.forEach((line) => {
      const clean = line.replace(/^[-*•\d.]+\s*/, '').replace(/[*_]/g, '').trim();
      if (clean && clean.length > 3 && !clean.toLowerCase().startsWith('step')) {
        routine.morningSteps.push({
          id: `am-${Math.random().toString(36).substring(2, 7)}`,
          title: clean,
          completed: false,
        });
      } else if (clean && clean.toLowerCase().startsWith('step')) {
        routine.morningSteps.push({
          id: `am-${Math.random().toString(36).substring(2, 7)}`,
          title: clean,
          completed: false,
        });
      }
    });
  }

  // Extract Night Routine
  const nightSection = text.match(/Night:?\s*([\s\S]*?)(?:🌸\s*Tips|Tips:?|🌿|💫|⚠️|$)/i);
  if (nightSection && nightSection[1]) {
    const lines = nightSection[1].split('\n');
    lines.forEach((line) => {
      const clean = line.replace(/^[-*•\d.]+\s*/, '').replace(/[*_]/g, '').trim();
      if (clean && clean.length > 3) {
        routine.nightSteps.push({
          id: `pm-${Math.random().toString(36).substring(2, 7)}`,
          title: clean,
          completed: false,
        });
      }
    });
  }

  // Extract Tips (matches both 🌸 Tips: and 🌿 Tips for You:)
  const tipsSection = text.match(/(?:🌸|🌿|\*)?\s*Tips(?:\s*for You)?:?\s*([\s\S]*?)(?:💫|⚠️|$)/i);
  if (tipsSection && tipsSection[1]) {
    const lines = tipsSection[1].split('\n');
    lines.forEach((line) => {
      const clean = line.replace(/^[-*•\d.]+\s*/, '').replace(/[*_]/g, '').trim();
      if (clean && clean.length > 3) {
        routine.tips.push(clean);
      }
    });
  }

  // Extract Extra Care if present
  const extraSection = text.match(/(?:💫|\*)?\s*Extra Care(?:\s*\(optional\))?:?\s*([\s\S]*?)(?:⚠️|$)/i);
  if (extraSection && extraSection[1]) {
    const lines = extraSection[1].split('\n');
    lines.forEach((line) => {
      const clean = line.replace(/^[-*•\d.]+\s*/, '').replace(/[*_]/g, '').trim();
      if (clean && clean.length > 3) {
        routine.extraCare?.push(clean);
      }
    });
  }

  if (
    routine.morningSteps.length > 0 ||
    routine.nightSteps.length > 0 ||
    routine.tips.length > 0 ||
    (routine.recommendedProducts && routine.recommendedProducts.length > 0)
  ) {
    return routine;
  }

  return null;
}
