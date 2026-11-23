# Project Structure

Use a compact, understandable project structure. Adapt it to the task rather than forcing every folder into every project.

```text
video-project/
  script.md
  storyboard.json
  package.json                 # only when Node dependencies or scripts are needed
  index.html
  src/
    main.js
    timeline.js
    scenes/
    components/
    styles.css
  assets/
    images/
    icons/
    audio/
    fonts/
  captions/
    subtitles.srt              # when produced
  renders/
    frames/                    # temporary or retained if useful
    final.mp4
  README.md
  THIRD-PARTY-NOTICES.md       # when external assets or code require attribution
```

## Organization rules

- Keep script and storyboard at the project root.
- Keep reusable components separate from scene-specific compositions.
- Keep assets local and reference them with project-relative paths.
- Keep generated frames and temporary audio out of source folders.
- Do not include unused assets, abandoned exports, duplicate files, or dependency caches in the delivery ZIP.
- Include a concise README with setup, preview, render, and output instructions.
- Keep package dependencies minimal and explain why each nontrivial dependency is required.
- Preserve editable source code in the final delivery.

## Project hygiene

Use descriptive names such as `scene-03-comparison.js`, `icon-water.svg`, and `voiceover-en.wav`. Avoid ambiguous names such as `new2-final-real.js`. Remove temporary output only after confirming that the final video and necessary source files are intact.
