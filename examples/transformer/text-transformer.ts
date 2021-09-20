import { DefaultTransformer } from '../../src';
import { censureStrategizer } from '../strategizer/censure-strategizer';
import { CategorizedText } from './model';
import { classificationStrategizer } from './classification-strategizer';
import { sentimentStrategizer } from './sentiment-strategizer';

export const textTransformer = DefaultTransformer.create<CategorizedText>([
  {
    evaluate: async (text) => text.source === 'textbook',
    execute: async (text) => classificationStrategizer.execute(text),
  },
  {
    evaluate: async (text) => text.source !== 'textbook',
    execute: async (text) => sentimentStrategizer.execute(text),
  },
  {
    evaluate: async (_: any) => true,
    execute: async (text) => {
      const output = await censureStrategizer.execute(text);
      text.censuredContent = output?.censuredContent || text.content;
    },
  },
]);
