import { Font, type FontInstance } from 'rpi-led-matrix';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fontName(name: string) {
  return path.join(__dirname, `../../assets/fonts/${name}`);
}

const fonts: Record<string, FontInstance> = {
  '4x6.bdf': new Font('4x6', fontName('4x6.bdf')),
  '5x7.bdf': new Font('5x7', fontName('5x7.bdf')),
  '5x8.bdf': new Font('5x8', fontName('5x8.bdf')),
  '6x9.bdf': new Font('6x9', fontName('6x9.bdf')),
  '6x10.bdf': new Font('6x10', fontName('6x10.bdf')),
  '6x12.bdf': new Font('6x12', fontName('6x12.bdf')),
  '6x13.bdf': new Font('6x13', fontName('6x13.bdf')),
  '6x13B.bdf': new Font('6x13B', fontName('6x13B.bdf')),
  '6x13O.bdf': new Font('6x13O', fontName('6x13O.bdf')),
  '7x13.bdf': new Font('7x13', fontName('7x13.bdf')),
  '7x13B.bdf': new Font('7x13B', fontName('7x13B.bdf')),
  '7x13O.bdf': new Font('7x13O', fontName('7x13O.bdf')),
  '7x14.bdf': new Font('7x14', fontName('7x14.bdf')),
  '7x14B.bdf': new Font('7x14B', fontName('7x14B.bdf')),
  '8x13.bdf': new Font('8x13', fontName('8x13.bdf')),
  '8x13B.bdf': new Font('8x13B', fontName('8x13B.bdf')),
  '8x13O.bdf': new Font('8x13O', fontName('8x13O.bdf')),
  '9x15.bdf': new Font('9x15', fontName('9x15.bdf')),
  '9x15B.bdf': new Font('9x15B', fontName('9x15B.bdf')),
  '9x18.bdf': new Font('9x18', fontName('9x18.bdf')),
  '9x18B.bdf': new Font('9x18B', fontName('9x18B.bdf')),
  'clR6x12.bdf': new Font('clR6x12', fontName('clR6x12.bdf')),
  'helvR12.bdf': new Font('helvR12', fontName('helvR12.bdf')),
  'texgyre-27.bdf': new Font('texgyre-27', fontName('texgyre-27.bdf')),
  'tom-thumb.bdf': new Font('tom-thumb', fontName('tom-thumb.bdf')),
  '10x20.bdf': new Font('10x20', fontName('10x20.bdf')),
};
export default fonts;
