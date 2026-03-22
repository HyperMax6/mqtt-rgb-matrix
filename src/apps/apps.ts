import type { Color, LedMatrixInstance } from 'rpi-led-matrix';
import lgbtq from './lgbtq.js';
import digitalClock from './digital-clock.js';
import text from './text.js';

export type AppFunction = (
  matrix: LedMatrixInstance,
  options?: AppFunctionOptions,
) => Promise<void>;

export type AppFunctionOptions = {
  mainColor?: Color | number;
  position?: 'centered' | 'top' | 'bottom';
  font?: string;
  text?: string;
};

export type App = {
  displayName: string;
  functions: {
    function: AppFunction;
    options?: AppFunctionOptions;
  }[];
  fps?: number;
};

const apps: Record<string, App> = {
  LGBTQ: {
    displayName: 'LGBTQ',
    functions: [{ function: lgbtq }],
  },
  'Digital Clock': {
    displayName: 'Digital Clock',
    functions: [
      {
        function: digitalClock,
        options: { font: '9x18.bdf', position: 'centered' },
      },
    ],
    fps: 4,
  },
  'LGBTQ Clock': {
    displayName: 'LGBTQ Clock',
    functions: [
      { function: lgbtq },
      {
        function: digitalClock,
        options: { font: '9x18.bdf', position: 'centered' },
      },
    ],
    fps: 4,
  },
  Connected: {
    displayName: 'Connected',
    functions: [
      {
        function: text,
        options: { font: '6x9.bdf', text: 'Connected!', position: 'centered' },
      },
    ],
  },
};

export default apps;
