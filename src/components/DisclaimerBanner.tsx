import React from 'react';
import { AlertCircle, HeartHandshake } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<Props> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="text-xs text-rose-900/70 bg-rose-50/80 border border-rose-100 rounded-xl px-3 py-2 flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
        <p>
          <strong className="font-semibold text-rose-900">Gentle Reminder:</strong> This is general guidance and not a medical diagnosis. Please consult a dermatologist for serious concerns.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-rose-50 via-[#FFF5F6] to-amber-50/50 border border-rose-100/80 rounded-2xl p-4 sm:p-5 text-sm text-[#4A2E35] shadow-xs">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-rose-100/90 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
          <HeartHandshake className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold text-rose-950 flex items-center gap-1.5 text-sm">
            <span>A Gentle Note from GlowGuide</span>
            <span className="text-xs text-rose-700 font-normal">· Care & Wellness</span>
          </h4>
          <p className="text-xs sm:text-sm text-[#5C3D45] leading-relaxed">
            Every face and hair strand is uniquely wonderful! 🌸 GlowGuide AI offers supportive lifestyle advice, cosmetic routines, and gentle home tips. This is general guidance and not a medical diagnosis. Please consult a board-certified dermatologist for cystic acne, sudden hair loss, or persistent scalp pain.
          </p>
        </div>
      </div>
    </div>
  );
};
