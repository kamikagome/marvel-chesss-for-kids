/**
 * Game.js — Main game orchestrator
 * Connects chess.js logic with Board, Piece, and AI modules.
 */

(function () {
  // ===== State =====
  let chess;
  let squareMap = {};
  let selectedSquare = null;
  let validMoves = [];
  let capturedWhite = []; // pieces captured FROM white (by black)
  let capturedBlack = []; // pieces captured FROM black (by white)
  let lastMove = null;
  let gameOver = false;
  let awaitingPromotion = null; // { from, to } if promotion pending

  // ===== DOM refs =====
  const boardEl = document.getElementById('chess-board');
  const statusEl = document.getElementById('status');
  const capturedWhiteEl = document.getElementById('captured-white');
  const capturedBlackEl = document.getElementById('captured-black');
  const newGameBtn = document.getElementById('btn-new-game');
  const promoOverlay = document.getElementById('promo-overlay');
  const promoOptions = document.getElementById('promo-options');

  // ===== Init =====
  function init() {
    chess = new Chess();
    selectedSquare = null;
    validMoves = [];
    capturedWhite = [];
    capturedBlack = [];
    lastMove = null;
    gameOver = false;
    awaitingPromotion = null;

    // Clear and build board
    boardEl.innerHTML = '';
    squareMap = createBoard(boardEl);

    // Attach click handlers
    for (const [algebraic, sq] of Object.entries(squareMap)) {
      sq.addEventListener('click', () => onSquareClick(algebraic));
    }

    renderPieces();
    updateStatus();
    renderCaptured();
    promoOverlay.classList.remove('active');
  }

  // ===== Render pieces onto the board =====
  function renderPieces() {
    const board = chess.board(); // 8x8 array

    for (let r = 0; r < 8; r++) {
      for (let f = 0; f < 8; f++) {
        const algebraic = FILES[f] + RANKS[r];
        const sq = squareMap[algebraic];

        // Remove existing piece element (but keep labels)
        const existingPiece = sq.querySelector('.piece');
        if (existingPiece) existingPiece.remove();

        const cell = board[r][f];
        if (cell) {
          const pieceEl = createPieceElement(cell);
          if (pieceEl) sq.appendChild(pieceEl);
        }
      }
    }
  }

  // ===== Square click handler =====
  function onSquareClick(algebraic) {
    if (gameOver) return;
    if (chess.turn() !== 'w') return; // Only human (white) can click
    if (awaitingPromotion) return;

    const piece = chess.get(algebraic);

    // If we already have a piece selected
    if (selectedSquare) {
      // Clicking the same square — deselect
      if (algebraic === selectedSquare) {
        deselect();
        return;
      }

      // Clicking another own piece — re-select
      if (piece && piece.color === 'w') {
        deselect();
        selectPiece(algebraic);
        return;
      }

      // Clicking a valid move target
      const move = validMoves.find(m => m.to === algebraic);
      if (move) {
        // Check if promotion
        if (move.flags.includes('p')) {
          showPromotionDialog(selectedSquare, algebraic);
          return;
        }
        executeMove({ from: selectedSquare, to: algebraic });
        return;
      }

      // Invalid target — deselect
      deselect();
      return;
    }

    // No piece selected yet — select if it's a white piece
    if (piece && piece.color === 'w') {
      selectPiece(algebraic);
    }
  }

  // ===== Select a piece =====
  function selectPiece(algebraic) {
    selectedSquare = algebraic;
    validMoves = chess.moves({ square: algebraic, verbose: true });

    clearSelectionHighlights(squareMap);
    highlightSquare(squareMap, algebraic, 'selected');

    for (const m of validMoves) {
      const type = m.captured ? 'valid-capture' : 'valid-move';
      highlightSquare(squareMap, m.to, type);
    }
  }

  // ===== Deselect =====
  function deselect() {
    selectedSquare = null;
    validMoves = [];
    clearSelectionHighlights(squareMap);
  }

  // ===== Execute a move =====
  function executeMove(moveObj) {
    const result = chess.move(moveObj);
    if (!result) return;

    // Track capture
    if (result.captured) {
      const capturedPiece = { type: result.captured, color: result.color === 'w' ? 'b' : 'w' };
      if (capturedPiece.color === 'w') {
        capturedWhite.push(capturedPiece);
      } else {
        capturedBlack.push(capturedPiece);
      }
    }

    // Clear all highlights, mark last move
    clearHighlights(squareMap);
    lastMove = { from: result.from, to: result.to };
    highlightSquare(squareMap, result.from, 'last-move');
    highlightSquare(squareMap, result.to, 'last-move');

    deselect();
    renderPieces();
    renderCaptured();
    updateStatus();

    // Check game over
    if (chess.game_over()) {
      gameOver = true;
      return;
    }

    // AI turn
    if (chess.turn() === 'b') {
      setTimeout(doAIMove, 400);
    }
  }

  // ===== AI Move =====
  function doAIMove() {
    if (gameOver) return;

    const moveSAN = getAIMove(chess);
    if (!moveSAN) return;

    const result = chess.move(moveSAN);
    if (!result) return;

    // Track capture
    if (result.captured) {
      const capturedPiece = { type: result.captured, color: result.color === 'w' ? 'b' : 'w' };
      if (capturedPiece.color === 'w') {
        capturedWhite.push(capturedPiece);
      } else {
        capturedBlack.push(capturedPiece);
      }
    }

    // Highlight last move
    clearHighlights(squareMap);
    lastMove = { from: result.from, to: result.to };
    highlightSquare(squareMap, result.from, 'last-move');
    highlightSquare(squareMap, result.to, 'last-move');

    renderPieces();
    renderCaptured();
    updateStatus();

    if (chess.game_over()) {
      gameOver = true;
    }
  }

  // ===== Promotion dialog =====
  function showPromotionDialog(from, to) {
    awaitingPromotion = { from, to };
    promoOptions.innerHTML = '';

    const promotionPieces = ['q', 'r', 'b', 'n'];
    for (const type of promotionPieces) {
      const el = createPromoOptionElement(type, 'w');
      if (!el) continue;

      el.addEventListener('click', () => {
        promoOverlay.classList.remove('active');
        executeMove({ from: awaitingPromotion.from, to: awaitingPromotion.to, promotion: type });
        awaitingPromotion = null;
      });

      promoOptions.appendChild(el);
    }

    promoOverlay.classList.add('active');
  }

  // ===== Update status text =====
  function updateStatus() {
    const turn = chess.turn();
    const turnName = turn === 'w' ? 'Your' : "AI's";

    statusEl.classList.remove('check', 'gameover');

    if (chess.in_checkmate()) {
      const winner = turn === 'w' ? 'AI (Black)' : 'You (White)';
      statusEl.textContent = `Checkmate! ${winner} wins!`;
      statusEl.classList.add('gameover');
    } else if (chess.in_stalemate()) {
      statusEl.textContent = 'Stalemate — Draw!';
      statusEl.classList.add('gameover');
    } else if (chess.in_threefold_repetition()) {
      statusEl.textContent = 'Threefold repetition — Draw!';
      statusEl.classList.add('gameover');
    } else if (chess.insufficient_material()) {
      statusEl.textContent = 'Insufficient material — Draw!';
      statusEl.classList.add('gameover');
    } else if (chess.in_draw()) {
      statusEl.textContent = 'Draw!';
      statusEl.classList.add('gameover');
    } else if (chess.in_check()) {
      statusEl.textContent = `${turnName} turn — Check!`;
      statusEl.classList.add('check');
    } else {
      statusEl.textContent = `${turnName} turn`;
    }
  }

  // ===== Render captured pieces =====
  function renderCaptured() {
    capturedWhiteEl.innerHTML = '<span class="side-label">Lost:</span>';
    capturedBlackEl.innerHTML = '<span class="side-label">Won:</span>';

    // "Lost:" shows white pieces captured by AI
    for (const p of capturedWhite) {
      const el = createCapturedPieceElement(p);
      if (el) capturedWhiteEl.appendChild(el);
    }

    // "Won:" shows black pieces captured by you
    for (const p of capturedBlack) {
      const el = createCapturedPieceElement(p);
      if (el) capturedBlackEl.appendChild(el);
    }
  }

  // ===== Event listeners =====
  newGameBtn.addEventListener('click', init);

  // Close promotion dialog on overlay click
  promoOverlay.addEventListener('click', (e) => {
    if (e.target === promoOverlay) {
      promoOverlay.classList.remove('active');
      awaitingPromotion = null;
    }
  });

  // ===== Start =====
  init();
})();
