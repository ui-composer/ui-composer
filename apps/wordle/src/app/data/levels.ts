import level1Words from './level1-words';
import level2Words from './level2-words';
import level3Words from './level3-words';

export const levels = {
  1: level1Words,
  2: level2Words,
  3: level3Words,
};

export type Level = keyof typeof levels;
