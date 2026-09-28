// Vector Illustrations for School Supplies & Items
const SVGS = {
  bleistift: `<svg viewBox="0 0 100 100" class="item-svg">
    <g transform="rotate(-45 50 50)">
      <path d="M 45 10 L 55 10 L 55 75 L 45 75 Z" fill="#FFB703" stroke="#D48800" stroke-width="2"/>
      <path d="M 48 10 L 52 10 L 52 75 L 48 75 Z" fill="#FFD166"/>
      <path d="M 45 75 L 55 75 L 50 92 Z" fill="#F4A261"/>
      <polygon points="50,92 48,87 52,87" fill="#2B2D42"/>
      <path d="M 45 10 L 55 10 L 55 18 L 45 18 Z" fill="#E76F51"/>
      <rect x="44" y="17" width="12" height="4" fill="#8D99AE" rx="1"/>
    </g>
  </svg>`,

  spitzer: `<svg viewBox="0 0 100 100" class="item-svg">
    <rect x="20" y="25" width="60" height="50" rx="8" fill="#4EA8DE" stroke="#2B6CB0" stroke-width="3"/>
    <ellipse cx="50" cy="50" rx="16" ry="16" fill="#1D3557"/>
    <polygon points="40,30 60,30 55,70 45,70" fill="#CBD5E1"/>
    <circle cx="68" cy="35" r="4" fill="#94A3B8"/>
    <circle cx="32" cy="65" r="4" fill="#94A3B8"/>
  </svg>`,

  taschenrechner: `<svg viewBox="0 0 100 100" class="item-svg">
    <rect x="22" y="15" width="56" height="70" rx="8" fill="#334155" stroke="#1E293B" stroke-width="3"/>
    <rect x="30" y="24" width="40" height="16" rx="4" fill="#94A3B8"/>
    <text x="65" y="36" fill="#0F172A" font-size="10" font-family="monospace" text-anchor="end">123456</text>
    <g fill="#475569">
      <rect x="30" y="46" width="9" height="7" rx="2"/>
      <rect x="43" y="46" width="9" height="7" rx="2"/>
      <rect x="56" y="46" width="9" height="7" rx="2"/>
      <rect x="30" y="56" width="9" height="7" rx="2"/>
      <rect x="43" y="56" width="9" height="7" rx="2"/>
      <rect x="56" y="56" width="9" height="7" rx="2"/>
      <rect x="30" y="66" width="9" height="7" rx="2"/>
      <rect x="43" y="66" width="9" height="7" rx="2"/>
      <rect x="56" y="66" width="9" height="7" rx="2"/>
    </g>
    <rect x="56" y="76" width="9" height="5" rx="2" fill="#3B82F6"/>
  </svg>`,

  kugelschreiber: `<svg viewBox="0 0 100 100" class="item-svg">
    <g transform="rotate(-30 50 50)">
      <rect x="46" y="15" width="8" height="65" fill="#2563EB" rx="2"/>
      <path d="M 46 80 L 54 80 L 50 92 Z" fill="#94A3B8"/>
      <circle cx="50" cy="92" r="1.5" fill="#1E293B"/>
      <rect x="44" y="12" width="12" height="6" fill="#CBD5E1" rx="1"/>
      <path d="M 52 20 L 56 20 L 56 40 L 52 36 Z" fill="#94A3B8"/>
    </g>
  </svg>`,

  radiergummi: `<svg viewBox="0 0 100 100" class="item-svg">
    <g transform="rotate(-15 50 50)">
      <path d="M 20 35 L 50 35 L 50 65 L 20 65 Z" fill="#EF4444" rx="3"/>
      <path d="M 50 35 L 80 35 L 80 65 L 50 65 Z" fill="#3B82F6" rx="3"/>
      <rect x="44" y="35" width="12" height="30" fill="#FFFFFF" opacity="0.9"/>
      <text x="33" y="53" fill="#FFF" font-weight="bold" font-size="10">ERA</text>
      <text x="59" y="53" fill="#FFF" font-weight="bold" font-size="10">SER</text>
    </g>
  </svg>`,

  marker: `<svg viewBox="0 0 100 100" class="item-svg">
    <g transform="rotate(-25 50 50)">
      <rect x="40" y="35" width="20" height="45" fill="#FACC15" rx="4" stroke="#CA8A04" stroke-width="2"/>
      <path d="M 42 20 L 58 20 L 55 35 L 45 35 Z" fill="#FACC15"/>
      <polygon points="46,20 54,20 54,12 46,14" fill="#EAB308"/>
      <rect x="38" y="50" width="24" height="25" fill="#CA8A04" rx="2"/>
    </g>
  </svg>`,

  lineal: `<svg viewBox="0 0 100 100" class="item-svg">
    <g transform="rotate(-45 50 50)">
      <rect x="15" y="42" width="70" height="16" fill="#F59E0B" rx="2" stroke="#B45309" stroke-width="2"/>
      <line x1="25" y1="42" x2="25" y2="48" stroke="#78350F" stroke-width="1.5"/>
      <line x1="30" y1="42" x2="30" y2="46" stroke="#78350F" stroke-width="1"/>
      <line x1="35" y1="42" x2="35" y2="48" stroke="#78350F" stroke-width="1.5"/>
      <line x1="40" y1="42" x2="40" y2="46" stroke="#78350F" stroke-width="1"/>
      <line x1="45" y1="42" x2="45" y2="50" stroke="#78350F" stroke-width="2"/>
      <line x1="50" y1="42" x2="50" y2="46" stroke="#78350F" stroke-width="1"/>
      <line x1="55" y1="42" x2="55" y2="48" stroke="#78350F" stroke-width="1.5"/>
      <line x1="60" y1="42" x2="60" y2="46" stroke="#78350F" stroke-width="1"/>
      <line x1="65" y1="42" x2="65" y2="50" stroke="#78350F" stroke-width="2"/>
      <line x1="70" y1="42" x2="70" y2="46" stroke="#78350F" stroke-width="1"/>
      <line x1="75" y1="42" x2="75" y2="48" stroke="#78350F" stroke-width="1.5"/>
    </g>
  </svg>`,

  heft: `<svg viewBox="0 0 100 100" class="item-svg">
    <rect x="25" y="18" width="50" height="64" rx="4" fill="#991B1B" stroke="#7F1D1D" stroke-width="2"/>
    <rect x="33" y="28" width="28" height="12" fill="#FFFFFF" rx="2"/>
    <line x1="36" y1="32" x2="57" y2="32" stroke="#94A3B8" stroke-width="1.5"/>
    <line x1="36" y1="36" x2="52" y2="36" stroke="#94A3B8" stroke-width="1.5"/>
    <line x1="25" y1="18" x2="30" y2="18" stroke="#DC2626" stroke-width="64"/>
  </svg>`,

  buch: `<svg viewBox="0 0 100 100" class="item-svg">
    <path d="M 20 30 Q 50 20 80 30 L 80 75 Q 50 65 20 75 Z" fill="#0284C7" stroke="#0369A1" stroke-width="2"/>
    <path d="M 50 22 L 50 67" stroke="#0F172A" stroke-width="2"/>
    <path d="M 23 35 Q 50 25 77 35 M 23 45 Q 50 35 77 45 M 23 55 Q 50 45 77 55" stroke="#E0F2FE" stroke-width="1.5" fill="none"/>
  </svg>`,

  maeppchen: `<svg viewBox="0 0 100 100" class="item-svg">
    <rect x="15" y="38" width="70" height="32" rx="16" fill="#10B981" stroke="#047857" stroke-width="3"/>
    <line x1="20" y1="42" x2="80" y2="42" stroke="#065F46" stroke-width="2.5"/>
    <circle cx="72" cy="42" r="3" fill="#F59E0B"/>
    <path d="M 30 38 Q 40 20 50 38" stroke="#3B82F6" stroke-width="3" fill="none"/>
    <path d="M 50 38 Q 60 18 70 38" stroke="#EF4444" stroke-width="3" fill="none"/>
  </svg>`,

  schultasche: `<svg viewBox="0 0 100 100" class="item-svg">
    <rect x="25" y="32" width="50" height="48" rx="8" fill="#D97706" stroke="#92400E" stroke-width="3"/>
    <path d="M 25 38 L 75 38 L 75 52 L 25 52 Z" fill="#B45309"/>
    <rect x="44" y="48" width="12" height="8" rx="2" fill="#F59E0B"/>
    <path d="M 40 32 C 40 18, 60 18, 60 32" fill="none" stroke="#78350F" stroke-width="4"/>
    <rect x="18" y="45" width="8" height="20" rx="3" fill="#B45309"/>
    <rect x="74" y="45" width="8" height="20" rx="3" fill="#B45309"/>
  </svg>`,

  schere: `<svg viewBox="0 0 100 100" class="item-svg">
    <g transform="rotate(45 50 50)">
      <circle cx="35" cy="75" r="10" fill="none" stroke="#DC2626" stroke-width="4"/>
      <circle cx="65" cy="75" r="10" fill="none" stroke="#DC2626" stroke-width="4"/>
      <path d="M 35 65 L 50 45 L 60 15 L 50 45 L 65 65" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
      <path d="M 65 65 L 50 45 L 40 15 L 50 45 L 35 65" fill="#CBD5E1" stroke="#475569" stroke-width="2"/>
      <circle cx="50" cy="45" r="2.5" fill="#1E293B"/>
    </g>
  </svg>`,

  mappe: `<svg viewBox="0 0 100 100" class="item-svg">
    <path d="M 20 25 L 45 25 L 52 32 L 80 32 L 80 75 L 20 75 Z" fill="#8B5CF6" stroke="#6D28D9" stroke-width="2"/>
    <rect x="25" y="38" width="50" height="32" rx="2" fill="#DDD6FE" opacity="0.8"/>
  </svg>`,

  banane: `<svg viewBox="0 0 100 100" class="item-svg">
    <path d="M 25 30 Q 70 20 75 70 Q 50 85 25 30 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2"/>
    <path d="M 75 70 C 77 73, 76 77, 72 75" stroke="#713F12" stroke-width="3"/>
    <path d="M 25 30 C 23 27, 24 23, 27 25" stroke="#713F12" stroke-width="3"/>
  </svg>`,

  tasche: `<svg viewBox="0 0 100 100" class="item-svg">
    <rect x="20" y="40" width="60" height="35" rx="10" fill="#E11D48" stroke="#BE123C" stroke-width="3"/>
    <path d="M 32 40 C 32 20, 68 20, 68 40" fill="none" stroke="#9F1239" stroke-width="4"/>
    <line x1="20" y1="52" x2="80" y2="52" stroke="#FFF" stroke-width="2" stroke-dasharray="4 2"/>
  </svg>`,

  baby: `<svg viewBox="0 0 100 100" class="item-svg">
    <circle cx="50" cy="40" r="22" fill="#FED7AA" stroke="#F97316" stroke-width="2"/>
    <circle cx="42" cy="38" r="3" fill="#1E293B"/>
    <circle cx="58" cy="38" r="3" fill="#1E293B"/>
    <path d="M 45 48 Q 50 54 55 48" stroke="#E11D48" stroke-width="2.5" fill="none"/>
    <path d="M 48 18 Q 50 12 55 16" stroke="#78350F" stroke-width="2" fill="none"/>
    <path d="M 30 62 Q 50 55 70 62 L 65 85 L 35 85 Z" fill="#60A5FA" rx="4"/>
  </svg>`,

  computer: `<svg viewBox="0 0 100 100" class="item-svg">
    <rect x="20" y="20" width="60" height="42" rx="4" fill="#1E293B" stroke="#475569" stroke-width="2"/>
    <rect x="24" y="24" width="52" height="34" fill="#38BDF8"/>
    <path d="M 45 62 L 55 62 L 58 75 L 42 75 Z" fill="#64748B"/>
    <rect x="30" y="75" width="40" height="5" rx="2" fill="#475569"/>
  </svg>`,

  schule: `<svg viewBox="0 0 100 100" class="item-svg">
    <polygon points="50,15 15,40 85,40" fill="#EF4444"/>
    <rect x="20" y="40" width="60" height="45" fill="#F8FAFC" stroke="#64748B" stroke-width="2"/>
    <rect x="42" y="60" width="16" height="25" fill="#B45309"/>
    <circle cx="54" cy="73" r="1.5" fill="#F59E0B"/>
    <rect x="28" y="48" width="12" height="12" fill="#93C5FD"/>
    <rect x="60" y="48" width="12" height="12" fill="#93C5FD"/>
    <path d="M 50 25 L 50 35 M 45 30 L 55 30" stroke="#FFF" stroke-width="2"/>
  </svg>`
};

function getSVG(key) {
  return SVGS[key.toLowerCase()] || `<div class="emoji-fallback">🎒</div>`;
}
