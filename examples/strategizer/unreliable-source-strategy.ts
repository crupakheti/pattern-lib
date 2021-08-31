import { Text, CensuredText } from './model';
import { Strategy } from '../../src';

export class UnreliableSourceStrategy implements Strategy<Text, CensuredText> {
  async evaluate(context: Text): Promise<boolean> {
    return context.source === 'magazines' || context.source === 'socialmedia';
  }

  async execute(context: Text): Promise<CensuredText> {
    // Assume remote API call to sensoring service
    const sensored = context.content.replace('ass', 'buttock');

    const sensoredText: CensuredText = {
      ...context,
      censuredContent: sensored,
    };

    return sensoredText;
  }
}
