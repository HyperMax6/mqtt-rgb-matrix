import type { LedMatrixInstance } from 'rpi-led-matrix';
import type { AppFunctionOptions } from './apps.js';
import fonts from '../lib/fonts.js';

async function digitalClock(
  matrix: LedMatrixInstance,
  options?: AppFunctionOptions,
) {
  const color = options?.mainColor ?? 0xffffff;
  const font = options?.font ?? '9x18.bdf';

  if (!fonts[font]) throw new Error('Font was not found');

  const panelHeight = matrix.height();
  const panelWidth = matrix.width();

  const now = new Date();
  const time = now.toLocaleTimeString('en-GB').substring(0, 5);

  const stringWidth = fonts[font]?.stringWidth(time);
  const charHeight = fonts[font]?.height();

  const xOffset = Math.floor((panelWidth - stringWidth) / 2) - 1;
  const yOffset = Math.floor((panelHeight - charHeight) / 2) - 1;

  matrix.fgColor(color).font(fonts[font]).drawText(time, xOffset, yOffset);
}

export default digitalClock;
