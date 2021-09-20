import { Strategy, Strategizer, DefaultStrategizer } from '../../src';

describe('DefaultStrategizer', () => {
  describe('Construction', () => {
    it('should have empty strategy array intialized by default', () => {
      const strategizer = DefaultStrategizer.create() as DefaultStrategizer<unknown, unknown>;
      expect(strategizer.registrations).toEqual([]);
    });

    it('should be able to intialize strategizer with default strategies', () => {
      const strategies: Array<Strategy<any, any>> = [
        {
          evaluate: undefined as any,
          execute: undefined as any,
        },
      ];

      const strategizer = DefaultStrategizer.create(strategies) as DefaultStrategizer<unknown, unknown>;
      expect(strategizer.registrations).toEqual(strategies);
    });
  });

  describe('Strategy Registration', () => {
    it('should be able to register a strategy', () => {
      const strategizer = DefaultStrategizer.create() as DefaultStrategizer<unknown, unknown>;
      const strategy = { evaluate: undefined as any, execute: undefined as any };
      const self = strategizer.register(strategy);

      expect(self).toBe(strategizer);
      expect(strategizer.registrations).toEqual([strategy]);
    });

    it('should be able to unregister a strategy', () => {
      const strategizer = DefaultStrategizer.create();
      const strategy = { evaluate: undefined as any, execute: undefined as any };
      strategizer.register(strategy);

      let unregistered = strategizer.unregister(strategy);
      expect(unregistered).toBe(true);

      unregistered = strategizer.unregister(strategy);
      expect(unregistered).toBe(false);
    });
  });

  describe('Execution', () => {
    let strategizer: Strategizer<string, string>;

    it('should execute a strategy whose condition satisfies evaluation', async () => {
      strategizer = DefaultStrategizer.create<string, string>()
        .register({
          evaluate: async (input) => input === 'identity',
          execute: async (input) => Promise.resolve(input),
        })
        .register({
          evaluate: async (input) => input !== 'identity',
          execute: async (input) => Promise.resolve(input.toUpperCase()),
        });

      let output = await strategizer.execute('identity');
      expect(output).toEqual('identity');

      output = await strategizer.execute('Something Else')!;
      expect(output).toEqual('SOMETHING ELSE');
    });

    it('should return udefined when no strategies are applicable', async () => {
      strategizer = DefaultStrategizer.create<string, string>().register({
        evaluate: async (input) => input === 'identity',
        execute: async (input) => Promise.resolve(input),
      });

      const output = await strategizer.execute('Something Else')!;
      expect(output).toBe(undefined);
    });
  });
});
