# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

No test framework is configured.

## Architecture

**Stack:** React 19 + Vite 7, Tailwind CSS v4, shadcn/ui (new-york style), Three.js via @react-three/fiber.

**Entry point:** `main.jsx` (root, outside `src/`) → `src/frontend/App.jsx` → pages.

**Path alias:** `@` resolves to `src/` (configured in both `vite.config.js` and `jsconfig.json`).

**Frontend structure** lives entirely under `src/frontend/`:
- `pages/` — full-page route components
- `components/` — reusable UI components
- `lib/utils.js` — exports `cn()` (clsx + tailwind-merge) for conditional class merging

**Backend** (`src/backend/`) is an empty placeholder — not yet implemented.

## Key Components

**`LaserFlow.jsx`** — Performance-aware 3D WebGL background effect using a custom RawShaderMaterial with a 238-line GLSL fragment shader. Features volumetric fog, animated laser beams, mouse-tilt tracking, ResizeObserver/IntersectionObserver integration, and automatic FPS-based quality reduction. Accepts props to customize colors, speed, and intensity.

**`AuthenticationPage.jsx`** — Full-screen login/signup toggle UI using `LaserFlow` as background. Currently the only rendered page (`App.jsx` renders only `<Auth />`).

## Styling

Tailwind CSS v4 with a custom OKLch-based theme defined in `src/index.css`. Theme tokens use CSS custom properties (`--color-*`, `--radius-*`). Dark mode is toggled via a `.dark` class. shadcn components are aliased to `@/ui`.

The React Compiler (Babel plugin) is enabled in `vite.config.js` for automatic memoization — avoid manual `useMemo`/`useCallback` unless profiling shows a need.
