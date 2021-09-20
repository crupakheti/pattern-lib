import { DefaultStrategizer } from '../../src';
import { CategorizedText } from './model';

export const classificationStrategizer = DefaultStrategizer.create<CategorizedText, void>([
  {
    evaluate: async (text) => text.content.length < 20,
    execute: async (text) => {
      text.classification = 'word';
    },
  },
  {
    evaluate: async (text) => text.content.length >= 20 && text.content.length < 40,
    execute: async (text) => {
      text.classification = 'paragraph';
    },
  },
  {
    evaluate: async (text) => text.content.length >= 40 && text.content.length < 60,
    execute: async (text) => {
      text.classification = 'page';
    },
  },
  {
    evaluate: async (text) => text.content.length > 60 && text.content.length < 80,
    execute: async (text) => {
      text.classification = 'chapter';
    },
  },
  {
    evaluate: async (text) => text.content.length > 60,
    execute: async (text) => {
      text.classification = 'book';
    },
  },
]);
