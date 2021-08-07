import { AsyncTransformer, Transformation } from '../../src';

describe('AsyncTransformer', () => {
  describe('Construction', () => {
    it('should have empty transformations array intialized by default', () => {
      const transformer = new AsyncTransformer();
      expect(transformer['transformations']).toEqual([]);
    });

    it('should be able to intialize an async transformer with default transformations', () => {
      const transformations: Array<Transformation<any>> = [
        {
          evaluate: undefined as any,
          execute: undefined as any,
        },
      ];

      const transformer = new AsyncTransformer(transformations);
      expect(transformer['transformations']).toEqual(transformations);
    });
  });

  describe('Execution', () => {
    it('should execute transformationtions whose condition statifies evaluation', async () => {
      const data = [1, 2, 3];
      const transformer = new AsyncTransformer<Array<number>>()
        .register({
          evaluate: (input) => input.includes(3),
          execute: async (input) => {
            input.push(4);
          },
        })
        .register({
          evaluate: (input) => input.includes(5),
          execute: async (input) => {
            input.push(5);
          },
        });

      await transformer.execute(data);
      expect(data).toEqual([1, 2, 3, 4]);
    });
  });
});
