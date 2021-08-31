import { DefaultStrategizer } from '../../src';
import { Text, CensuredText } from './model';
import { ReliableSourceStrategy as ReliableSourceStrategy } from './reliable-source-strategy';
import { UnreliableSourceStrategy as UnreliableSourceStrategy } from './unreliable-source-strategy';

export const censureStrategizer = new DefaultStrategizer<Text, CensuredText>()
  .register(new ReliableSourceStrategy())
  .register(new UnreliableSourceStrategy());
