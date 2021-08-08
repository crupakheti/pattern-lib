import { App } from './app';
import { sensorStrategizer } from './sensor-strategizer';

const app = new App(sensorStrategizer);
console.log('\nProcessing Textbook ...');
app.run('textbook', 'Rhinos have big buttocks!').then((_) => {
  console.log('\nProcessing Magazine ...');
  app.run('magazines', 'Rhinos have big asss!');
});
