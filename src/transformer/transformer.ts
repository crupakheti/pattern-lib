import { Transformation } from './transformation';

export interface Transformer<T> {
  /**
   * Adds a new transformation
   *
   * @param transformation A {@link Transformation} object
   * @returns `this` to support fluent API
   */
  register(transformation: Transformation<T>): Transformer<T>;

  /**
   * Removes an already registered strategy
   *
   * @param strategy The {@link Strategy} to be removed
   * @returns `true` on success and `false` when the supplied strategy is not found
   */
  unregister(transformation: Transformation<T>): boolean;

  /**
   * Applies a sequence of matching transformations on the supplied data.
   *
   * @param data The input to transformer
   * @returns A void promise when the execution completes
   */
  execute(data: T): Promise<void>;
}
