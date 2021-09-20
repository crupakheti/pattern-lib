import { Registry } from './registry';

/**
 * A utility class to help with object registration and deregistration.
 *
 * @typeParam T The object type to be registered
 */
export class DefaultRegistry<T> implements Registry<T> {
  /**
   * Constructs a new registry object. Registry helps with object registration and deregistration.
   *
   * @param registry The default list of objects to be registered in the registry
   */
  static create<T>(registry: Array<T> = []): Registry<T> {
    return new DefaultRegistry(registry);
  }

  /**
   * Constructs a new registry object
   *
   * @param registry The default list of objects to be registered in the registry
   */
  protected constructor(protected readonly registry: Array<T>) {}

  register(element: T): Registry<T> {
    this.registry.push(element);
    return this;
  }

  unregister(element: T): boolean {
    const index = this.registry.indexOf(element);
    if (index < 0) {
      return false;
    }

    this.registry.splice(index, 1);
    return true;
  }

  get registrations(): Array<T> {
    return this.registry;
  }
}
