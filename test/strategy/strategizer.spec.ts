import { Strategy } from '../../src';
import { Strategizer } from '../../src';

describe('Strategizer', () => {
  describe('Construction', () => {
    it('should have empty strategy array intialized by default', () => {
      const strategizer = new Strategizer();
      expect(strategizer['strategies']).toEqual([]);
    });

    it('should be able to intialize strategizer with default strategies', () => {
      const strategies: Array<Strategy<any, any>> = [
        {
          evaluate: undefined as any,
          execute: undefined as any,
        },
      ];

      const strategizer = new Strategizer(strategies);
      expect(strategizer['strategies']).toEqual(strategies);
    });
  });

  describe('Strategy Registration', () => {
    it('should be able to register a strategy', () => {
      const strategizer = new Strategizer();
      const strategy = { evaluate: undefined as any, execute: undefined as any };
      const self = strategizer.register(strategy);

      expect(self).toBe(strategizer);
      expect(strategizer['strategies']).toEqual([strategy]);
    });
  });

  describe('Execution', () => {
    let strategizer: Strategizer<string, string>;

    it('should execute a strategy whose condition statifies evaluation', async () => {
      strategizer = new Strategizer<string, string>()
        .register({
          evaluate: (input) => input === 'identity',
          execute: (input) => Promise.resolve(input),
        })
        .register({
          evaluate: (input) => input !== 'identity',
          execute: (input) => Promise.resolve(input.toUpperCase()),
        });

      let output = await strategizer.execute('identity');
      expect(output).toEqual('identity');

      output = await strategizer.execute('Something Else')!;
      expect(output).toEqual('SOMETHING ELSE');
    });

    it('should return udefined when no strategies are applicable', async () => {
      strategizer = new Strategizer<string, string>().register({
        evaluate: (input) => input === 'identity',
        execute: (input) => Promise.resolve(input),
      });

      const output = await strategizer.execute('Something Else')!;
      expect(output).toBe(undefined);
    });
  });
});
