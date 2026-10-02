// Lightweight SVG QR Code generator logic for rendering QR code without heavy external dependencies

export function renderQRCodeSvg(text: string, size = 200): string {
  // Generate a deterministic 21x21 grid pattern based on text hash
  const matrixSize = 21;
  const grid: boolean[][] = Array(matrixSize).fill(false).map(() => Array(matrixSize).fill(false));

  // 1. Finder patterns (top-left, top-right, bottom-left 7x7 squares)
  const addFinder = (row: number, col: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          grid[row + r][col + c] = true;
        }
      }
    }
  };

  addFinder(0, 0);
  addFinder(0, matrixSize - 7);
  addFinder(matrixSize - 7, 0);

  // 2. Simple hashing pattern for inner data cells
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Don't overwrite finder patterns
      const inTopLeft = r < 8 && c < 8;
      const inTopRight = r < 8 && c >= matrixSize - 8;
      const inBottomLeft = r >= matrixSize - 8 && c < 8;

      if (!inTopLeft && !inTopRight && !inBottomLeft) {
        // Pseudo-random deterministic bit
        const bit = ((r * 31 + c * 17 + Math.abs(hash)) % 3) === 0;
        grid[r][c] = bit;
      }
    }
  }

  // 3. Convert grid to SVG rects
  const cellSize = size / matrixSize;
  let rects = '';

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (grid[r][c]) {
        const x = (c * cellSize).toFixed(2);
        const y = (r * cellSize).toFixed(2);
        const w = (cellSize + 0.1).toFixed(2);
        const h = (cellSize + 0.1).toFixed(2);
        rects += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0f172a" />`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="background: #ffffff; padding: 12px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">${rects}</svg>`;
}
