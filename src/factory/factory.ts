import { Registry } from '../registration';
import { Strategy } from '../strategizer';

/**
 * Creates an object of type `O` given the context `C`.
 *
 * @param C The data type for input context
 * @param O The ouput type created by the factory
 */
export interface Factory<C, O> extends Registry<Strategy<C, O>> {
  /**
   * Adds a new object creation {@link Strategy} to the factory.
   *
   * @param strategy A {@link Strategy} object
   * @returns The `Factory` object itself to support fluent API
   */
  register(strategy: Strategy<C, O>): Factory<C, O>;

  /**
   * Creates an object of the parameterized type `O` given the input conext `C`.
   *
   * @param context The input context of parameterized type 'C' used for creating a new object.
   */
  createObject(context: C): Promise<O | undefined>;
}
