import { VIDEO } from './timeline.js';
import { drawFrame } from './draw.js';

const canvas = document.querySelector('#stage');
const ctx = canvas?.getContext('2d', { alpha: false });
const playButton = document.querySelector('#play-toggle');
const scrubber = document.querySelector('#scrubber');
const readout = document.querySelector('#time-readout');

if (!canvas || !ctx) throw new Error('Canvas 2D is not available in this browser.');

let currentTime = 0;
let isPlaying = false;
let lastTick = 0;
let rafId = 0;

function updateReadout() {
  if (scrubber) scrubber.value = String(currentTime);
  if (readout) readout.textContent = `${currentTime.toFixed(2)} / ${VIDEO.duration.toFixed(2)} s`;
}

export function renderAt(seconds) {
  const t = Math.max(0, Math.min(VIDEO.duration, Number(seconds) || 0));
  currentTime = t;
  drawFrame(ctx, t, canvas.width, canvas.height);
  updateReadout();
  document.documentElement.dataset.renderReady = 'true';
  return t;
}

window.renderAt = renderAt;
window.assetsReady = Promise.resolve();

function tick(now) {
  if (!isPlaying) return;
  if (!lastTick) lastTick = now;
  const delta = (now - lastTick) / 1000;
  lastTick = now;
  const next = currentTime + delta;
  if (next >= VIDEO.duration) {
    renderAt(VIDEO.duration);
    isPlaying = false;
    if (playButton) playButton.textContent = 'Play';
    return;
  }
  renderAt(next);
  rafId = requestAnimationFrame(tick);
}

function setPlaying(value) {
  isPlaying = Boolean(value);
  if (playButton) playButton.textContent = isPlaying ? 'Pause' : 'Play';
  if (isPlaying) {
    if (currentTime >= VIDEO.duration) renderAt(0);
    lastTick = 0;
    rafId = requestAnimationFrame(tick);
  } else {
    cancelAnimationFrame(rafId);
  }
}

playButton?.addEventListener('click', () => setPlaying(!isPlaying));
scrubber?.addEventListener('input', (event) => {
  setPlaying(false);
  renderAt(Number(event.currentTarget.value));
});

const query = new URLSearchParams(location.search);
const initialTime = Number(query.get('t') ?? 0);
renderAt(Number.isFinite(initialTime) ? initialTime : 0);
if (query.has('manual')) setPlaying(false);
else if (query.get('autoplay') === '1') setPlaying(true);
