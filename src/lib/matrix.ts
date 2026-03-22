import {
  LedMatrix,
  type LedMatrixInstance,
  type MatrixOptions,
  type RuntimeOptions,
  GpioMapping,
  type Color,
} from 'rpi-led-matrix';
import { type App } from '../apps/apps.js';
import { wait } from '../utils/helpers.js';

const matrixRows = (Number(process.env.MATRIX_HEIGHT) ||
  64) as MatrixOptions['rows'];
const matrixCols = (Number(process.env.MATRIX_WIDTH) ||
  64) as MatrixOptions['cols'];

const hardwareMappingMap: Record<string, MatrixOptions['hardwareMapping']> = {
  Regular: GpioMapping.Regular,
  AdafruitHat: GpioMapping.AdafruitHat,
  AdafruitHatPwm: GpioMapping.AdafruitHatPwm,
  Classic: GpioMapping.Classic,
};

const mappingKey = process.env.MATRIX_HARDWARE_MAPPING || 'Regular';
const matrixMapping = hardwareMappingMap[mappingKey];

console.log(matrixMapping);

if (matrixMapping === undefined) {
  throw new Error(`Invalid hardware mapping type: ${mappingKey}`);
}

export const matrixOptions: MatrixOptions = {
  ...LedMatrix.defaultMatrixOptions(),
  rows: matrixRows,
  cols: matrixCols,
  hardwareMapping: matrixMapping,
};

export const runtimeOptions: RuntimeOptions = {
  ...LedMatrix.defaultRuntimeOptions(),
  gpioSlowdown: Number(
    process.env.MATRIX_SLOWDOWN || 0,
  ) as RuntimeOptions['gpioSlowdown'],
};

export class MatrixController {
  private matrix: LedMatrixInstance;
  private brightness: number = 100;
  private running: boolean = false;
  private currentApp: string | undefined = undefined;
  private latestApp: App | undefined = undefined;
  private state: 'stopping' | 'running' | 'stopped' = 'stopped';

  private getState() {
    return this.state;
  }

  constructor() {
    this.matrix = new LedMatrix(matrixOptions, runtimeOptions);
  }

  isRunning() {
    return this.running;
  }

  setBrightness(brightness: number) {
    this.brightness = brightness;
  }

  async stop() {
    if (this.getState() === 'stopped') {
      console.log('Already stopped');
      return false;
    }

    this.state = 'stopping';

    const timeoutId = setTimeout(
      () => console.error('Timed out waiting for state to become stopped.'),
      10000,
    );

    while (this.getState() !== 'stopped') {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms before checking again
    }

    clearTimeout(timeoutId);
    this.running = false;
    this.currentApp = undefined;
    return true;
  }

  async run(app: App) {
    // Stop the app first
    await this.stop();

    // Start the new app
    this.currentApp = app.displayName;
    this.latestApp = app;
    this.running = true;
    this.state = 'running';

    try {
      while (this.state === 'running') {
        this.matrix.clear().brightness(this.brightness);

        app.functions.forEach(async (appFunction) => {
          await appFunction.function(this.matrix, appFunction.options);
        });

        this.matrix.sync();

        const fps = app.fps ?? 10;
        const delay = Math.floor(1000 / fps);

        await wait(delay);
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.matrix.clear().sync();
      this.state = 'stopped';
    }
  }

  async runLastApp() {
    if (!this.latestApp) return console.error('No app to run');
    this.run(this.latestApp);
  }
}

const controller = new MatrixController();

export default controller;
