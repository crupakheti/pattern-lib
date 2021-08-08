import { Transformer } from '../../src';
import { Source } from '../strategizer/model';
import { CategorizedText } from './model';

export class App {
  constructor(protected transformer: Transformer<CategorizedText>) {}

  async run(source: Source, content: string) {
    const text: CategorizedText = { source, content };

    console.log('Input: ', text);
    await this.transformer.execute(text);
    console.log('Output: ', text);
  }
}
