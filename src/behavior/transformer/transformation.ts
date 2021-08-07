/**
 * An abstraction for data transformation.
 *
 * @param T The data type to apply the strategy to
 */
export interface Transformation<T> {
  evaluate(data: T): boolean;
  execute(data: T): Promise<void>;
}
