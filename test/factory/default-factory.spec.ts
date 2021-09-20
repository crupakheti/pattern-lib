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
      const strategy: Strategy<string, Fruit> = {
        evaluate: async (type) => type === 'apple',
        execute: async (_) => new Apple(),
      };
      const strategizer = DefaultStrategizer.create<string, Fruit>().register(strategy);

      const factory = DefaultFactory.create([], strategizer);
      expect(factory.registrations).toEqual([strategy]);
    });

    it('should store the strategies when factory gets created', () => {
      const strategy: Strategy<string, Fruit> = {
        evaluate: async (type) => type === 'apple',
        execute: async (_) => new Apple(),
      };

      const factory = DefaultFactory.create([strategy]);
      expect(factory.registrations).toEqual([strategy]);
    });
  });

  describe('Strategy Registration', () => {
    it('should be able to register and unregister a strategy', () => {
      const factory = DefaultFactory.create();
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
      factory = DefaultFactory.create<string, Fruit>()
        .register({
          evaluate: async (type) => type === 'apple',
          execute: async (_) => new Apple(),
        })
        .register({
          evaluate: async (type) => type === 'orange',
          execute: async (_) => new Orange(),
        });
    });

    it('should create a new object when a strategy is available', async () => {
      const fruit = await factory.createObject('orange');
      expect(fruit?.getColor()).toEqual('orange');
    });

    it('should return undefined when a strategy is not available', async () => {
      const fruit = await factory.createObject('kiwi');
      expect(fruit).toBe(undefined);
    });
  });
});
