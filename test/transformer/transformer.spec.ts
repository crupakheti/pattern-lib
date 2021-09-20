import { Transformation, DefaultTransformer } from '../../src';

describe('Transformer', () => {
  describe('Construction', () => {
    it('should have empty transformations array intialized by default', () => {
      const transformer = DefaultTransformer.create();
      expect(transformer.registrations).toEqual([]);
    });

    it('should be able to intialize a transformer with default transformations', () => {
      const transformations: Array<Transformation<any>> = [
        {
          evaluate: undefined as any,
          execute: undefined as any,
        },
      ];

      const transformer = DefaultTransformer.create(transformations);
      expect(transformer.registrations).toEqual(transformations);
    });
  });

  describe('Transformation Registration', () => {
    it('should be able to register and unregister a transformation', () => {
      const transformer = DefaultTransformer.create();
      const transformation = { evaluate: undefined as any, execute: undefined as any };
      const self = transformer.register(transformation);

      expect(self).toBe(transformer);
      expect(transformer.registrations).toEqual([transformation]);

      const result = transformer.unregister(transformation);
      expect(result).toBe(true);
      expect(transformer.registrations).toEqual([]);
    });
  });

  describe('Execution', () => {
    it('should execute a transformation whose condition statifies evaluation', async () => {
      const data = [1, 2, 3];
      const transformer = DefaultTransformer.create<Array<number>>()
        .register({
          evaluate: async (input) => input.length < 4,
          execute: async (input) => {
            input.push(4);
          },
        })
        .register({
          evaluate: async (input) => input.length > 5,
          execute: async (input) => {
            input.push(5);
          },
        });

      await transformer.execute(data);
      expect(data).toEqual([1, 2, 3, 4]);
    });
  });
});
