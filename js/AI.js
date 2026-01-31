/**
 * AI.js — Simple random-move AI opponent
 */

/**
 * Pick a random legal move.
 * @param {Chess} chess - chess.js instance
 * @returns {string|null} move in SAN notation, or null if no moves
 */
function getAIMove(chess) {
  const moves = chess.moves();
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}
