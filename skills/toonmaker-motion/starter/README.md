# Browser Animation Starter

A small, independent Canvas 2D starter for the ToonMaker Motion workflow. It is intentionally not built with Remotion or another video framework.

## Preview

Requires Node.js 18 or newer.

```bash
npm run serve
```

Open `http://127.0.0.1:4173` in a browser. Use the play button or scrubber to preview the 12-second demonstration.

## Render a frame sequence

The capture helper uses Playwright if it is installed in the project:

```bash
npm install --save-dev playwright
npx playwright install chromium
npm run render-frames -- --duration 12 --fps 30 --width 1920 --height 1080 --output renders/frames
```

The helper expects the preview server to be running. It writes sequential PNG frames. Encode them separately with FFmpeg; see the skill's `references/rendering-and-export.md`.

## Customize

- Edit `src/timeline.js` to define scene timing.
- Edit `src/draw.js` to create compositions and deterministic scene drawing.
- Edit `src/main.js` only when preview controls or asset loading need to change.
- Keep `window.renderAt(seconds)` deterministic so the browser renderer can request any frame directly.

The included visuals are a technical demonstration of the drawing engine, not finished content for a user's topic. Replace them with the approved script and storyboard.
