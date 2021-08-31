import { DefaultFactory, DefaultStrategizer, Factory, Strategy } from '../../src';

interface Fruit {
  getColor(): string;
}

class Apple implements Fruit {
  getColor(): string {
    return 'red';
  }
}

class Orange implements Fruit {
  getColor(): string {
    return 'orange';
  }
}

describe('Factory', () => {
  describe('Construction', () => {
    it('should store the strategizer when factory gets created', () => {
      const strategizer = new DefaultStrategizer<string, Fruit>().register({
        evaluate: async (type) => type === 'apple',
        execute: async (_) => new Apple(),
      });

      const factory = new DefaultFactory([], strategizer);
      expect(factory['strategizer']).toBe(strategizer);
    });

    it('should use supplied strategies in the strategizer when factory gets created', () => {
      const strategies: Array<Strategy<string, Fruit>> = [
        {
          evaluate: async (type) => type === 'apple',
          execute: async (_) => new Apple(),
        },
      ];

      const factory = new DefaultFactory(strategies);
      expect((factory['strategizer'] as any)['strategies']).toBe(strategies);
    });
  });

  describe('Strategy Registration', () => {
    it('should be able to register and unregister a strategy', () => {
      const factory = new DefaultFactory();
      const strategy = { evaluate: undefined as any, execute: undefined as any };

      const self = factory.register(strategy);
      expect(self).toBe(factory);

      let unregistered = factory.unregister(strategy);
      expect(unregistered).toBe(true);

      unregistered = factory.unregister(strategy);
      expect(unregistered).toBe(false);
    });
  });

  describe('Object Creation', () => {
    let factory: Factory<string, Fruit>;

    beforeEach(() => {
      const strategizer = new DefaultStrategizer<string, Fruit>()
        .register({
          evaluate: async (type) => type === 'apple',
          execute: async (_) => new Apple(),
        })
        .register({
          evaluate: async (type) => type === 'orange',
          execute: async (_) => new Orange(),
        });

      factory = new DefaultFactory([], strategizer);
    });

    it('should create a new object when a strategy is available', async () => {
      const fruit = await factory.create('orange');
      expect(fruit?.getColor()).toEqual('orange');
    });

    it('should return undefined when a strategy is not available', async () => {
      const fruit = await factory.create('kiwi');
      expect(fruit).toBe(undefined);
    });
  });
});
