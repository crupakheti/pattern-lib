import { Strategy } from './strategy';
import { Strategizer } from './strategizer';
import { Registry, DefaultRegistry } from '../registration';

/**
 * `DefaultStrategizer` implements the {@link Strategizer} interface. It evaluates the context and executes the
 * first applicable {@link Strategy}. The {@link Strategy} objects are registered onto the strategizer and the
 * first strategy is executed whose evaluations ({@link Strategy.evaluate}) returns `true`.
 *
 * @typeParam I The data type of the context
 * @typeParam O The output type returned after executing the strategy
 */
export class DefaultStrategizer<I, O> implements Strategizer<I, O> {
  /**
   * Creates a {@link Strategizer} object. The strategizer evaluates the context and executes the
   * first applicable {@link Strategy}. The {@link Strategy} objects are registered onto the
   * strategizer and the first strategy is executed whose evaluations ({@link Strategy.evaluate})
   * returns `true`.
   *
   * @typeParam I The data type of the context
   * @typeParam O The output type returned after executing the strategy
   * @param strategies Default set of {@link Strategy} objects to be used by the Strategizer
   * @param registry The default {@link Registry} object to back {@link Strategy} registration
   * @returns The newly created {@link Strategizer} object
   */
  static create<I, O>(strategies = new Array<Strategy<I, O>>(), registry = DefaultRegistry.create<Strategy<I, O>>()): Strategizer<I, O> {
    strategies.forEach((strategy) => registry.register(strategy));
    return new DefaultStrategizer(registry);
  }

  /**
   * Creates a new Strategizer object.
   *
   * @param registry The default {@link Registry} object to back {@link Strategy} registration
   */
  protected constructor(protected readonly registry: Registry<Strategy<I, O>>) {}

  register(strategy: Strategy<I, O>): Strategizer<I, O> {
    this.registry.register(strategy);
    return this;
  }

  unregister(strategy: Strategy<I, O>): boolean {
    return this.registry.unregister(strategy);
  }

  get registrations(): Array<Strategy<I, O>> {
    return this.registry.registrations;
  }

  async execute(context: I): Promise<O | undefined> {
    for (const strategy of this.registrations) {
      if (await strategy.evaluate(context)) {
        return strategy.execute(context);
      }
    }
    return undefined;
  }
}
