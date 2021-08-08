import { Text, SensoredText } from './model';
import { Strategy } from '../../src';

export class ReliableMediaHandler implements Strategy<Text, SensoredText> {
  evaluate(context: Text): boolean {
    return context.source === 'textbook' || context.source === 'newspaper';
  }

  async execute(context: Text): Promise<SensoredText> {
    // No sensoring required
    const sensoredText: SensoredText = {
      ...context,
      sensored: context.content,
    };
    return sensoredText;
  }
}
