#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2];
if (!input || input === '--help' || input === '-h') {
  console.log('Usage: node scripts/validate-storyboard.mjs <storyboard.json>');
  process.exit(input ? 0 : 2);
}

const filePath = path.resolve(process.cwd(), input);
let data;
try {
  data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
} catch (error) {
  console.error(`Could not read valid JSON from ${filePath}: ${error.message}`);
  process.exit(1);
}

const errors = [];
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
const near = (a, b) => Math.abs(a - b) <= 0.001;

if (!isObject(data)) {
  errors.push('Root must be a JSON object.');
} else {
  const meta = data.meta;
  if (!isObject(meta)) {
    errors.push('meta must be an object.');
  } else {
    if (!isNonEmptyString(meta.title)) errors.push('meta.title must be a non-empty string.');
    if (!Number.isFinite(meta.duration) || meta.duration <= 0) errors.push('meta.duration must be a positive number.');
    if (!Number.isInteger(meta.fps) || meta.fps < 1 || meta.fps > 120) errors.push('meta.fps must be an integer from 1 to 120.');
    if (!Number.isInteger(meta.width) || meta.width < 1) errors.push('meta.width must be a positive integer.');
    if (!Number.isInteger(meta.height) || meta.height < 1) errors.push('meta.height must be a positive integer.');
    if (!isNonEmptyString(meta.language)) errors.push('meta.language must be a non-empty string.');
  }

  if (!Array.isArray(data.scenes) || data.scenes.length === 0) {
    errors.push('scenes must be a non-empty array.');
  } else {
    const ids = new Set();
    let previousEnd = 0;
    data.scenes.forEach((scene, index) => {
      const label = `scenes[${index}]`;
      if (!isObject(scene)) {
        errors.push(`${label} must be an object.`);
        return;
      }
      if (!isNonEmptyString(scene.id)) errors.push(`${label}.id must be a non-empty string.`);
      else if (ids.has(scene.id)) errors.push(`${label}.id duplicates "${scene.id}".`);
      else ids.add(scene.id);

      if (!Number.isFinite(scene.start)) errors.push(`${label}.start must be a number.`);
      if (!Number.isFinite(scene.end)) errors.push(`${label}.end must be a number.`);
      if (Number.isFinite(scene.start) && Number.isFinite(scene.end)) {
        if (scene.start < 0) errors.push(`${label}.start cannot be negative.`);
        if (scene.end <= scene.start) errors.push(`${label}.end must be greater than start.`);
        if (index === 0 && !near(scene.start, 0)) errors.push('The first scene must start at 0 seconds.');
        if (index > 0 && !near(scene.start, previousEnd)) {
          errors.push(`${label}.start (${scene.start}) must meet the previous scene end (${previousEnd}); no unplanned gaps or overlaps are allowed.`);
        }
        previousEnd = scene.end;
      }

      if (!isNonEmptyString(scene.purpose)) errors.push(`${label}.purpose must be a non-empty string.`);
      if (!isNonEmptyString(scene.narration)) errors.push(`${label}.narration must be a non-empty string.`);
      if (!Array.isArray(scene.onScreenText) || scene.onScreenText.some((v) => typeof v !== 'string')) {
        errors.push(`${label}.onScreenText must be an array of strings.`);
      }
      if (!isObject(scene.visual)) errors.push(`${label}.visual must be an object.`);
      else {
        if (!isNonEmptyString(scene.visual.composition)) errors.push(`${label}.visual.composition must be a non-empty string.`);
        if (!Array.isArray(scene.visual.elements) || scene.visual.elements.some((v) => !isNonEmptyString(v))) {
          errors.push(`${label}.visual.elements must be an array of non-empty strings.`);
        }
        if (scene.visual.palette !== undefined && (!Array.isArray(scene.visual.palette) || scene.visual.palette.some((v) => typeof v !== 'string'))) {
          errors.push(`${label}.visual.palette must be an array of strings when supplied.`);
        }
      }
      if (!Array.isArray(scene.motion) || scene.motion.length === 0 || scene.motion.some((v) => !isNonEmptyString(v))) {
        errors.push(`${label}.motion must be a non-empty array of non-empty strings.`);
      }
      if (!isNonEmptyString(scene.audio)) errors.push(`${label}.audio must be a non-empty string.`);
      if (!isNonEmptyString(scene.transitionOut)) errors.push(`${label}.transitionOut must be a non-empty string.`);
    });

    if (isObject(meta) && Number.isFinite(meta.duration) && data.scenes.length > 0) {
      if (!near(previousEnd, meta.duration)) {
        errors.push(`The last scene must end at meta.duration (${meta.duration}); it currently ends at ${previousEnd}.`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Storyboard validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Storyboard valid: ${data.scenes.length} scene(s), ${data.meta.duration}s, ${data.meta.width}×${data.meta.height} at ${data.meta.fps} fps.`);
