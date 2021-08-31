import { Transformation, DefaultTransformer } from '../../src';

describe('Transformer', () => {
  describe('Construction', () => {
    it('should have empty transformations array intialized by default', () => {
      const transformer = new DefaultTransformer();
      expect(transformer['transformations']).toEqual([]);
    });

    it('should be able to intialize a transformer with default transformations', () => {
      const transformations: Array<Transformation<any>> = [
        {
          evaluate: undefined as any,
          execute: undefined as any,
        },
      ];

      const transformer = new DefaultTransformer(transformations);
      expect(transformer['transformations']).toEqual(transformations);
    });
  });

  describe('Transformation Registration', () => {
    it('should be able to register a transformation', () => {
      const transformer = new DefaultTransformer();
      const transformation = { evaluate: undefined as any, execute: undefined as any };
      const self = transformer.register(transformation);

      expect(self).toBe(transformer);
      expect(transformer['transformations']).toEqual([transformation]);
    });
  });

  describe('Execution', () => {
    it('should execute a transformation whose condition statifies evaluation', async () => {
      const data = [1, 2, 3];
      const transformer = new DefaultTransformer<Array<number>>()
        .register({
          evaluate: (input) => input.length < 4,
          execute: async (input) => {
            input.push(4);
          },
        })
        .register({
          evaluate: (input) => input.length > 5,
          execute: async (input) => {
            input.push(5);
          },
        });

      await transformer.execute(data);
      expect(data).toEqual([1, 2, 3, 4]);
    });
  });
});
