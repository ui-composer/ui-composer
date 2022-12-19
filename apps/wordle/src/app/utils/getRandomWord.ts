import { Level, levels } from '../data/levels';

export function getRandomWord(activeLevel: Level) {
  const arr = levels[activeLevel];
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
