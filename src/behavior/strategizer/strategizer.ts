import { Strategy } from './strategy';

/**
 * Strategizer evaluates the context and executes a matching {@link Strategy}.
 *
 * @param T The data type of the context
 */
export class Strategizer<I, O> {
  constructor(protected readonly strategies = new Array<Strategy<I, O>>()) {}

  /**
   * Adds a new strategy
   *
   * @param strategy A {@link Strategy} object
   * @returns `this` to support fluent API
   */
  register(strategy: Strategy<I, O>): Strategizer<I, O> {
    this.strategies.push(strategy);
    return this;
  }

  /**
   * Executes the first matching strategy in the series of registered strategies.
   *
   * @param context The input context
   * @returns The ouput of the strategy if a matching strategy is found, otherwise, `undefined`
   */
  async execute(context: I): Promise<O | undefined> {
    for (const strategy of this.strategies) {
      if (strategy.evaluate(context)) {
        return strategy.execute(context);
      }
    }
    return undefined;
  }
}
