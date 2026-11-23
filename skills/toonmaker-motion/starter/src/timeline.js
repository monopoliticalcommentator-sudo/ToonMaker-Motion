export const VIDEO = Object.freeze({ width: 1920, height: 1080, fps: 30, duration: 12 });

export const SCENES = Object.freeze([
  { id: 'intro', start: 0, end: 4 },
  { id: 'three-steps', start: 4, end: 8 },
  { id: 'takeaway', start: 8, end: 12 }
]);

export function getSceneAt(timeSeconds) {
  const t = Math.max(0, Math.min(VIDEO.duration, Number(timeSeconds) || 0));
  return SCENES.find((scene, index) => t >= scene.start && (t < scene.end || index === SCENES.length - 1)) ?? SCENES[0];
}

export function sceneProgress(scene, timeSeconds) {
  const duration = scene.end - scene.start;
  return Math.max(0, Math.min(1, (timeSeconds - scene.start) / duration));
}
