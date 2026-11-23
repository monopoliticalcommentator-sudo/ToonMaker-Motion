# Rendering and Export

## Inspect the environment first

Before promising an MP4, check for:

- Node.js version and ability to run the project.
- A compatible browser executable or browser automation package.
- FFmpeg availability for video encoding and audio muxing.
- Available disk space for frame sequences and temporary audio.
- Required fonts, images, audio, and other local assets.

Do not install large dependencies without a reason or user authorization where required.

## Frame capture

A common deterministic workflow is:

1. Start the local project server.
2. Launch a browser automation process.
3. Open the fixed composition viewport.
4. Wait for fonts and images to finish loading.
5. For each frame index `n`, calculate `t = n / fps`.
6. Call the project's `renderAt(t)` function.
7. Wait for the browser to finish painting and capture the stage.
8. Verify the first, middle, and final frames before encoding.

Use zero-padded sequential filenames, for example `frame-000001.png`. Capture the exact stage element, not the browser chrome. Keep frame dimensions identical.

## Frame count and duration

For a duration `D` seconds and frame rate `F`, use a consistent frame-count convention throughout. A common count is `round(D × F)` frames, with frame timestamps `n / F` for `n = 0 ... count - 1`. The final video duration may differ by less than one frame due to quantization. Report the actual encoded duration rather than implying sample-perfect timing.

## Encoding

Use FFmpeg or another available, verifiable encoder. A typical H.264 delivery target is MP4 with `libx264`, `yuv420p`, and a broadly compatible audio codec such as AAC. Choose quality settings appropriate to content and file-size constraints. Preserve the exact intended dimensions and frame rate.

Example command pattern for sequential PNG frames:

```bash
ffmpeg -framerate 30 -i frames/frame-%06d.png \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -r 30 \
  -movflags +faststart video.mp4
```

When adding audio, map the intended audio stream explicitly, choose a suitable audio codec, and set the final duration based on the video timeline. Do not use `-shortest` blindly if it could truncate the intended final scene.

## Validation

After encoding:

- Read the output metadata with FFprobe or an equivalent tool.
- Confirm dimensions, frame rate, codecs, and duration.
- Play the file or inspect a representative sample of frames.
- Listen to the opening, middle, and ending where playback is available.
- Check the final audio does not clip or cut off.
- Confirm the last scene has a proper ending rather than an abrupt cut.

## Honest fallback

If the environment lacks a browser, automation tool, FFmpeg, or another essential dependency, provide the source project and exact missing requirement. A source project is not an MP4. A sequence of still frames is not a finished video. A silent preview is not a narrated final cut.
