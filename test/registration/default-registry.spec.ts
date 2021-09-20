import { DefaultRegistry } from '../../src';

describe('DefaultRegistry', () => {
  describe('Construction', () => {
    it('should have empty element array intialized by default', () => {
      const registry = DefaultRegistry.create() as DefaultRegistry<unknown>;
      expect(registry.registrations).toEqual([]);
    });

    it('should be able to intialize registry with default elements', () => {
      const list = ['abc'];
      const registry = DefaultRegistry.create<string>(list) as DefaultRegistry<string>;
      expect(registry.registrations).toEqual(list);
    });
  });

  describe('Element Registration', () => {
    it('should be able to register an element', () => {
      const registry = DefaultRegistry.create<string>() as DefaultRegistry<string>;
      const self = registry.register('test');

      expect(self).toBe(registry);
      expect(registry.registrations).toEqual(['test']);
    });

    it('should be able to unregister a strategy', () => {
      const registry = DefaultRegistry.create<string>();
      registry.register('test');

      let unregistered = registry.unregister('test');
      expect(unregistered).toBe(true);

      unregistered = registry.unregister('test');
      expect(unregistered).toBe(false);
    });
  });
});
