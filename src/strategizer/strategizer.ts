import { Strategy } from './strategy';

/**
 * Strategizer evaluates the context and executes a matching {@link Strategy}.
 *
 * @param T The data type of the context
 */
export interface Strategizer<I, O> {
  /**
   * Adds a new strategy
   *
   * @param strategy A {@link Strategy} object
   * @returns `this` to support fluent API
   */
  register(strategy: Strategy<I, O>): Strategizer<I, O>;

  /**
   * Removes an already registered strategy
   *
   * @param strategy The {@link Strategy} to be removed
   * @returns `true` on success and `false` when the supplied strategy is not found
   */
  unregister(strategy: Strategy<I, O>): boolean;

  /**
   * Executes the first matching strategy in the series of registered strategies.
   *
   * @param context The input context
   * @returns The ouput of the strategy if a matching strategy is found, otherwise, `undefined`
   */
  execute(context: I): Promise<O | undefined>;
}
