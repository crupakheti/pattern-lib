import { Strategizer } from '../../../src';
import { Text, Source, SensoredText } from './model';
import { sensorStrategizer } from './sensor-strategizer';

class App {
  constructor(private strategizer: Strategizer<Text, SensoredText>) {}

  async run(source: Source, content: string) {
    const text: Text = { source, content };

    console.log('Input: ', text);
    const processed = await this.strategizer.execute(text);
    console.log('Output: ', processed);
  }
}

const app = new App(sensorStrategizer);
console.log('\nProcessing Textbook ...');
app.run('textbook', 'Rhinos have big buttocks!').then((_) => {
  console.log('\nProcessing Magazine ...');
  app.run('magazines', 'Rhinos have big asss!');
});
