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
   * Creates a new factory with the supplied backing strategies to drive object creation.
   *
   * @param strategies Default set of strategies to be used by the factory
   * @param strategizer Default strategizer to be used by the factory
   */
  constructor(
    readonly strategies = new Array<Strategy<C, O>>(),
    protected readonly strategizer: Strategizer<C, O> = new DefaultStrategizer(strategies)
  ) {}

  register(strategy: Strategy<C, O>): Factory<C, O> {
    this.strategizer.register(strategy);
    return this;
  }

  unregister(strategy: Strategy<C, O>): boolean {
    return this.strategizer.unregister(strategy);
  }

  create(context: C): Promise<O | undefined> {
    return this.strategizer.execute(context);
  }
}
