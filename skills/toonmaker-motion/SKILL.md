---
name: toonmaker-motion
description: Plan, script, storyboard, build, and render modern educational or explanatory videos using UI-led motion graphics with a playful cartoon-inspired visual style. Use when asked to make an explainer, educational animation, animated presentation, infographic video, or short video from a topic. The video should look like a modern animated interface, not a cartoon movie; illustrated characters are optional supporting elements only.
version: 1.0.0
---

# ToonMaker Motion

Create a complete video from a topic by following a script-first production workflow. The finished result is a **modern motion-graphics video with a cartoon-inspired UI design language**. It is not a cartoon film, animated sitcom, or character-led story.

## Core visual identity

Prioritize animated visual communication:

- UI-like panels, cards, tooltips, badges, progress bars, meters, menus, tabs, windows, and modular layouts.
- Infographics, timelines, flowcharts, maps, comparisons, charts, labeled diagrams, icons, and large kinetic typography.
- Rounded geometry, expressive outlines, clean shapes, playful colors, subtle texture, and deliberate visual hierarchy.
- Smooth transitions, satisfying micro-interactions, clear visual cause-and-effect, and strong composition.
- A small number of illustrated characters may act as guides, reactions, or visual punctuation. Keep them secondary to the information.

Do **not** turn the project into a cartoon movie. Do not build the video around character dialogue, continuous character acting, cinematic story scenes, elaborate fictional environments, or character-led plot beats. Characters must support an idea, not replace the visual explanation.

## Required production order

### 1. Understand the request

Identify the topic, intended audience, language, approximate duration, platform, aspect ratio, tone, and any supplied source material. Use the user's stated preferences. When details are missing, choose sensible defaults and state them briefly; ask only when a missing detail blocks production.

Default starting point when the user gives no constraints:

- Audience: general audience, with plain-language explanations.
- Language: the user's language.
- Duration: 60–90 seconds.
- Format: 16:9, 1920×1080, 30 fps.
- Tone: engaging, clear, warm, lightly playful, not childish.
- Visual style: bright or balanced modern UI motion graphics with a restrained accent palette.

For a vertical short, use 9:16 and recompose the layout instead of merely cropping a landscape design.

### 2. Evaluate and structure the topic

Determine the central message, what the audience should understand by the end, the prerequisite concepts, and the most useful order of explanation. Split complicated subjects into a small number of digestible ideas. Remove tangents that do not advance the learning goal.

For factual, current, or specialized topics, verify important claims using available reliable sources when tools permit. Distinguish confirmed facts from assumptions and examples. Never invent statistics, quotations, citations, study results, or expert consensus. When source files are supplied, use them as the primary basis and do not silently replace their findings.

### 3. Write the complete video script FIRST

Before creating animation code or assets, create `script.md` using `templates/script-template.md` as the structure. It must include:

- Working title, audience, purpose, tone, target duration, language, aspect ratio, and key takeaway.
- A concise opening hook and a logical beginning-to-end explanation.
- Scene-by-scene timing, narration, on-screen text, visual composition, motion, sound, and transition notes.
- A complete narration transcript in reading order.
- Source notes for factual claims when applicable.

Narration and visuals must complement one another. Do not place the entire narration on screen. Keep on-screen wording short and readable. Give each scene one primary communication goal.

The script is the production source of truth. Do not start building the final video before the script and scene plan exist. If the user asks only for a script or planning document, stop after delivering it. If the user requests a finished video, continue from the completed script without adding an unnecessary approval pause. Do not silently change the meaning of the script during production.

### 4. Convert the script into a timed storyboard

Create `storyboard.json` using `templates/storyboard-template.json`. Every scene must have a unique ID, start and end time, narration, on-screen text, visual description, motion direction, and transition. Scene timings must cover the full video without accidental gaps or overlaps. Keep text, shape, color, and timing choices explicit enough to implement.

Validate the storyboard with:

```bash
node scripts/validate-storyboard.mjs storyboard.json
```

Fix all validation errors before animation work. The validator checks structure and timing; it does not judge whether the educational content is true or visually effective.

### 5. Define the visual system

Before making individual scenes, set a compact design system:

- Background and surface colors.
- Primary, secondary, and accent colors with contrast checks.
- Typography roles and scale.
- Panel, card, border, radius, shadow, and outline rules.
- Icon and illustration style.
- Motion language: easing, duration ranges, entrances, exits, and emphasis behavior.
- Character role and maximum visual prominence, if characters are used.

Use the same system throughout the video. Vary layout and composition to avoid repetitive slides.

### 6. Build the animation without Remotion

Do not use Remotion, Remotion packages, Remotion templates, or Remotion-specific APIs. Build a self-contained animation project using browser-native technologies:

- HTML for the stage and semantic structure.
- CSS for responsive layout, visual styling, and simple transitions.
- SVG for crisp icons, diagrams, vector illustrations, and character accents.
- JavaScript with Canvas 2D and/or SVG scene composition for timed animation.
- A deterministic timeline driven by an explicit video time value.
- Node.js for local project utilities and rendering orchestration when needed.

Choose Canvas 2D for large numbers of moving shapes or frame-based drawing; choose SVG/HTML for crisp text, panels, diagrams, and interface-like layouts. Combining them is acceptable. Do not introduce a large framework or a dependency merely for convenience. Inspect the environment before choosing optional libraries.

Every scene must be renderable at an arbitrary timestamp. Animation must be a pure function of the requested time wherever practical. Do not rely on wall-clock timers, random values, uncontrolled CSS animation progress, or user interaction state for final rendering. Seed any needed randomness and derive positions, opacity, scale, and progress from timeline time.

Use the included `starter/` as a small implementation reference, not as a fixed design or a substitute for a topic-specific video. Replace its sample visuals with the actual storyboard content.

### 7. Produce audio and captions

Use the supplied narration or create voice audio only through tools actually available in the environment. Match the script and audio; do not paraphrase silently. Mix music and sound effects beneath speech, keep speech intelligible, and use licensed or user-provided audio. Add timed captions when requested or when they materially improve accessibility. See `references/audio-and-captions.md`.

### 8. Render the video

Inspect available browser automation and FFmpeg tools. Render at the exact requested dimensions and frame rate. Use deterministic frame capture or another verifiable export method. Encode audio and video with matching durations. Create the final MP4 when the required tools are available.

If MP4 rendering is not possible, deliver the complete runnable source project and explain precisely which dependency or capability is missing. Never label a preview, still frame, GIF, or source project as a finished MP4.

### 9. Quality-check and deliver

Check the rendered video, not merely the source code. Review the opening, every scene transition, representative middle frames, and final frame. Check the entire video for visual errors and audio synchronization when playback tools are available.

Deliver as applicable:

- `script.md`
- `storyboard.json`
- Complete source project and assets
- Final rendered video, normally MP4
- Captions/subtitles, normally SRT or WebVTT
- A short note describing actual render settings and any limitations

Never leave essential scenes as placeholders, omit referenced assets, or claim that a file was rendered or tested unless it was actually produced and checked.

## Reference guide

Load only the references needed for the current task:

- `references/workflow.md`: production phases and decision points.
- `references/script-and-storyboard.md`: script format and storyboard schema.
- `references/visual-language.md`: UI-led cartoon-inflected art direction.
- `references/animation-engine.md`: deterministic browser animation architecture.
- `references/audio-and-captions.md`: narration, sound, timing, and subtitles.
- `references/rendering-and-export.md`: frame capture, encoding, and delivery.
- `references/project-structure.md`: source project organization.
- `references/quality-control.md`: visual, factual, and technical checks.
- `references/scene-recipes.md`: repeatable compositions for common explanation types.
- `references/research-and-fact-checking.md`: source handling and factual accuracy.

## Non-negotiable rules

1. Script first, animation second.
2. UI-led motion graphics are the main visual language.
3. Character illustrations are optional supporting elements, never the main film format.
4. No Remotion or Remotion-derived implementation.
5. No invented facts, fake citations, fake assets, or false render claims.
6. Keep source files editable and include the complete project needed to reproduce the video.
