# Browser Animation Engine Architecture

This project uses a small, custom browser animation system. It is intentionally independent of Remotion and is not a wrapper around another video framework.

## Rendering model

The central render function receives an absolute time in seconds:

```js
renderAt(timeSeconds);
```

Given the same scene data, assets, viewport, and time value, it should produce the same frame. A frame must not depend on how quickly the browser reached that time.

## Recommended layers

- HTML stage: viewport, optional accessibility text, and mounting point.
- SVG layer: crisp text, vector diagrams, icons, and paths.
- Canvas layer: complex or numerous moving shapes, particles, and composited illustration.
- CSS: static design tokens, layout, typography, and responsive preview behavior.
- JavaScript timeline: scene selection, local scene progress, easing, interpolation, and asset timing.

A project may use SVG/HTML only, Canvas only, or a combination. Choose the smallest implementation that meets the storyboard.

## Time model

For each scene, define `start` and `end` in seconds. Local scene time is:

```js
const localTime = Math.max(0, Math.min(time - scene.start, scene.end - scene.start));
const progress = localTime / (scene.end - scene.start);
```

Use reusable functions for easing, clamping, interpolation, stagger, and opacity. Derive all animation values from the absolute time and scene data.

```js
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const lerp = (from, to, amount) => from + (to - from) * amount;
const easeOutCubic = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
```

## Determinism rules

- Do not use `setInterval` or `setTimeout` to advance the final video clock.
- Do not use unseeded `Math.random()` for composition or particles.
- Do not use CSS animation state as the sole source of final frame timing.
- Do not derive animation from elapsed wall-clock time.
- Load fonts and images before capturing frames.
- Wait for all assets and layout measurements before rendering.
- Prefer explicit scene boundaries over hidden state transitions.

A browser preview may provide play/pause and scrubbing controls. Those controls must call the same `renderAt(time)` function used by frame export.

## Asset handling

Use vector shapes for simple graphic elements. Use raster images only when the visual benefit justifies them. Keep assets local and include them in the project. Use descriptive, stable filenames. Record the source and license of third-party materials.

## Responsive preview versus render dimensions

Keep a fixed logical composition size, such as 1920×1080, and scale it proportionally for preview. Do not reflow the actual render layout unpredictably based on the browser window. For each target aspect ratio, compose a deliberate layout.

## Scene architecture

Keep scene logic modular. A useful structure is:

```text
src/
  main.js           # preview controls and renderer entry point
  timeline.js       # absolute-time scene selection
  scenes/
    scene-01.js
    scene-02.js
  components/
    panel.js
    card.js
    icon.js
    character-accent.js
  styles.css
  assets/
```

Share components when they genuinely repeat. Avoid creating an abstraction for every one-off shape.

## Export boundary

The animation engine produces a frame at a requested time. A separate renderer captures each frame, and an encoder combines frames with audio. Keep these responsibilities separate so a preview bug, frame-capture bug, and encoding bug can be diagnosed independently.
