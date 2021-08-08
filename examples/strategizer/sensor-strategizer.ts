import { Strategizer } from '../../src';
import { Text, SensoredText } from './model';
import { ReliableMediaHandler } from './reliable-media-handler';
import { UnreliableMediaHandler } from './unreliable-media-handler';

export const sensorStrategizer = new Strategizer<Text, SensoredText>()
  .register(new ReliableMediaHandler())
  .register(new UnreliableMediaHandler());
