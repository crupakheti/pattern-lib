import { Registry } from '../registration';
import { Strategy } from './strategy';

/**
 * Strategizer evaluates the context and executes a matching {@link Strategy}.
 *
 * @typeParam I The data type of the context
 * @typeParam O The output type returned after executing the strategy
 */
export interface Strategizer<I, O> extends Registry<Strategy<I, O>> {
  /**
   * Registers a strategy to the strategizer
   *
   * @param strategy The strategy to be registered
   * @returns The strategizer object itself
   */
  register(strategy: Strategy<I, O>): Strategizer<I, O>;

  /**
   * Executes the first matching strategy in the series of registered strategies.
   *
   * @param context The input context
   * @returns The ouput of the strategy if a matching strategy is found, otherwise, `undefined`
   */
  execute(context: I): Promise<O | undefined>;
}
