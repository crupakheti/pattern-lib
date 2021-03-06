import { DefaultStrategizer } from '../../src';
import { CategorizedText } from './model';

const happyWords = ['content', 'cheer', 'mer', 'jo', 'hap', 'smil', 'fav', 'deli', 'gle'];

const sadWords = ['unhappy', 'sorrow', 'deject', 'regret', 'depress', 'down', 'miser', 'des'];

function contains(text: string, words: Array<string>): boolean {
  for (const word of words) {
    if (text.includes(word)) {
      return true;
    }
  }
  return false;
}

export const sentimentStrategizer = DefaultStrategizer.create<CategorizedText, void>([
  {
    evaluate: async (text) => contains(text.content, happyWords),
    execute: async (text) => {
      text.sentiment = 'happy';
    },
  },
  {
    evaluate: async (text) => contains(text.content, sadWords),
    execute: async (text) => {
      text.sentiment = 'sad';
    },
  },
  {
    evaluate: async (_) => true,
    execute: async (text) => {
      text.sentiment = 'flat';
    },
  },
]);
