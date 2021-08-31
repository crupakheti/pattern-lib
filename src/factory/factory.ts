import { Strategy } from '../strategizer';

/**
 * Creates an object of type `O` given the context `C`.
 *
 * @param C The data type for input context
 * @param O The ouput type created by the factory
 */
export interface Factory<C, O> {
  /**
   * Adds a new object creation strategy to the factory.
   *
   * @param strategy A {@link Strategy} object
   * @returns `this` to support fluent API
   */
  register(strategy: Strategy<C, O>): Factory<C, O>;

  /**
   * Removes an already registered object creation strategy
   *
   * @param strategy The {@link Strategy} to be removed
   * @returns `true` on success and `false` when the supplied strategy is not found
   */
  unregister(strategy: Strategy<C, O>): boolean;

  /**
   * Creates an object of the parameterized type `O` given the input conext `C`.
   *
   * @param context The input context of parameterized type 'C' used for creating a new object.
   */
  create(context: C): Promise<O | undefined>;
}
