import seedrandom from 'seedrandom';

const randomFixSeed = seedrandom('Over my dead body');

export default function randomNum(min: number = 0, max: number): number {
  return Math.floor(randomFixSeed() * (max - min + 1) + min);
}
