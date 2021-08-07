import { Text, SensoredText } from './model';
import { Strategy } from '../../../src';

export class UnreliableMediaHandler implements Strategy<Text, SensoredText> {
  evaluate(context: Text): boolean {
    return context.source === 'magazines' || context.source === 'socialmedia';
  }

  async execute(context: Text): Promise<SensoredText> {
    // Assume remote API call to sensoring service
    const sensored = context.content.replace('ass', 'buttock');

    const sensoredText: SensoredText = {
      ...context,
      sensored: sensored,
    };

    return sensoredText;
  }
}
