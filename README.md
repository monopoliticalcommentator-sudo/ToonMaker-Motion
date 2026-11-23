# ToonMaker Motion

A self-contained skill plugin for turning a topic into a planned, scripted, and rendered motion-graphics video.

The visual approach is **UI-led motion design with a playful illustrated style**. The video is built from animated interface-like panels, cards, diagrams, typography, icons, charts, and transitions. Small illustrated characters may appear as supporting accents, but the result is not a character-led cartoon film.

## Install

Install this folder as a Claude Code plugin, or place the `skills/toonmaker-motion` directory in a supported skills directory.

## Included

- `skills/toonmaker-motion/SKILL.md`: the main production workflow
- `references/`: original production, design, animation, audio, and rendering guidance
- `templates/`: script and storyboard templates
- `examples/`: a sample storyboard specification
- `starter/`: a small browser-based Canvas 2D animation starter, written without Remotion
- `scripts/`: storyboard validation utility

## Rendering requirements

The starter preview uses browser-native HTML, CSS, JavaScript, SVG where appropriate, and Canvas 2D. MP4 export additionally requires a working browser automation setup and FFmpeg. The skill must inspect the available environment and report missing tools honestly rather than claim a render succeeded.
