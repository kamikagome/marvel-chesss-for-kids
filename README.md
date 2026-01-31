# Marvel Chess — Birthday Party Edition

A fully playable browser-based chess game featuring hand-drawn SVG Marvel character pieces, a festive birthday party theme, and an AI opponent. Built with vanilla JavaScript — no frameworks, no build tools, just open and play.

## Demo

> Open `index.html` in any modern browser to start playing.

## Features

- **Complete Chess Engine** — All standard rules including castling, en passant, pawn promotion, check, checkmate, stalemate, and draw detection (powered by [chess.js](https://github.com/jhlywa/chess.js))
- **Marvel Character Pieces** — Each chess piece is represented by an inline SVG head portrait of a Marvel character
- **AI Opponent** — Play as White against a random-move AI (Black)
- **Interactive Board** — Click-to-select with highlighted valid moves, capture indicators, and last-move tracking
- **Birthday Party Theme** — Animated floating balloons, confetti background, gradient colors, and a rainbow board border
- **Pawn Promotion Dialog** — Choose which Marvel character to promote to with a visual picker
- **Captured Pieces Tray** — Track lost and won pieces throughout the game
- **Zero Dependencies** — No npm, no bundler. One HTML file, one CSS file, four JS modules, and a CDN link

## Marvel Piece Mapping

| Chess Piece | Marvel Character | Label | Visual |
|:-----------:|:----------------:|:-----:|:-------|
| King        | Iron Man         | IM    | Red/gold helmet, glowing blue eyes |
| Queen       | Spider-Man       | SP    | Red mask, web pattern, white eyes |
| Bishop      | Black Panther    | BP    | Dark mask, silver claw marks, vibranium necklace |
| Knight      | Captain America  | CA    | Blue helmet with "A", wing details, chin strap |
| Rook        | Rhino            | RH    | Gray armored head with horn |
| Pawn        | Green Goblin     | GG    | Green face, purple hood, menacing grin |

White and Black teams are distinguished by a glowing ring around each piece (white ring vs. dark ring).

## Getting Started

```bash
# Clone the repository
git clone https://github.com/<your-username>/marvel-chess.git

# Open in browser (no server required)
open marvel-chess/index.html

# Or use a local server
cd marvel-chess
python3 -m http.server 8080
# Visit http://localhost:8080
```

No installation or build step needed. The only external dependency (chess.js) loads from a CDN.

## How to Play

1. **Select** a white piece by clicking it — valid moves are highlighted
2. **Move** by clicking a highlighted square (dots for empty squares, red border for captures)
3. **Wait** for the AI to respond with its move
4. **Promote** pawns by choosing a character from the popup dialog
5. **Reset** anytime with the New Game button

## Project Structure

```
marvel-chess/
├── index.html           # Entry point — loads all scripts and styles
├── css/
│   └── style.css        # Board, piece styling, party theme, UI components
├── js/
│   ├── Piece.js         # SVG character portraits and Marvel piece mapping
│   ├── Board.js         # 8x8 board rendering, coordinate labels, highlighting
│   ├── AI.js            # Random legal move AI opponent
│   └── Game.js          # Game orchestration — turns, clicks, state, captures
└── README.md
```

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Rendering | HTML / CSS Grid | Board layout, piece positioning, party decorations |
| Visuals | Inline SVG | Character head portraits for all 6 piece types |
| Game Logic | [chess.js](https://github.com/jhlywa/chess.js) v0.10.3 | Move validation, check/mate detection, game state |
| Scripting | Vanilla JavaScript (ES6) | Game loop, DOM manipulation, AI, event handling |
| Animations | CSS Transitions | Piece hover effects, highlight transitions |

## Architecture

The codebase follows a clean separation of concerns across four modules:

- **`Piece.js`** — Defines the Marvel-to-chess mapping and generates SVG DOM elements for board pieces, captured piece icons, and promotion options
- **`Board.js`** — Creates the 8x8 CSS Grid board with coordinate labels and provides highlight/clear functions for selection, valid moves, captures, and last-move indicators
- **`AI.js`** — Exposes a single function that picks a random legal move from the chess engine
- **`Game.js`** — IIFE that wires everything together: initializes the chess engine, handles click events, manages turn flow (human then AI), tracks captures, and updates the UI

## License

MIT
