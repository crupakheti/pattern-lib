import { App } from './app';
import { textTransformer } from './text-transformer';

const app = new App(textTransformer);

console.log('\nProcessing Textbook ...');
app
  .run('textbook', 'Lions are strong')
  .then((_) => {
    console.log('\nProcessing Magazine ...');
    app.run('magazines', 'Rhinos have delightfully big asss!');
  })
  .then((_) => {
    console.log('\nProcessing Socialmedia ...');
    app.run('socialmedia', 'Deers have miserably small asss!');
  });
