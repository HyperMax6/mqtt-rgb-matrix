import type { LedMatrixInstance } from 'rpi-led-matrix';
import type { AppFunctionOptions } from './apps.js';
import fonts from '../lib/fonts.js';

async function text(matrix: LedMatrixInstance, options?: AppFunctionOptions) {
  const color = options?.mainColor ?? 0xffffff;
  const text = options?.text;
  const font = options?.font ?? '9x18.bdf';

  if (!text) throw new Error('No text given');
  if (!fonts[font]) throw new Error('Font was not found');

  const panelHeight = matrix.height();
  const panelWidth = matrix.width();

  const stringWidth = fonts[font]?.stringWidth(text);
  const charHeight = fonts[font]?.height();

  const xOffset = Math.floor((panelWidth - stringWidth) / 2) - 1;
  const yOffset = Math.floor((panelHeight - charHeight) / 2) - 1;

  matrix.fgColor(color).font(fonts[font]).drawText(text, xOffset, yOffset);
}

export default text;
