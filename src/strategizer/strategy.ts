/**
 * An abstraction for an execution strategy.
 *
 * @typeParam I The data type to apply the strategy to
 * @typeParam O The data type returned after the application of the strategy
 */
export interface Strategy<I, O> {
  /**
   * Evaluates if the strategy should be executed based on the supplied input context
   *
   * @param context The input context
   */
  evaluate(context: I): Promise<boolean>;

  /**
   * Excutes the strategy if {@link evaluate} returns true.
   *
   * @param context The input context to use for execution
   * @returns The final output `O` after execution
   */
  execute(context: I): Promise<O>;
}
