import { Strategy } from '../../src';
import { DefaultStrategizer } from '../../src';

describe('DefaultStrategizer', () => {
  describe('Construction', () => {
    it('should have empty strategy array intialized by default', () => {
      const strategizer = new DefaultStrategizer();
      expect(strategizer['strategies']).toEqual([]);
    });

    it('should be able to intialize strategizer with default strategies', () => {
      const strategies: Array<Strategy<any, any>> = [
        {
          evaluate: undefined as any,
          execute: undefined as any,
        },
      ];

      const strategizer = new DefaultStrategizer(strategies);
      expect(strategizer['strategies']).toEqual(strategies);
    });
  });

  describe('Strategy Registration', () => {
    it('should be able to register a strategy', () => {
      const strategizer = new DefaultStrategizer();
      const strategy = { evaluate: undefined as any, execute: undefined as any };
      const self = strategizer.register(strategy);

      expect(self).toBe(strategizer);
      expect(strategizer['strategies']).toEqual([strategy]);
    });

    it('should be able to unregister a strategy', () => {
      const strategizer = new DefaultStrategizer();
      const strategy = { evaluate: undefined as any, execute: undefined as any };
      strategizer.register(strategy);

      let unregistered = strategizer.unregister(strategy);
      expect(unregistered).toBe(true);

      unregistered = strategizer.unregister(strategy);
      expect(unregistered).toBe(false);
    });
  });

  describe('Execution', () => {
    let strategizer: DefaultStrategizer<string, string>;

    it('should execute a strategy whose condition satisfies evaluation', async () => {
      strategizer = new DefaultStrategizer<string, string>()
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
      strategizer = new DefaultStrategizer<string, string>().register({
        evaluate: async (input) => input === 'identity',
        execute: async (input) => Promise.resolve(input),
      });

      const output = await strategizer.execute('Something Else')!;
      expect(output).toBe(undefined);
    });
  });
});
