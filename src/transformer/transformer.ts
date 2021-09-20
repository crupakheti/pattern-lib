import { Registry } from '../registration';
import { Transformation } from './transformation';

/**
 * `Transformer` applies data transformations algorithms defined by the {@link Transformation} interface.
 * The `Transformation` objects are registered onto the transformer and only those transformation are executed
 * whose evaluations ({@link Transformation.evaluate}) returns `true`.
 */
export interface Transformer<T> extends Registry<Transformation<T>> {
  /**
   * Registers a {@link Transformation} to the transformer
   *
   * @param transformation The transformation to be registered
   * @returns The `Transformer` object itself
   */
  register(transformation: Transformation<T>): Transformer<T>;

  /**
   * Applies a sequence of matching transformations on the supplied data.
   *
   * @param data The input to transformer
   * @returns A void promise when the execution completes
   */
  execute(data: T): Promise<void>;
}
