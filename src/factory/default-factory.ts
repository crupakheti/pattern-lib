import { Factory } from './factory';
import { Strategy, Strategizer, DefaultStrategizer } from '../strategizer';

/**
 * The default implementation of the {@link Factory} interface that creates an object of type `O` given the context `C`.
 *
 * @param C The data type for input context
 * @param O The ouput type created by the factory
 */
export class DefaultFactory<C, O> implements Factory<C, O> {
  /**
   * Creates a {@link Factory} object. The factory evaluates the context and creates a new
   * object of type `O`, based on the supplied context, `C`. The factory works by accepting a
   * list of object creation {@link Strategy} as input. The {@link Strategy} objects are
   * registered onto the factory and the first strategy that evaluates to `true` is used
   * for object creation.
   *
   * @typeParam C The data type of the context
   * @typeParam O The type of new objects created by the factory
   * @param strategies Default set of {@link Strategy} objects to be used by the `Factory`
   * @param strategizer The default {@link Strategizer} object to back {@link Strategy} registration
   * @returns The newly created {@link Factory} object
   */
  static create<C, O>(strategies = new Array<Strategy<C, O>>(), strategizer = DefaultStrategizer.create<C, O>()): Factory<C, O> {
    strategies.forEach((strategy) => strategizer.register(strategy));
    return new DefaultFactory(strategizer);
  }

  /**
   * Creates a new factory with the supplied backing strategies to drive object creation.
   *
   * @param strategies Default set of strategies to be used by the factory
   * @param strategizer Default strategizer to be used by the factory
   */
  protected constructor(protected readonly strategizer: Strategizer<C, O>) {}

  register(strategy: Strategy<C, O>): Factory<C, O> {
    this.strategizer.register(strategy);
    return this;
  }

  unregister(strategy: Strategy<C, O>): boolean {
    return this.strategizer.unregister(strategy);
  }

  get registrations(): Strategy<C, O>[] {
    return this.strategizer.registrations;
  }

  createObject(context: C): Promise<O | undefined> {
    return this.strategizer.execute(context);
  }
}
