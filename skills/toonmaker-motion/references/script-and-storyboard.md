# Script and Storyboard Specification

## Script document

Use this order in `script.md`:

1. Title and one-sentence premise.
2. Audience, language, target runtime, aspect ratio, tone, and learning outcome.
3. Key takeaway.
4. Visual direction summary.
5. Scene-by-scene production table.
6. Complete narration transcript.
7. Factual source notes, if applicable.

Each scene row must include:

- Scene ID and time range.
- Scene purpose.
- Spoken narration.
- Exact on-screen words, numbers, labels, or captions that are not generated from narration automatically.
- Main visual composition.
- Entrance, emphasis, continuous motion, and exit.
- Sound cue or music note.
- Transition to the next scene.

## Timing rules

Use seconds with decimals when necessary. Start the first scene at 0. Scene start and end times must be monotonic. The final scene must end at the declared duration. Do not create overlaps unless the overlap is intentional and documented.

Narration duration is an estimate until real audio exists. Once voice audio is available, retime visual beats and captions to the actual waveform or transcript timing without changing the spoken meaning.

## Storyboard JSON schema

The JSON file is an implementation brief, not a replacement for the readable script. Use this structure:

```json
{
  "meta": {
    "title": "A clear video title",
    "duration": 24,
    "fps": 30,
    "width": 1920,
    "height": 1080,
    "language": "en"
  },
  "scenes": [
    {
      "id": "scene-01",
      "start": 0,
      "end": 6,
      "purpose": "Introduce the central question",
      "narration": "The exact narration for this scene.",
      "onScreenText": ["A short headline", "A concise supporting label"],
      "visual": {
        "composition": "A large rounded title panel occupies the center, with a small illustrated guide character in one corner.",
        "elements": ["title panel", "supporting icon", "small guide character"],
        "palette": ["#18243A", "#F6F7FB", "#FFB547"]
      },
      "motion": [
        "Panel scales from 96% to 100% over 300 ms.",
        "Headline reveals by line with a 100 ms stagger."
      ],
      "audio": "Narration begins immediately; soft UI tick on the headline reveal.",
      "transitionOut": "The panel slides left as the next card enters from the right."
    }
  ]
}
```

## Content guidance

- `purpose` should describe what the viewer learns or understands.
- `narration` should contain the exact spoken words for the scene.
- `onScreenText` should be concise and should not duplicate every spoken sentence.
- `visual.composition` should describe hierarchy and layout, not just list assets.
- `visual.elements` should identify reusable parts.
- `motion` should use implementable verbs and timing language.
- `audio` should describe narration, music, and sound-effect intention.
- `transitionOut` should describe how the scene hands off to the next scene.

## Scene count and pacing

Use as many scenes as the explanation requires, not a fixed quota. Most scenes should communicate one main idea. For a short 60–90 second video, roughly 6–12 scenes is often a useful starting range, but the script determines the actual count.

Avoid constant motion. Allow important layouts to settle long enough to read. Use motion to reveal relationships, sequence, comparison, or emphasis, not merely to keep the screen busy.
