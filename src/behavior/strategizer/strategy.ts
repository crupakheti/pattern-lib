/**
 * An abstraction for an execution strategy.
 *
 * @param I The data type to apply the strategy to
 * @param O The data type returned after the application of the strategy
 */
export interface Strategy<I, O> {
  evaluate(context: I): boolean;
  execute(context: I): Promise<O>;
}
