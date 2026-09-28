import React from 'react';

export type StickerType =
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

interface ProductStickerProps {
  type?: StickerType | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProductSticker: React.FC<ProductStickerProps> = ({
  type = 'gel-cream',
  size = 'md',
  className = '',
}) => {
  const sizeClass =
    size === 'sm' ? 'w-14 h-14' : size === 'lg' ? 'w-28 h-28' : 'w-20 h-20';

  const renderGraphic = () => {
    switch (type) {
      case 'foam-cleanser':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="foamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE4E6" />
                <stop offset="100%" stopColor="#FDA4AF" />
              </linearGradient>
              <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#FECDD3" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            {/* Background halo */}
            <circle cx="50" cy="50" r="42" fill="#FFF1F2" />
            {/* Bottle body */}
            <rect x="36" y="42" width="28" height="42" rx="8" fill="url(#foamGrad)" />
            {/* Pump neck & head */}
            <rect x="45" y="32" width="10" height="10" fill="#F43F5E" rx="2" />
            <path d="M42 32 C42 27, 58 27, 58 32 Z" fill="#E11D48" />
            <path d="M50 27 L65 24 C67 24, 67 27, 65 28 L50 29 Z" fill="#BE123C" />
            {/* Label */}
            <rect x="40" y="52" width="20" height="22" rx="4" fill="#FFFFFF" opacity="0.95" />
            <circle cx="50" cy="60" r="3" fill="#FB7185" />
            <line x1="44" y1="67" x2="56" y2="67" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
            {/* Foamy bubbles */}
            <circle cx="68" cy="30" r="6" fill="url(#bubbleGrad)" />
            <circle cx="75" cy="38" r="4" fill="url(#bubbleGrad)" />
            <circle cx="62" cy="22" r="3.5" fill="url(#bubbleGrad)" />
            {/* Cute sparkle */}
            <path d="M30 35 Q30 31 34 31 Q30 31 30 27 Q30 31 26 31 Q30 31 30 35 Z" fill="#F43F5E" />
          </svg>
        );

      case 'cream-cleanser':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="creamCleanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#BAE6FD" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#F0F9FF" />
            {/* Bottle body */}
            <rect x="35" y="38" width="30" height="46" rx="9" fill="url(#creamCleanGrad)" />
            {/* Cap */}
            <rect x="44" y="28" width="12" height="10" fill="#38BDF8" rx="2" />
            <rect x="41" y="24" width="18" height="5" fill="#0284C7" rx="2.5" />
            {/* Label */}
            <rect x="39" y="48" width="22" height="24" rx="4" fill="#FFFFFF" />
            <path d="M50 54 C50 51, 54 53, 54 57 C54 60, 46 60, 46 57 C46 53, 50 51, 50 54 Z" fill="#38BDF8" />
            <line x1="43" y1="64" x2="57" y2="64" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
            {/* Soft cream droplet */}
            <path d="M72 45 C72 40, 78 44, 78 49 C78 53, 72 53, 72 49 Z" fill="#BAE6FD" />
            <path d="M26 48 Q26 44 30 44 Q26 44 26 40 Q26 44 22 44 Q26 44 26 48 Z" fill="#38BDF8" />
          </svg>
        );

      case 'gel-cream':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="jarGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CCFBF1" />
                <stop offset="100%" stopColor="#99F6E4" />
              </linearGradient>
              <linearGradient id="jarLid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEE2E2" />
                <stop offset="100%" stopColor="#FECDD3" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#F0FDFA" />
            {/* Jar Base */}
            <rect x="28" y="44" width="44" height="36" rx="10" fill="url(#jarGlass)" />
            {/* Gel shimmer inside */}
            <rect x="32" y="48" width="36" height="28" rx="7" fill="#5EEAD4" opacity="0.6" />
            <path d="M35 56 Q50 50 65 56 Q50 62 35 56 Z" fill="#FFFFFF" opacity="0.7" />
            {/* Jar Lid */}
            <rect x="25" y="34" width="50" height="12" rx="4" fill="url(#jarLid)" />
            <rect x="27" y="32" width="46" height="3" rx="1.5" fill="#FDA4AF" />
            {/* Water burst droplets */}
            <circle cx="76" cy="38" r="4" fill="#2DD4BF" opacity="0.8" />
            <circle cx="70" cy="28" r="2.5" fill="#5EEAD4" />
            <circle cx="22" cy="40" r="3" fill="#2DD4BF" opacity="0.8" />
            {/* Cute sparkle */}
            <path d="M50 20 Q50 16 54 16 Q50 16 50 12 Q50 16 46 16 Q50 16 50 20 Z" fill="#14B8A6" />
          </svg>
        );

      case 'rich-cream':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="richLid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id="richJar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="100%" stopColor="#FEF3C7" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#FFFDF5" />
            {/* Jar base */}
            <rect x="26" y="46" width="48" height="34" rx="12" fill="url(#richJar)" stroke="#FDE68A" strokeWidth="2" />
            {/* Heart badge */}
            <circle cx="50" cy="62" r="8" fill="#FEE2E2" />
            <path d="M50 64 C48 61, 45 61, 45 59 C45 57.5, 46.5 56.5, 48 57.5 C49 58.5, 50 59.5, 50 59.5 C50 59.5, 51 58.5, 52 57.5 C53.5 56.5, 55 57.5, 55 59 C55 61, 52 61, 50 64 Z" fill="#F43F5E" />
            {/* Luxe Lid */}
            <rect x="23" y="36" width="54" height="12" rx="4" fill="url(#richLid)" />
            {/* Ceramic shine */}
            <line x1="32" y1="52" x2="32" y2="72" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
            {/* Little floating shield & star */}
            <path d="M74 34 L77 40 L83 40 L78 44 L80 50 L74 46 L68 50 L70 44 L65 40 L71 40 Z" fill="#F59E0B" transform="scale(0.5) translate(40, -10)" />
          </svg>
        );

      case 'sunscreen-tube':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#FEFCE8" />
            {/* Tube body */}
            <path d="M38 78 L34 36 C34 32, 66 32, 66 36 L62 78 Z" fill="#FFFFFF" stroke="#FDE047" strokeWidth="1.5" />
            {/* Tube crimp top */}
            <line x1="34" y1="35" x2="66" y2="35" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            {/* Cap bottom */}
            <rect x="42" y="78" width="16" height="8" rx="2" fill="#F59E0B" />
            {/* Golden Sun Emblem */}
            <circle cx="50" cy="52" r="8" fill="url(#sunGrad)" />
            <path d="M50 40 L50 42 M50 62 L50 64 M38 52 L40 52 M60 52 L62 52 M42 44 L44 46 M56 58 L58 60 M42 60 L44 58 M56 46 L58 44" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
            {/* Text badge */}
            <rect x="42" y="65" width="16" height="6" rx="3" fill="#FEF3C7" />
            <text x="50" y="69.5" fontSize="4.5" fontWeight="bold" textAnchor="middle" fill="#B45309">
              SPF 50
            </text>
            {/* Sparkles */}
            <path d="M72 26 Q72 22 76 22 Q72 22 72 18 Q72 22 68 22 Q72 22 72 26 Z" fill="#F59E0B" />
          </svg>
        );

      case 'dropper-serum':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="serumFluid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FBCFE8" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#FDF2F8" />
            {/* Bottle body */}
            <rect x="36" y="44" width="28" height="40" rx="8" fill="#FFFFFF" stroke="#FBCFE8" strokeWidth="1.5" />
            {/* Fluid fill */}
            <rect x="38" y="52" width="24" height="30" rx="6" fill="url(#serumFluid)" opacity="0.85" />
            {/* Neck */}
            <rect x="45" y="38" width="10" height="6" fill="#CBD5E1" />
            {/* Dropper collar & bulb */}
            <rect x="42" y="32" width="16" height="7" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
            <path d="M45 32 C45 24, 55 24, 55 32 Z" fill="#475569" />
            {/* Dewdrop falling */}
            <path d="M72 58 C72 52, 79 56, 79 63 C79 67, 72 67, 72 63 Z" fill="#EC4899" />
            <circle cx="75" cy="62" r="1.5" fill="#FFFFFF" />
            {/* Label */}
            <rect x="41" y="60" width="18" height="14" rx="2" fill="#FFFFFF" opacity="0.9" />
            <line x1="44" y1="66" x2="56" y2="66" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
            <path d="M26 34 Q26 30 30 30 Q26 30 26 26 Q26 30 22 30 Q26 30 26 34 Z" fill="#EC4899" />
          </svg>
        );

      case 'shampoo-bottle':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="shampooGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DDD6FE" />
                <stop offset="100%" stopColor="#C4B5FD" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#F5F3FF" />
            {/* Bottle body */}
            <path d="M36 40 C36 36, 64 36, 64 40 L62 82 C62 85, 38 85, 38 82 Z" fill="url(#shampooGrad)" />
            {/* Cap */}
            <rect x="44" y="27" width="12" height="10" rx="3" fill="#8B5CF6" />
            {/* Label */}
            <rect x="40" y="48" width="20" height="26" rx="4" fill="#FFFFFF" opacity="0.9" />
            {/* Botanical wavy pattern */}
            <path d="M46 56 Q50 52 54 56 Q50 60 46 56 Z" fill="#8B5CF6" />
            <line x1="44" y1="64" x2="56" y2="64" stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
            {/* Floating lather bubbles */}
            <circle cx="68" cy="32" r="5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="1" />
            <circle cx="75" cy="40" r="3.5" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="1" />
            <path d="M28 36 Q28 32 32 32 Q28 32 28 28 Q28 32 24 32 Q28 32 28 36 Z" fill="#8B5CF6" />
          </svg>
        );

      case 'leave-in-spray':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="sprayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E9D5FF" />
                <stop offset="100%" stopColor="#D8B4FE" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#FAF5FF" />
            {/* Spray bottle */}
            <rect x="37" y="44" width="26" height="42" rx="7" fill="url(#sprayGrad)" />
            {/* Spray neck & trigger cap */}
            <rect x="46" y="34" width="8" height="10" fill="#9333EA" />
            <path d="M44 26 L56 26 L56 34 L48 34 L44 30 Z" fill="#7E22CE" />
            <rect x="56" y="27" width="5" height="4" rx="1" fill="#A855F7" />
            {/* Mist cloud particles */}
            <circle cx="68" cy="24" r="2.5" fill="#C084FC" />
            <circle cx="74" cy="21" r="3" fill="#C084FC" opacity="0.8" />
            <circle cx="80" cy="27" r="2" fill="#C084FC" opacity="0.6" />
            <circle cx="76" cy="30" r="2.5" fill="#C084FC" opacity="0.7" />
            {/* Label */}
            <rect x="41" y="54" width="18" height="22" rx="3" fill="#FFFFFF" opacity="0.9" />
            <path d="M50 60 C48 57, 52 57, 50 60 Z" stroke="#9333EA" strokeWidth="2" fill="none" />
            <line x1="44" y1="67" x2="56" y2="67" stroke="#D8B4FE" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'curl-butter':
      case 'hair-mask':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="maskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#FFF7ED" />
            {/* Wide tub */}
            <rect x="25" y="46" width="50" height="34" rx="10" fill="#FFFFFF" stroke="#FED7AA" strokeWidth="2" />
            <rect x="29" y="50" width="42" height="26" rx="6" fill="#FFEDD5" />
            {/* Whipped curl swirl */}
            <path d="M35 60 Q50 50 65 60 Q55 70 45 65" stroke="#EA580C" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Lid */}
            <rect x="22" y="36" width="56" height="12" rx="4" fill="url(#maskGrad)" />
            {/* Botanical flower sticker */}
            <circle cx="74" cy="36" r="4" fill="#F97316" />
            <circle cx="71" cy="33" r="3" fill="#FDBA74" />
            <circle cx="77" cy="33" r="3" fill="#FDBA74" />
            <circle cx="71" cy="39" r="3" fill="#FDBA74" />
            <circle cx="77" cy="39" r="3" fill="#FDBA74" />
            <path d="M22 30 Q22 26 26 26 Q22 26 22 22 Q22 26 18 26 Q22 26 22 30 Z" fill="#FB923C" />
          </svg>
        );

      case 'scalp-drops':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="amberGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#FEFDF6" />
            {/* Bottle body */}
            <rect x="36" y="44" width="28" height="40" rx="8" fill="url(#amberGlass)" />
            {/* Dropper */}
            <rect x="45" y="36" width="10" height="8" fill="#451A03" />
            <rect x="43" y="30" width="14" height="7" rx="2" fill="#FFFFFF" />
            <path d="M46 30 C46 23, 54 23, 54 30 Z" fill="#1C1917" />
            {/* Rosemary sprig illustration */}
            <path d="M68 65 Q74 50 78 35 M74 54 Q82 50 84 46 M73 44 Q79 40 82 36 M69 60 Q63 56 61 52" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Drop */}
            <path d="M30 60 C30 55, 35 58, 35 64 C35 67, 30 67, 30 64 Z" fill="#D97706" />
          </svg>
        );

      case 'pimple-patch':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <defs>
              <linearGradient id="patchCard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="100%" stopColor="#FFE4E6" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="#FFF5F7" />
            {/* Transparent film card */}
            <rect x="28" y="24" width="44" height="56" rx="8" fill="url(#patchCard)" stroke="#FDA4AF" strokeWidth="1.5" />
            {/* Cute Yellow Star patch */}
            <path d="M40 38 L42 43 L47 43 L43 46 L45 51 L40 48 L35 51 L37 46 L33 43 L38 43 Z" fill="#FDE047" stroke="#EAB308" strokeWidth="1" />
            <circle cx="39" cy="44" r="0.8" fill="#713F12" />
            <circle cx="41" cy="44" r="0.8" fill="#713F12" />
            {/* Pink Heart patch */}
            <path d="M58 45 C56 42, 53 42, 53 40 C53 38.5, 54.5 37.5, 56 38.5 C57 39.5, 58 40.5, 58 40.5 C58 40.5, 59 39.5, 60 38.5 C61.5 37.5, 63 38.5, 63 40 C63 42, 60 42, 58 45 Z" fill="#FB7185" stroke="#F43F5E" strokeWidth="0.8" transform="scale(1.4) translate(-17, -13)" />
            {/* Flower patch */}
            <circle cx="50" cy="64" r="5" fill="#C4B5FD" />
            <circle cx="50" cy="64" r="2.5" fill="#FEF08A" />
            <circle cx="45" cy="64" r="2.5" fill="#E9D5FF" />
            <circle cx="55" cy="64" r="2.5" fill="#E9D5FF" />
            <circle cx="50" cy="59" r="2.5" fill="#E9D5FF" />
            <circle cx="50" cy="69" r="2.5" fill="#E9D5FF" />
            {/* Cute sparkle */}
            <path d="M22 28 Q22 24 26 24 Q22 24 22 20 Q22 24 18 24 Q22 24 22 28 Z" fill="#F43F5E" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
            <circle cx="50" cy="50" r="42" fill="#FFF1F2" />
            <rect x="36" y="40" width="28" height="42" rx="8" fill="#FDA4AF" />
            <rect x="44" y="30" width="12" height="10" rx="3" fill="#F43F5E" />
            <circle cx="50" cy="60" r="4" fill="#FFFFFF" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeClass} ${className}`}>
      {renderGraphic()}
    </div>
  );
};
