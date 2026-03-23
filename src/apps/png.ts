import type { LedMatrixInstance } from 'rpi-led-matrix';
import type { AppFunctionOptions } from './apps.js';
import { loadPng } from '../utils/assets.js';
import { drawFrame } from '../utils/helpers.js';

async function png(matrix: LedMatrixInstance, options?: AppFunctionOptions) {
  if (!options?.path) return console.error('No path given');

  const frame = loadPng(options.path);
  drawFrame(matrix, frame);
}

export default png;
