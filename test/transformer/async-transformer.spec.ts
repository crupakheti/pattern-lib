import { AsyncTransformer, Transformation } from '../../src';

describe('AsyncTransformer', () => {
  describe('Construction', () => {
    it('should have empty transformations array intialized by default', () => {
      const transformer = AsyncTransformer.create();
      expect(transformer.registrations).toEqual([]);
    });

    it('should be able to intialize an async transformer with default transformations', () => {
      const transformations: Array<Transformation<any>> = [
        {
          evaluate: undefined as any,
          execute: undefined as any,
        },
      ];

      const transformer = AsyncTransformer.create(transformations);
      expect(transformer.registrations).toEqual(transformations);
    });
  });

  describe('Execution', () => {
    it('should execute transformationtions whose condition satisfies evaluation', async () => {
      const data = [1, 2, 3];
      const transformer = AsyncTransformer.create<Array<number>>()
        .register({
          evaluate: async (input) => input.includes(3),
          execute: async (input) => {
            input.push(4);
          },
        })
        .register({
          evaluate: async (input) => input.includes(5),
          execute: async (input) => {
            input.push(5);
          },
        });

      await transformer.execute(data);
      expect(data).toEqual([1, 2, 3, 4]);
    });
  });
});
