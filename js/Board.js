/**
 * Board.js — Renders the 8x8 chess board and manages square highlighting
 */

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1']; // top-to-bottom

/**
 * Create the 8x8 board inside the given container element.
 * Squares are stored in a map keyed by algebraic notation (e.g. "e4").
 * @param {HTMLElement} container
 * @returns {Object.<string, HTMLElement>} squareMap
 */
function createBoard(container) {
  const squareMap = {};

  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const sq = document.createElement('div');
      const isLight = (r + f) % 2 === 0;
      const algebraic = FILES[f] + RANKS[r];

      sq.className = `square ${isLight ? 'light' : 'dark'}`;
      sq.dataset.square = algebraic;

      // File labels on bottom row
      if (r === 7) {
        const fl = document.createElement('span');
        fl.className = 'file-label';
        fl.textContent = FILES[f];
        sq.appendChild(fl);
      }

      // Rank labels on left column
      if (f === 0) {
        const rl = document.createElement('span');
        rl.className = 'rank-label';
        rl.textContent = RANKS[r];
        sq.appendChild(rl);
      }

      container.appendChild(sq);
      squareMap[algebraic] = sq;
    }
  }

  return squareMap;
}

/**
 * Add a highlight class to a square.
 * @param {Object.<string, HTMLElement>} squareMap
 * @param {string} algebraic
 * @param {string} type - 'selected' | 'valid-move' | 'valid-capture' | 'last-move'
 */
function highlightSquare(squareMap, algebraic, type) {
  const sq = squareMap[algebraic];
  if (sq) sq.classList.add(type);
}

/**
 * Remove all highlight classes from every square.
 * @param {Object.<string, HTMLElement>} squareMap
 */
function clearHighlights(squareMap) {
  const types = ['selected', 'valid-move', 'valid-capture', 'last-move'];
  for (const sq of Object.values(squareMap)) {
    types.forEach(t => sq.classList.remove(t));
  }
}

/**
 * Clear only selection/move highlights but keep last-move.
 * @param {Object.<string, HTMLElement>} squareMap
 */
function clearSelectionHighlights(squareMap) {
  for (const sq of Object.values(squareMap)) {
    sq.classList.remove('selected', 'valid-move', 'valid-capture');
  }
}
