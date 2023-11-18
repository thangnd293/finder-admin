import seedrandom from "seedrandom";

export function randomColor(count: number, seed: string) {
  const rng = seedrandom(seed);
  return Array.from({ length: count }, () => {
    const r = Math.floor(rng() * 255);
    const g = Math.floor(rng() * 255);
    const b = Math.floor(rng() * 255);
    return `rgb(${r},${g},${b})`;
  });
}

export function withOpacity(color: string, opacity: number) {
  const [r, g, b] = color
    .replace("rgb(", "")
    .replace(")", "")
    .split(",")
    .map((item) => parseInt(item));
  return `rgba(${r},${g},${b},${opacity})`;
}

export function hexToRgba(hex: string, opacity: number = 1) {
  const [r, g, b] = hex
    .replace("#", "")
    .match(/.{1,2}/g)!
    .map((item) => parseInt(item, 16));

  return `rgba(${r},${g},${b},${opacity})`;
}
