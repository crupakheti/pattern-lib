import { strategy } from '../../src';
import { Strategizer } from '../../src/strategy';

describe('Strategizer', () => {
  describe('Construction', () => {
    it('should have empty strategy array intialized by default', () => {
      const strategizer = new strategy.Strategizer();
      expect(strategizer['strategies']).toEqual([]);
    });

    it('should be able to intialize strategizer with default strategies', () => {
      const strategies: Array<strategy.Strategy<any, any>> = [
        {
          name: 'Test Strategy',
          evaluate: undefined as any,
          execute: undefined as any,
        },
      ];

      const strategizer = new strategy.Strategizer(strategies);
      expect(strategizer['strategies']).toEqual(strategies);
    });
  });

  describe('Strategy Registration', () => {
    it('should be able to register, check registry, and unregister a strategy', () => {
      const strategizer = new Strategizer();
      const self = strategizer.register({ name: 'test', evaluate: undefined as any, execute: undefined as any });

      expect(self).toEqual(strategizer);

      expect(strategizer.has('test')).toBeTruthy();
      expect(strategizer.unregister('test')).toBeTruthy();
      expect(strategizer.has('test')).toBeFalsy();
      expect(strategizer.unregister('test')).toBeFalsy();
    });
  });

  describe('Any Execution', () => {
    let strategizer: Strategizer<string, string>;

    beforeEach(() => {
      strategizer = new Strategizer<string, string>()
        .register({
          name: 'identity',
          evaluate: (input) => input === 'identity',
          execute: (input) => Promise.resolve(input),
        })
        .register({
          name: 'upper',
          evaluate: (input) => input !== 'identity',
          execute: (input) => Promise.resolve(input.toUpperCase()),
        });
    });

    it('should execute a strategy whose condition statifies evaluation', async () => {
      let output = await strategizer.any('identity');
      expect(output?.name).toEqual('identity');
      expect(output?.output).toEqual('identity');

      output = await strategizer.any('Something Else')!;
      expect(output?.name).toEqual('upper');
      expect(output?.output).toEqual('SOMETHING ELSE');
    });
  });

  describe('Any and All Executions', () => {
    let strategizer: Strategizer<string, string>;

    beforeEach(() => {
      strategizer = new Strategizer<string, string>()
        .register({
          name: 'Fruit - Apple',
          evaluate: (input) => input.startsWith('Fruit'),
          execute: (_) => Promise.resolve('Apple'),
        })
        .register({
          name: 'Veggie - Spinach',
          evaluate: (input) => input.startsWith('Veggie'),
          execute: (_) => Promise.resolve('Spinach'),
        })
        .register({
          name: 'Fruit - Orange',
          evaluate: (input) => input.startsWith('Fruit'),
          execute: (_) => Promise.resolve('Orange'),
        });
    });

    it('should execute the first strategy whose condition satisfies evaluation when invoking any', async () => {
      const output = await strategizer.any('Fruit');
      expect(output?.name).toEqual('Fruit - Apple');
      expect(output?.output).toEqual('Apple');
    });

    it('should execute nothing when condition is not successfully evaluated when invoking any', async () => {
      const output = await strategizer.any('Pizza');
      expect(output).toBeUndefined();
    });

    it('should execute all strategies whose conditions satisfy evaluations when invoking all', async () => {
      const output = await strategizer.all('Fruit');
      expect(output).toEqual([
        {
          name: 'Fruit - Apple',
          output: 'Apple',
        },
        {
          name: 'Fruit - Orange',
          output: 'Orange',
        },
      ]);
    });

    it('should execute nothing when condition is not successfully evaluated when invoking all', async () => {
      const output = await strategizer.all('Pizza');
      expect(output).toEqual([]);
    });

    it('should execute all strategies whose conditions satisfy evaluations when invoking allAsync', async () => {
      const output = await strategizer.allAsync('Fruit');
      expect(output).toEqual([
        {
          name: 'Fruit - Apple',
          output: 'Apple',
        },
        {
          name: 'Fruit - Orange',
          output: 'Orange',
        },
      ]);
    });

    it('should execute nothing when condition is not successfully evaluated when invoking allAsync', async () => {
      const output = await strategizer.allAsync('Pizza');
      expect(output).toEqual([]);
    });
  });
});
