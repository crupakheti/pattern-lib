import { Strategizer } from '../../src';
import { Text, Source, CensuredText } from './model';

export class App {
  constructor(private strategizer: Strategizer<Text, CensuredText>) {}

  async run(source: Source, content: string): Promise<string> {
    const text: Text = { source, content };
    const processed = await this.strategizer.execute(text);
    return processed?.censuredContent || text.content;
  }
}
