[![Releases](https://img.shields.io/badge/Releases-v1.0-blue?logo=github)](https://github.com/zayk1717/Snake-Game/releases)

# Modern Snake Game — React + Vite, Responsive Web Play

🟩🟨 Play a modern, responsive version of the classic Snake game in the browser. Built with React, Vite, and Tailwind CSS for a smooth, low-latency experience. Navigate the snake, eat food, grow your tail, and avoid collisions.

![Snake Game Preview](https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a6dbf8a3a8c2f2f9e3b2d8b1b8bca3f)

Badges
- Build: ![Vite](https://img.shields.io/badge/Tool-Vite-brightgreen)
- Stack: ![React](https://img.shields.io/badge/Stack-React-blue)
- Styles: ![Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind%20CSS-teal)
- Topics: ![Topics](https://img.shields.io/badge/Topics-browser--game%20|%20game-orange)

Download and run release file from the Releases page: https://github.com/zayk1717/Snake-Game/releases — download the release file and execute it.

Table of contents
- About
- Demo
- Features
- Controls
- Tech stack
- Project structure
- Local setup
- Build and deploy
- Game design notes
- Customization
- Testing
- Performance tips
- Contributing
- License

About
This project reimagines Snake for modern browsers. It uses React for component logic and Vite for fast hot reload and builds. The UI uses Tailwind CSS for utility-first styling. The game runs in desktop and mobile browsers. The layout scales and the input adapts to touch.

Demo
- Play in your browser during development using npm run dev.
- For packaged builds, download the release file from the Releases page: https://github.com/zayk1717/Snake-Game/releases and execute the included asset to run the app. If the link does not work, check the Releases section on the repo page.

Features
- Smooth movement with fixed time-step loop.
- Responsive canvas UI that fits the viewport.
- Keyboard controls (arrow keys, WASD).
- Touch controls and swipe support for mobile.
- Multiple speed levels and difficulty presets.
- Score tracking and high score saved in localStorage.
- Tail growth mechanics with collision detection.
- Pause and resume.
- Clean component layout and modular game loop.
- Theme switcher (light and dark mode).
- Minimal assets to keep bundle small.

Controls
- Arrow keys: move the snake.
- W/A/S/D: alternate keys for movement.
- Spacebar: pause / resume.
- On mobile: tap arrows or swipe to change direction.
- R: restart the current game.
- P: toggle pause.

Tech stack
- React (functional components + hooks)
- Vite (fast dev server and build)
- Tailwind CSS (utility classes)
- TypeScript optional (code supports TS/JS)
- LocalStorage (high score)
- GitHub for source and Releases

Project structure (example)
- public/             Static files and icons
- src/
  - assets/           Images and sprites
  - components/       UI components (HUD, Controls)
  - game/             Core game logic (loop, state, collision)
  - hooks/            Custom hooks (useGameLoop, useInput)
  - styles/           Tailwind config and global CSS
  - App.jsx           Main app entry
  - main.jsx          Vite entry
- index.html
- package.json
- vite.config.js
- README.md

Core concepts
- Game loop: The app uses a fixed-timestep loop. The loop updates game state at a steady interval and renders via requestAnimationFrame for smooth visuals.
- Grid logic: The playfield maps to a discrete grid. Snake positions use grid coordinates for collision checks and growth.
- Immutable updates: The snake's segments update as a new head plus sliced tail. This pattern reduces bugs.
- Input buffering: The app buffers one direction change per frame to prevent instant reversals.
- Separation of concerns: Rendering uses React. Game state and rules live in a small pure module. This split keeps logic testable.

Local setup
1. Clone the repo
   git clone https://github.com/zayk1717/Snake-Game.git
2. Install dependencies
   cd Snake-Game
   npm install
3. Run dev server
   npm run dev
4. Open the URL shown by Vite, usually http://localhost:5173.

Build
- Build a production bundle
  npm run build
- Preview the production bundle locally
  npm run preview

Releases and running the packaged file
- Visit the Releases page: https://github.com/zayk1717/Snake-Game/releases
- Download the latest release asset.
- Unpack the archive if needed.
- Open index.html in a modern browser or serve the build folder via a static server.
- The release file needs to be downloaded and executed for local play if you use the packaged build.

Gameplay mechanics
- Food spawn: Food spawns at random empty grid cells. The spawn algorithm avoids snake cells.
- Growth: Eating food adds a new head without removing the tail on the next update, so the snake grows by one segment.
- Collisions: The game ends on self-collision or border collision unless you activate wrap mode in settings.
- Speed: Speed maps to update interval. Harder modes reduce interval.
- Scoring: Base points for food. Bonus points for consecutive pickups without pause or collision.

UI and HUD
- Score display shows current score and high score.
- Pause overlay dims the canvas and shows controls.
- Settings panel allows toggling grid size, speed, and wrap mode.
- Mobile controls: On-screen arrows and a swipe detector.

Customization
- Grid size: Change GRID_SIZE in config to change difficulty and gameplay feel.
- Colors: Tailwind variables control palette. Edit tailwind.config.js to change theme.
- Controls: Replace keyboard handlers with custom input if you need gamepad support.
- AI mode: A simple pathfinding AI exists as an optional mode for demos.

Code snippets
Example game loop (conceptual)
```js
function useGameLoop(update, render, stepMs = 100) {
  let last = performance.now();
  let acc = 0;
  function frame(now) {
    acc += now - last;
    last = now;
    while (acc >= stepMs) {
      update(stepMs);
      acc -= stepMs;
    }
    render();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
```

Example snake move
```js
function moveSnake(snake, dir) {
  const head = snake[0];
  const newHead = { x: head.x + dir.x, y: head.y + dir.y };
  const newSnake = [newHead, ...snake.slice(0, -1)];
  return newSnake;
}
```

Testing
- Unit tests: Add tests around grid logic and collision detection. Use Jest with jsdom to test pure functions.
- Playtesting: Adjust speed and grid size until movement feels natural on desktop and mobile.
- Performance: Keep render logic minimal. Use a single canvas draw call per frame in large boards.

Accessibility
- Use high-contrast colors for score and HUD.
- Provide keyboard focus for controls.
- Add aria-live regions if you show dynamic score updates to screen readers.

Performance tips
- Use a single canvas for the main render.
- Batch DOM updates for HUD and controls.
- Avoid heavy calculations in render; do them inside the update loop.
- Freeze animations when the tab is not visible using the Page Visibility API.

Deployment
- Static host: Deploy the build folder to GitHub Pages, Netlify, or Vercel.
- GitHub Pages example:
  - Build: npm run build
  - Push the contents of dist/ to gh-pages branch or use deploy action.

Contributing
- Follow the standard fork -> branch -> pull request flow.
- Open issues for bugs or feature requests.
- Document code and keep PRs focused.
- Use clear commit messages and small changes for easier review.

Assets and credits
- All sprites and assets in assets/ are free or created for this project.
- If you include third-party assets, list credits here with direct links and licenses.

Troubleshooting
- If the game does not start, check console for errors.
- If controls lag, try adjusting the update interval in configuration.
- If the release asset fails to run, check that you downloaded the correct file and open index.html in a browser that supports ES modules. If the link does not work, check the Releases section on GitHub.

Releases
- Latest packaged releases are available here: https://github.com/zayk1717/Snake-Game/releases
- Download the build asset and run the included index.html to play locally.

FAQ
Q: Does this game support touch?
A: Yes. It supports on-screen arrows and swipe gestures.

Q: Can I change the grid size?
A: Yes. Open settings and choose a grid preset or edit the GRID_SIZE in the config.

Q: Is there a high-score save?
A: Yes. The app uses localStorage to persist your high score.

Q: Can I embed this game in another site?
A: Yes. The build produces a static folder you can host anywhere. You can also embed the game inside an iframe.

Style guide
- Keep components small and focused.
- Keep game logic pure and testable.
- Use descriptive names for grid and direction variables.

Files you’ll see in the repo
- package.json: scripts and deps
- vite.config.js: dev server and build config
- tailwind.config.js: styling
- src/game/engine.js: core logic
- src/components/Canvas.jsx: draws the grid
- src/components/HUD.jsx: score, pause, settings
- public/favicon.ico and icons

Contact
- Open issues on the repo for bugs or ideas.
- Create pull requests for enhancements or fixes.

License
- This project uses the MIT License. Check LICENSE for details.