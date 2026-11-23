import { getSceneAt, sceneProgress, VIDEO } from './timeline.js';

const C = {
  ink: '#17243a',
  inkSoft: '#40506a',
  paper: '#f7f8fc',
  paper2: '#edf1f8',
  teal: '#54c7b0',
  orange: '#f6a94b',
  lilac: '#9d91e8',
  white: '#ffffff'
};

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const easeOut = (t) => 1 - Math.pow(1 - clamp(t), 3);
const easeBack = (t) => {
  const x = clamp(t);
  const c1 = 1.35;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

function roundedRect(ctx, x, y, w, h, r, fill, stroke = null, lineWidth = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.lineWidth = lineWidth; ctx.strokeStyle = stroke; ctx.stroke(); }
}

function text(ctx, value, x, y, size, color, weight = 600, align = 'left') {
  ctx.font = `${weight} ${size}px Inter, ui-sans-serif, system-ui, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(value, x, y);
}

function background(ctx) {
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, VIDEO.width, VIDEO.height);
  ctx.save();
  ctx.globalAlpha = 0.34;
  ctx.strokeStyle = '#d8dfeb';
  ctx.lineWidth = 2;
  for (let x = 80; x < VIDEO.width; x += 80) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, VIDEO.height); ctx.stroke();
  }
  for (let y = 80; y < VIDEO.height; y += 80) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(VIDEO.width, y); ctx.stroke();
  }
  ctx.restore();
  ctx.fillStyle = C.ink;
  ctx.fillRect(0, 0, VIDEO.width, 16);
}

function mascot(ctx, x, y, scale, wave = 0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  // Compact illustrated guide: an accent, not a film character.
  roundedRect(ctx, -52, -8, 104, 118, 28, C.teal, C.ink, 8);
  ctx.fillStyle = C.orange;
  ctx.beginPath(); ctx.arc(0, -34, 42, 0, Math.PI * 2); ctx.fill();
  ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.fillStyle = C.ink;
  ctx.beginPath(); ctx.arc(-14, -38, 5, 0, Math.PI * 2); ctx.arc(14, -38, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -24, 13, 0.15, Math.PI - 0.15); ctx.lineWidth = 5; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(48, 24); ctx.lineTo(83, 3 + Math.sin(wave * Math.PI * 2) * 12); ctx.lineWidth = 11; ctx.strokeStyle = C.ink; ctx.stroke();
  roundedRect(ctx, -33, 110, 23, 28, 9, C.ink);
  roundedRect(ctx, 10, 110, 23, 28, 9, C.ink);
  ctx.restore();
}

function intro(ctx, p) {
  const e = easeOut(p * 1.25);
  ctx.save();
  ctx.translate(0, (1 - e) * 60);
  roundedRect(ctx, 160, 170, 1600, 730, 42, C.white, '#dce3ef', 3);
  roundedRect(ctx, 230, 245, 235, 56, 28, C.ink);
  text(ctx, 'TOONMAKER / MOTION', 347, 273, 21, C.white, 800, 'center');
  text(ctx, 'Good ideas deserve', 260, 445, 86, C.ink, 800);
  text(ctx, 'clear explanations.', 260, 550, 86, C.ink, 800);
  roundedRect(ctx, 260, 655, 580, 86, 26, C.paper2);
  text(ctx, 'A simple visual story, one step at a time.', 300, 699, 28, C.inkSoft, 600);
  mascot(ctx, 1425, 625 + Math.sin(p * Math.PI) * 16, 1.35, p);
  ctx.restore();
}

function stepCard(ctx, x, y, color, number, title, subtitle, p) {
  const e = easeBack(p);
  const lift = (1 - easeOut(p)) * 65;
  ctx.save();
  ctx.translate(x, y + lift);
  ctx.scale(0.92 + 0.08 * e, 0.92 + 0.08 * e);
  roundedRect(ctx, 0, 0, 430, 410, 32, C.white, '#dce3ef', 3);
  roundedRect(ctx, 34, 34, 78, 78, 24, color);
  text(ctx, String(number), 73, 73, 34, C.ink, 800, 'center');
  text(ctx, title, 34, 190, 42, C.ink, 800);
  text(ctx, subtitle, 34, 250, 25, C.inkSoft, 600);
  roundedRect(ctx, 34, 320, 360 * easeOut(p), 12, 6, color);
  ctx.restore();
}

function threeSteps(ctx, p) {
  roundedRect(ctx, 120, 115, 1680, 850, 42, C.white, '#dce3ef', 3);
  text(ctx, 'A CLEAR EXPLANATION HAS THREE PARTS', 190, 215, 31, C.inkSoft, 800);
  stepCard(ctx, 190, 330, C.orange, 1, 'Question', 'What are we solving?', clamp(p * 3.2));
  stepCard(ctx, 745, 330, C.teal, 2, 'Visual', 'Show how it works.', clamp((p - 0.22) * 3.2));
  stepCard(ctx, 1300, 330, C.lilac, 3, 'Takeaway', 'Make it memorable.', clamp((p - 0.46) * 3.2));
  ctx.save();
  ctx.strokeStyle = C.inkSoft;
  ctx.lineWidth = 7;
  ctx.setLineDash([12, 16]);
  ctx.beginPath(); ctx.moveTo(625, 535); ctx.lineTo(735, 535); ctx.moveTo(1180, 535); ctx.lineTo(1290, 535); ctx.stroke();
  ctx.restore();
}

function takeaway(ctx, p) {
  const e = easeOut(p * 1.3);
  ctx.save();
  roundedRect(ctx, 170, 185, 1580, 710, 46, C.ink);
  roundedRect(ctx, 260, 280, 190, 54, 27, C.teal);
  text(ctx, 'THE TAKEAWAY', 355, 307, 21, C.ink, 800, 'center');
  ctx.translate(0, (1 - e) * 50);
  text(ctx, 'One question.', 270, 470, 78, C.white, 800);
  text(ctx, 'One clear visual.', 270, 575, 78, C.teal, 800);
  text(ctx, 'One memorable idea.', 270, 680, 78, C.orange, 800);
  mascot(ctx, 1470, 700, 1.05, p);
  ctx.restore();
}

export function drawFrame(ctx, timeSeconds, width = VIDEO.width, height = VIDEO.height) {
  const t = clamp(timeSeconds, 0, VIDEO.duration);
  const scene = getSceneAt(t);
  const p = sceneProgress(scene, t);
  ctx.save();
  ctx.setTransform(width / VIDEO.width, 0, 0, height / VIDEO.height, 0, 0);
  ctx.clearRect(0, 0, VIDEO.width, VIDEO.height);
  background(ctx);
  if (scene.id === 'intro') intro(ctx, p);
  else if (scene.id === 'three-steps') threeSteps(ctx, p);
  else takeaway(ctx, p);
  ctx.restore();
}
