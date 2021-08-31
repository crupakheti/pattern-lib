import { Text, CensuredText } from './model';
import { Strategy } from '../../src';

export class ReliableSourceStrategy implements Strategy<Text, CensuredText> {
  async evaluate(context: Text): Promise<boolean> {
    return context.source === 'textbook' || context.source === 'newspaper';
  }

  async execute(context: Text): Promise<CensuredText> {
    // No sensoring required
    const sensoredText: CensuredText = {
      ...context,
      censuredContent: context.content,
    };
    return sensoredText;
  }
}
