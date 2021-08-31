import { App } from './app';
import { censureStrategizer } from './censure-strategizer';

const app = new App(censureStrategizer);

const textBookInput = 'Rhinos have big buttocks!';
const magazineInput = 'Rhinos have big asss!';

console.log('Textbook Input:', textBookInput);
app
  .run('textbook', textBookInput)
  .then((textbookOutput) => {
    console.log('Textbook Output:', textbookOutput);

    console.log('Magazine Input:', magazineInput);
    return app.run('magazines', magazineInput);
  })
  .then((magazineOutput) => {
    console.log('Magazine Output:', magazineOutput);
  });
