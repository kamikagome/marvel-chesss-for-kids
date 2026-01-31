/**
 * Piece.js — Marvel character piece mapping, SVG head visuals, and DOM creation
 */

const MARVEL_MAP = {
  k: { name: 'Iron Man',       abbr: 'IM', shape: 'king' },
  q: { name: 'Spider-Man',     abbr: 'SP', shape: 'queen' },
  b: { name: 'Black Panther',    abbr: 'BP', shape: 'bishop' },
  n: { name: 'Captain America',  abbr: 'CA', shape: 'knight' },
  r: { name: 'Rhino',          abbr: 'RH', shape: 'rook' },
  p: { name: 'Green Goblin',   abbr: 'GG', shape: 'pawn' },
};

/**
 * SVG head portraits for each character.
 * Each function returns an SVG string at the given size.
 */
const PIECE_SVG = {
  // Iron Man — red/gold helmet with glowing eyes
  k: (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
    <!-- Helmet base -->
    <ellipse cx="32" cy="34" rx="22" ry="26" fill="#b71c1c"/>
    <!-- Gold faceplate -->
    <path d="M16 28 Q18 18 32 14 Q46 18 48 28 L46 44 Q40 50 32 52 Q24 50 18 44 Z" fill="#ffd600"/>
    <!-- Red helmet top -->
    <path d="M18 28 Q20 16 32 12 Q44 16 46 28 L42 26 Q38 20 32 18 Q26 20 22 26 Z" fill="#d32f2f"/>
    <!-- Eyes -->
    <path d="M21 30 L28 28 L29 34 L22 35 Z" fill="#e3f2fd" opacity="0.95"/>
    <path d="M43 30 L36 28 L35 34 L42 35 Z" fill="#e3f2fd" opacity="0.95"/>
    <!-- Eye glow -->
    <path d="M22 31 L27 29 L28 33 L23 34 Z" fill="#90caf9"/>
    <path d="M42 31 L37 29 L36 33 L41 34 Z" fill="#90caf9"/>
    <!-- Mouth slit -->
    <rect x="26" y="40" width="12" height="1.5" rx="0.5" fill="#b71c1c" opacity="0.7"/>
    <!-- Chin line -->
    <path d="M26 44 Q32 48 38 44" fill="none" stroke="#c6a700" stroke-width="1"/>
    <!-- Forehead line -->
    <line x1="32" y1="12" x2="32" y2="22" stroke="#c6a700" stroke-width="1.2"/>
  </svg>`,

  // Spider-Man — red mask, web pattern, big white eyes
  q: (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
    <!-- Head shape -->
    <ellipse cx="32" cy="34" rx="22" ry="26" fill="#d32f2f"/>
    <!-- Web lines from center -->
    <g stroke="#8b0000" stroke-width="0.8" fill="none" opacity="0.6">
      <line x1="32" y1="10" x2="32" y2="58"/>
      <line x1="32" y1="34" x2="10" y2="20"/>
      <line x1="32" y1="34" x2="54" y2="20"/>
      <line x1="32" y1="34" x2="10" y2="48"/>
      <line x1="32" y1="34" x2="54" y2="48"/>
      <line x1="32" y1="34" x2="12" y2="34"/>
      <line x1="32" y1="34" x2="52" y2="34"/>
      <!-- Concentric arcs -->
      <ellipse cx="32" cy="34" rx="6" ry="7" />
      <ellipse cx="32" cy="34" rx="12" ry="13"/>
      <ellipse cx="32" cy="34" rx="18" ry="20"/>
    </g>
    <!-- Left eye -->
    <path d="M17 26 Q22 20 28 24 L26 34 Q22 38 16 34 Z" fill="white" stroke="#222" stroke-width="1.2"/>
    <!-- Right eye -->
    <path d="M47 26 Q42 20 36 24 L38 34 Q42 38 48 34 Z" fill="white" stroke="#222" stroke-width="1.2"/>
  </svg>`,

  // Black Panther — dark mask, silver claw marks, glowing eyes, pointed ears
  b: (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
    <!-- Background -->
    <rect width="64" height="64" rx="8" fill="#2a1f0e" opacity="0.3"/>
    <!-- Ears/points -->
    <polygon points="13,22 17,6 25,22" fill="#1a1a2e"/>
    <polygon points="51,22 47,6 39,22" fill="#1a1a2e"/>
    <polygon points="15,21 17,9 23,21" fill="#2a2a40"/>
    <polygon points="49,21 47,9 41,21" fill="#2a2a40"/>
    <!-- Head shape -->
    <ellipse cx="32" cy="36" rx="21" ry="24" fill="#1a1a2e"/>
    <!-- Forehead/mask detail lines -->
    <g stroke="#c0c0c0" stroke-width="0.8" fill="none" opacity="0.35">
      <path d="M32 14 Q26 24 22 36"/>
      <path d="M32 14 Q38 24 42 36"/>
      <path d="M32 18 L32 26"/>
    </g>
    <!-- Brow ridge -->
    <path d="M14 30 Q22 24 32 22 Q42 24 50 30" fill="#222240" opacity="0.8"/>
    <!-- Eyes — angular, glowing white -->
    <path d="M18 32 L26 28 L29 33 L22 37 Z" fill="white"/>
    <path d="M46 32 L38 28 L35 33 L42 37 Z" fill="white"/>
    <!-- Eye glow effect -->
    <path d="M19 32 L26 29 L28 33 L22 36 Z" fill="#e0e8ff" opacity="0.8"/>
    <path d="M45 32 L38 29 L36 33 L42 36 Z" fill="#e0e8ff" opacity="0.8"/>
    <!-- Silver claw marks on left cheek -->
    <g stroke="#c0c0c0" stroke-width="1.8" stroke-linecap="round" opacity="0.7">
      <line x1="16" y1="34" x2="22" y2="46"/>
      <line x1="19" y1="33" x2="25" y2="45"/>
      <line x1="22" y1="32" x2="28" y2="44"/>
    </g>
    <!-- Silver claw marks on right cheek -->
    <g stroke="#c0c0c0" stroke-width="1.8" stroke-linecap="round" opacity="0.7">
      <line x1="48" y1="34" x2="42" y2="46"/>
      <line x1="45" y1="33" x2="39" y2="45"/>
      <line x1="42" y1="32" x2="36" y2="44"/>
    </g>
    <!-- Nose bridge -->
    <path d="M30 34 L32 40 L34 34" fill="none" stroke="#444" stroke-width="0.8"/>
    <!-- Mouth area -->
    <path d="M26 46 Q32 50 38 46" fill="none" stroke="#333" stroke-width="0.8"/>
    <!-- Necklace -->
    <path d="M12 50 Q22 58 32 60 Q42 58 52 50" fill="none" stroke="#c0c0c0" stroke-width="1.8"/>
    <g fill="#c0c0c0">
      <circle cx="16" cy="51" r="2.2"/>
      <circle cx="22" cy="55" r="2.2"/>
      <circle cx="29" cy="57.5" r="2.2"/>
      <circle cx="35" cy="57.5" r="2.2"/>
      <circle cx="42" cy="55" r="2.2"/>
      <circle cx="48" cy="51" r="2.2"/>
    </g>
  </svg>`,

  // Captain America — blue helmet with white A, wing details, determined eyes
  n: (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
    <!-- Helmet base -->
    <ellipse cx="32" cy="34" rx="22" ry="26" fill="#1565c0"/>
    <!-- Red and white stripes on forehead -->
    <path d="M14 32 Q18 16 32 10 Q46 16 50 32 Q44 22 32 18 Q20 22 14 32Z" fill="#1565c0"/>
    <path d="M18 28 Q22 18 32 14 Q42 18 46 28" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
    <!-- Wing on left side -->
    <g fill="white" opacity="0.9">
      <path d="M10 26 L6 20 L14 24Z"/>
      <path d="M10 24 L4 16 L14 22Z"/>
      <path d="M11 22 L3 12 L15 20Z"/>
    </g>
    <!-- Wing on right side -->
    <g fill="white" opacity="0.9">
      <path d="M54 26 L58 20 L50 24Z"/>
      <path d="M54 24 L60 16 L50 22Z"/>
      <path d="M53 22 L61 12 L49 20Z"/>
    </g>
    <!-- White "A" on forehead -->
    <text x="32" y="24" text-anchor="middle" font-size="14" font-weight="900" fill="white" font-family="Arial, sans-serif">A</text>
    <!-- Face/skin area (lower half) -->
    <path d="M16 32 Q16 36 18 42 Q22 50 32 52 Q42 50 46 42 Q48 36 48 32 Q44 30 32 28 Q20 30 16 32Z" fill="#e8b88a"/>
    <!-- Eyes -->
    <ellipse cx="25" cy="34" rx="3.5" ry="2.5" fill="white"/>
    <ellipse cx="39" cy="34" rx="3.5" ry="2.5" fill="white"/>
    <circle cx="25" cy="34" r="1.8" fill="#1565c0"/>
    <circle cx="39" cy="34" r="1.8" fill="#1565c0"/>
    <!-- Determined brow -->
    <path d="M20 30 L29 31" stroke="#7a5530" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M44 30 L35 31" stroke="#7a5530" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Nose -->
    <path d="M31 37 Q32 40 33 37" fill="#d4a574" stroke="#c69060" stroke-width="0.5"/>
    <!-- Mouth — determined set jaw -->
    <path d="M27 44 Q32 46 37 44" fill="none" stroke="#8b6040" stroke-width="1.2"/>
    <!-- Chin strap -->
    <path d="M16 32 Q14 40 18 48" fill="none" stroke="#0d47a1" stroke-width="2"/>
    <path d="M48 32 Q50 40 46 48" fill="none" stroke="#0d47a1" stroke-width="2"/>
    <!-- Helmet edge around face -->
    <path d="M16 32 Q20 30 32 28 Q44 30 48 32" fill="none" stroke="#0d47a1" stroke-width="1.5"/>
  </svg>`,

  // Rhino — gray armored head with horn
  r: (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
    <!-- Horn -->
    <polygon points="32,2 28,18 36,18" fill="#bdbdbd" stroke="#9e9e9e" stroke-width="0.5"/>
    <!-- Head shape (wider, bulkier) -->
    <ellipse cx="32" cy="36" rx="24" ry="24" fill="#757575"/>
    <!-- Armor plating lines -->
    <g stroke="#616161" stroke-width="1.2" fill="none">
      <path d="M14 26 Q22 20 32 18 Q42 20 50 26"/>
      <path d="M12 34 Q20 28 32 26 Q44 28 52 34"/>
      <path d="M16 44 Q24 50 32 52 Q40 50 48 44"/>
    </g>
    <!-- Brow ridge -->
    <path d="M14 28 Q22 22 32 20 Q42 22 50 28" fill="#616161"/>
    <!-- Eyes (small, angry) -->
    <ellipse cx="24" cy="32" rx="4" ry="3" fill="white"/>
    <ellipse cx="40" cy="32" rx="4" ry="3" fill="white"/>
    <circle cx="25" cy="32" r="2" fill="#333"/>
    <circle cx="41" cy="32" r="2" fill="#333"/>
    <!-- Angry brow -->
    <path d="M18 28 L28 30" stroke="#444" stroke-width="2" stroke-linecap="round"/>
    <path d="M46 28 L36 30" stroke="#444" stroke-width="2" stroke-linecap="round"/>
    <!-- Nose -->
    <ellipse cx="32" cy="40" rx="5" ry="3" fill="#616161"/>
    <!-- Mouth -->
    <path d="M24 48 Q32 52 40 48" fill="none" stroke="#444" stroke-width="1.5"/>
    <!-- Chin armor -->
    <path d="M20 50 Q32 58 44 50" fill="#616161" opacity="0.5"/>
  </svg>`,

  // Green Goblin — green face, pointy hat/ears, menacing grin
  p: (size) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
    <!-- Pointy hood/hat -->
    <polygon points="32,2 22,22 42,22" fill="#4a148c"/>
    <!-- Ear points -->
    <polygon points="12,26 8,16 20,24" fill="#2e7d32"/>
    <polygon points="52,26 56,16 44,24" fill="#2e7d32"/>
    <!-- Head -->
    <ellipse cx="32" cy="36" rx="20" ry="22" fill="#4caf50"/>
    <!-- Hood shadow on forehead -->
    <path d="M22 22 Q32 18 42 22 Q38 26 32 28 Q26 26 22 22Z" fill="#388e3c"/>
    <!-- Eyes (yellow, menacing) -->
    <path d="M20 30 L28 28 L28 34 L20 35Z" fill="#ffeb3b"/>
    <path d="M44 30 L36 28 L36 34 L44 35Z" fill="#ffeb3b"/>
    <!-- Pupils -->
    <circle cx="25" cy="31" r="2" fill="#b71c1c"/>
    <circle cx="39" cy="31" r="2" fill="#b71c1c"/>
    <!-- Angry brows -->
    <path d="M18 27 L29 27" stroke="#1b5e20" stroke-width="2" stroke-linecap="round"/>
    <path d="M46 27 L35 27" stroke="#1b5e20" stroke-width="2" stroke-linecap="round"/>
    <!-- Nose -->
    <path d="M30 36 Q32 40 34 36" fill="#388e3c"/>
    <!-- Menacing grin -->
    <path d="M22 44 Q27 42 32 44 Q37 42 42 44" fill="none" stroke="#1b5e20" stroke-width="1.5"/>
    <path d="M22 44 Q32 52 42 44" fill="#1b5e20"/>
    <!-- Teeth -->
    <g fill="#fff">
      <rect x="25" y="44" width="3" height="3" rx="0.5"/>
      <rect x="29" y="44" width="3" height="3" rx="0.5"/>
      <rect x="33" y="44" width="3" height="3" rx="0.5"/>
      <rect x="37" y="44" width="3" height="3" rx="0.5"/>
    </g>
  </svg>`,
};

/**
 * Create a piece DOM element for the board.
 * @param {{ type: string, color: string }} piece - chess.js piece object
 * @returns {HTMLElement}
 */
function createPieceElement(piece) {
  const info = MARVEL_MAP[piece.type];
  if (!info) return null;

  const el = document.createElement('div');
  el.className = `piece color-${piece.color}`;
  el.title = `${info.name} (${piece.color === 'w' ? 'White' : 'Black'})`;
  el.dataset.pieceType = piece.type;
  el.dataset.pieceColor = piece.color;

  // SVG character head
  const svgFn = PIECE_SVG[piece.type];
  if (svgFn) {
    el.innerHTML = svgFn(48);
  }

  // Team indicator ring
  const ring = document.createElement('div');
  ring.className = 'team-ring';
  el.appendChild(ring);

  // Name label below
  const label = document.createElement('span');
  label.className = 'piece-label';
  label.textContent = info.abbr;
  el.appendChild(label);

  return el;
}

/**
 * Create a mini captured-piece element for the tray.
 * @param {{ type: string, color: string }} piece
 * @returns {HTMLElement}
 */
function createCapturedPieceElement(piece) {
  const info = MARVEL_MAP[piece.type];
  if (!info) return null;

  const el = document.createElement('div');
  el.className = `captured-piece color-${piece.color}`;
  el.title = info.name;

  const svgFn = PIECE_SVG[piece.type];
  if (svgFn) {
    el.innerHTML = svgFn(22);
  }

  return el;
}

/**
 * Create a promotion option element.
 * @param {string} type - piece type ('q','r','b','n')
 * @param {string} color - 'w' or 'b'
 * @returns {HTMLElement}
 */
function createPromoOptionElement(type, color) {
  const info = MARVEL_MAP[type];
  if (!info) return null;

  const el = document.createElement('div');
  el.className = `promo-option color-${color}`;

  const svgFn = PIECE_SVG[type];
  if (svgFn) {
    el.innerHTML = svgFn(50);
  }

  const label = document.createElement('div');
  label.className = 'promo-label';
  label.textContent = info.name;
  el.appendChild(label);

  return el;
}
