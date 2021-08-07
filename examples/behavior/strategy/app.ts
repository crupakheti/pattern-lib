import { Strategizer } from '../../../src';
import { Text, Source, SensoredText } from './model';

export class App {
  constructor(private strategizer: Strategizer<Text, SensoredText>) {}

  async run(source: Source, content: string) {
    const text: Text = { source, content };

    console.log('Input: ', text);
    const processed = await this.strategizer.execute(text);
    console.log('Output: ', processed);
  }
}
