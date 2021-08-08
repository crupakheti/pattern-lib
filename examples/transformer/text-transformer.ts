import { Transformer } from '../../src';
import { sensorStrategizer } from '../strategizer/sensor-strategizer';
import { CategorizedText } from './model';
import { classificationStrategizer } from './classification-strategizer';
import { sentimentStrategizer } from './sentiment-strategizer';

export const textTransformer = new Transformer<CategorizedText>([
  {
    evaluate: (text) => text.source === 'textbook',
    execute: async (text) => classificationStrategizer.execute(text),
  },
  {
    evaluate: (text) => text.source !== 'textbook',
    execute: async (text) => sentimentStrategizer.execute(text),
  },
  {
    evaluate: (_: any) => true,
    execute: async (text) => {
      const output = await sensorStrategizer.execute(text);
      text.sensored = output?.sensored || text.content;
    },
  },
]);
