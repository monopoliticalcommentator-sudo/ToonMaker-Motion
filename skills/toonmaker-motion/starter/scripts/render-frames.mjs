#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

function readArg(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const url = readArg('--url', 'http://127.0.0.1:4173/?manual=1');
const duration = Number(readArg('--duration', '12'));
const fps = Number(readArg('--fps', '30'));
const width = Number(readArg('--width', '1920'));
const height = Number(readArg('--height', '1080'));
const outputDir = path.resolve(readArg('--output', 'renders/frames'));

if (![duration, fps, width, height].every(Number.isFinite) || duration <= 0 || fps <= 0 || width <= 0 || height <= 0) {
  console.error('Invalid render settings. Duration, fps, width, and height must be positive numbers.');
  process.exit(2);
}

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is not installed. Install it in this project or use an available browser automation tool, then retry.');
  process.exit(2);
}

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => typeof window.renderAt === 'function' && document.documentElement.dataset.renderReady === 'true');
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; if (window.assetsReady) await window.assetsReady; });

  const frameCount = Math.round(duration * fps);
  for (let frame = 0; frame < frameCount; frame += 1) {
    const time = frame / fps;
    await page.evaluate((t) => window.renderAt(t), time);
    await page.locator('#stage').screenshot({ path: path.join(outputDir, `frame-${String(frame + 1).padStart(6, '0')}.png`) });
    if ((frame + 1) % fps === 0 || frame + 1 === frameCount) {
      console.log(`Rendered ${frame + 1}/${frameCount} frames`);
    }
  }
  console.log(`Frame sequence created at ${outputDir}`);
  console.log('Encode the frames with FFmpeg using the same frame rate and requested audio tracks.');
} finally {
  await browser.close();
}
