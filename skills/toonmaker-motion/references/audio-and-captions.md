# Audio, Narration, and Captions

## Narration source

Preserve the approved script. If the user supplies a voice recording, use it as the authoritative spoken performance. If generating speech, use only a TTS or voice tool that is actually available and permitted. State when voice generation is unavailable instead of pretending an audio file exists.

## Narration pacing

- Give important terms a moment to register.
- Do not force narration to fill every second.
- Leave short visual pauses after complex diagrams, numbers, or comparisons.
- Split overly long sentences into natural spoken units.
- Avoid placing a new key concept under a dense previous visual.

## Audio layers

Keep separate tracks or files for:

1. Voiceover.
2. Background music.
3. Sound effects and UI interaction sounds.

Voice must remain intelligible. Music should support the pacing without competing with speech. Use sound effects sparingly and attach them to meaningful visual events such as a card appearing, a process completing, or a key item being selected.

Use only user-provided, public-domain, or appropriately licensed audio. Track attribution and license details for every external asset.

## Synchronization

Use a single video timebase. Define cue start and end times relative to the video timeline. For the final render, align the audio start, frame sequence, and end duration. Avoid assuming that an audio file's duration equals the intended scene duration; inspect the actual file metadata or waveform when tools are available.

## Captions

Captions should:

- Match the actual spoken words.
- Be synchronized to speech, not merely split into equal scene lengths.
- Use concise phrase-sized segments.
- Avoid covering important UI cards, labels, or diagrams.
- Maintain high contrast and readable sizing.
- Include speaker labels only when they clarify who is speaking.

Export SRT or WebVTT when requested or useful. Keep captions separate from the graphic labels unless the user specifically wants burned-in captions. Do not place full paragraphs on screen.
