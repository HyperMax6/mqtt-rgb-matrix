import type { LedMatrixInstance } from 'rpi-led-matrix';

async function lgbtq(matrix: LedMatrixInstance) {
  const colourArr = [
    0xe50000, 0xff8d00, 0xffee00, 0x028121, 0x004cff, 0x770088,
  ];

  const colourHeight = Math.floor(matrix.height() / colourArr.length);

  const startY = Math.floor((matrix.height() % colourArr.length) / 2);

  for (let i = startY; i - startY < colourHeight * colourArr.length; i++) {
    const colour = colourArr[Math.floor((i - startY) / colourHeight)];
    if (colour) {
      matrix
        .fgColor(colour)
        .drawLine(0, Math.floor(i), matrix.width(), Math.floor(i));
    }
  }
}

export default lgbtq;
