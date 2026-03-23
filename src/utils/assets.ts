import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';
import type { DecodedFrame } from './helpers.js';

const cache = new Map<string, DecodedFrame>();

export function loadPng(relativePath: string): DecodedFrame {
  if (cache.has(relativePath)) {
    return cache.get(relativePath)!;
  }

  const fullPath = path.join(process.cwd(), 'assets/pictures/', relativePath);
  const buffer = fs.readFileSync(fullPath);

  console.log('Reading PNG file:');
  const png = PNG.sync.read(buffer);

  const frame: DecodedFrame = {
    width: png.width,
    height: png.height,
    data: png.data,
  };

  cache.set(relativePath, frame);
  return frame;
}

export function clearCache(): void {
  cache.clear();
}

export function getCacheSize(): number {
  return cache.size;
}
