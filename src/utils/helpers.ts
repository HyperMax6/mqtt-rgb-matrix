import { type LedMatrixInstance } from 'rpi-led-matrix';

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type DecodedFrame = {
  width: number;
  height: number;
  data: Buffer;
};

export function drawFrame(matrix: LedMatrixInstance, frame: DecodedFrame) {
  const { width, height, data } = frame;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;

      const r = data[idx] ?? 0;
      const g = data[idx + 1] ?? 0;
      const b = data[idx + 2] ?? 0;

      matrix.fgColor({ r, g, b }).setPixel(x, y);
    }
  }
}
