import { Transformer } from '../../../src';
import { Source } from '../strategy/model';
import { CategorizedText } from './model';
import { textTransformer } from './transformer';

class App {
  constructor(protected transformer: Transformer<CategorizedText>) {}

  async run(source: Source, content: string) {
    const text: CategorizedText = { source, content };

    console.log('Input: ', text);
    await this.transformer.execute(text);
    console.log('Output: ', text);
  }
}

const app = new App(textTransformer);
console.log('\nProcessing Textbook ...');
app
  .run('textbook', 'Lions are strong')
  .then((_) => {
    console.log('\nProcessing Magazine ...');
    app.run('magazines', 'Rhinos have delightful big asss!');
  })
  .then((_) => {
    console.log('\nProcessing Socialmedia ...');
    app.run('socialmedia', 'Deers have miserable small asss!');
  });
