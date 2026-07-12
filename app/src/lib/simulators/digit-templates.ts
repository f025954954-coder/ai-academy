// תבניות 8x8 בסיסיות לכל ספרה — לצורך הדגמת k-Nearest-Neighbor (ראה ההסבר בשיעור על הבחירה בגישה הזו)
// 1 = פיקסל מלא, 0 = ריק

type Grid = number[][];

function fromRows(rows: string[]): Grid {
  return rows.map((row) => row.split("").map(Number));
}

export const DIGIT_TEMPLATES: Record<number, Grid> = {
  0: fromRows([
    "00111100",
    "01100110",
    "01100110",
    "01100110",
    "01100110",
    "01100110",
    "01100110",
    "00111100",
  ]),
  1: fromRows([
    "00011000",
    "00111000",
    "00011000",
    "00011000",
    "00011000",
    "00011000",
    "00011000",
    "01111110",
  ]),
  2: fromRows([
    "00111100",
    "01100110",
    "00000110",
    "00001100",
    "00011000",
    "00110000",
    "01100000",
    "01111110",
  ]),
  3: fromRows([
    "00111100",
    "01100110",
    "00000110",
    "00011100",
    "00000110",
    "00000110",
    "01100110",
    "00111100",
  ]),
  4: fromRows([
    "00001100",
    "00011100",
    "00101100",
    "01001100",
    "01111110",
    "00001100",
    "00001100",
    "00001100",
  ]),
  5: fromRows([
    "01111110",
    "01100000",
    "01100000",
    "01111100",
    "00000110",
    "00000110",
    "01100110",
    "00111100",
  ]),
  6: fromRows([
    "00011100",
    "00110000",
    "01100000",
    "01111100",
    "01100110",
    "01100110",
    "01100110",
    "00111100",
  ]),
  7: fromRows([
    "01111110",
    "00000110",
    "00001100",
    "00011000",
    "00110000",
    "00110000",
    "00110000",
    "00110000",
  ]),
  8: fromRows([
    "00111100",
    "01100110",
    "01100110",
    "00111100",
    "01100110",
    "01100110",
    "01100110",
    "00111100",
  ]),
  9: fromRows([
    "00111100",
    "01100110",
    "01100110",
    "01100110",
    "00111110",
    "00000110",
    "00001100",
    "00111000",
  ]),
};

export function flatten(grid: Grid): number[] {
  return grid.flat();
}

export function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0));
}

export interface ClassificationResult {
  digit: number;
  confidence: number;
  distances: { digit: number; distance: number }[];
}

export function classifyDigit(grid: Grid): ClassificationResult {
  const input = flatten(grid);
  const distances = Object.entries(DIGIT_TEMPLATES).map(([digit, template]) => ({
    digit: Number(digit),
    distance: euclideanDistance(input, flatten(template)),
  }));
  distances.sort((a, b) => a.distance - b.distance);
  const best = distances[0];
  const worst = distances[distances.length - 1].distance || 1;
  const confidence = Math.round((1 - best.distance / worst) * 100);
  return { digit: best.digit, confidence, distances };
}
