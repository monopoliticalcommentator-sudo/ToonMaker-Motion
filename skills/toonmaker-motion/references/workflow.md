# Production Workflow

This document defines the order of work. The central rule is that the video is planned in writing before any animation is built.

## Phase A: Brief

Record the known constraints:

| Field | Meaning |
|---|---|
| Topic | What the video explains |
| Audience | Who should understand it |
| Learning outcome | What viewers should know or be able to explain afterward |
| Duration | Target runtime |
| Language | Narration and on-screen language |
| Aspect ratio | 16:9, 9:16, 1:1, or a specified custom frame |
| Tone | Serious, friendly, playful, formal, etc. |
| Source basis | User files, cited research, supplied notes, or general knowledge |
| Delivery | Script only, source project, preview, or rendered video |

When the user does not specify a field, infer a reasonable default. Do not ask a long questionnaire when the brief is sufficient to begin.

## Phase B: Topic map

Write a private or deliverable outline before scripting:

1. One-sentence central idea.
2. Three to six supporting points, depending on duration.
3. Any prerequisite term that needs a plain-language definition.
4. A likely misconception to correct, if relevant.
5. A concrete example, analogy, or demonstration.
6. A closing takeaway.

A short video should not attempt to teach an entire subject. Narrow the scope rather than compressing every detail into unreadable speed.

## Phase C: Script

Write the script in `script.md`. Include an opening hook, explanation, evidence or example, and conclusion. Assign a communication purpose to every scene. Check that narration can be spoken naturally within its timing.

Approximate narration planning range: 120–150 spoken words per minute for a clear explainer. This is a planning aid, not a rigid rule. Leave pauses for visual comprehension, especially after introducing a diagram or important number.

## Phase D: Storyboard

Convert each scene to a timed storyboard entry. The storyboard must describe the composition in concrete terms: what appears, where it appears, how it moves, how long it remains, and what visual state follows it.

Avoid vague instructions such as “make it pop” or “add some animation.” Specify the motion: “the three cards enter from below with 120 ms stagger, settle at 100% scale, then the middle card expands while the side cards dim.”

## Phase E: Design system

Create reusable tokens for color, type, spacing, shapes, shadows, icon treatment, and motion. Establish them before building all scenes so the visual language remains coherent.

## Phase F: Implementation

Build the stage, shared UI components, reusable graphic primitives, scene compositions, timeline, and asset loader. Keep content data separate from drawing and animation logic where practical.

## Phase G: Sound and rendering

Align narration and captions to the same scene clock. Render the requested frame size and frame rate. Inspect the final encoded file for visual errors, audio issues, timing drift, and accidental blank frames.

## Phase H: Delivery

Provide the script, storyboard, source, assets, final video, and subtitles as applicable. State exactly what was created and what was not. Do not conceal a failed render behind a preview link.

## Scope decision

- **Script-only request:** deliver the script and storyboard; do not create a video.
- **Video request:** produce the script and storyboard first, then proceed to implementation and rendering.
- **Revision request:** identify whether the requested change affects the script, storyboard, design system, animation, audio, or render. Update dependent files consistently.
