import { Strategizer } from '../../src';
import { CategorizedText } from './model';

export const classificationStrategizer = new Strategizer<CategorizedText, void>([
  {
    evaluate: (text) => text.content.length < 20,
    execute: async (text) => {
      text.classification = 'word';
    },
  },
  {
    evaluate: (text) => text.content.length >= 20 && text.content.length < 40,
    execute: async (text) => {
      text.classification = 'paragraph';
    },
  },
  {
    evaluate: (text) => text.content.length >= 40 && text.content.length < 60,
    execute: async (text) => {
      text.classification = 'page';
    },
  },
  {
    evaluate: (text) => text.content.length > 60 && text.content.length < 80,
    execute: async (text) => {
      text.classification = 'chapter';
    },
  },
  {
    evaluate: (text) => text.content.length > 60,
    execute: async (text) => {
      text.classification = 'book';
    },
  },
]);
