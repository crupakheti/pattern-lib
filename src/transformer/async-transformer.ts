import { Transformer } from './transformer';
import { Transformation } from './transformation';
import { DefaultTransformer } from './default-transformer';
import { DefaultRegistry, Registry } from '../registration';

/**
 * `AsyncTransformer` extends the behavior of {@link DefaultTransformer} by applying matching {@link Transformation}
 * objects to the supplied data but **asynchronously**.
 */
export class AsyncTransformer<T> extends DefaultTransformer<T> {
  /**
   * Creates a new {@link Transformer} object that executes matching {@link Transformation} objects **asynchronously**.
   * A {@link Transformation} object implements a data manipulation algorithm to change the supplied context/input.
   *
   * @typeParam T The type of context/input object for {@link Transformation}
   * @param transformations The default list of {@link Transformation} objects to be used by the `Transformer`.
   * @param registry The default {@link Registry} object to back {@link Transformation} registration
   * @returns The newly created {@link Transformer} object
   */
  static create<T>(
    transformations = new Array<Transformation<T>>(),
    registry = DefaultRegistry.create<Transformation<T>>()
  ): Transformer<T> {
    transformations.forEach((t) => registry.register(t));
    return new AsyncTransformer<T>(registry);
  }

  /**
   * Creates a new `Transformer` object.
   *
   * @param registry The registry to be used for {@link Transformation} registration
   */
  protected constructor(readonly registry: Registry<Transformation<T>>) {
    super(registry);
  }

  /**
   * Applies matching transformations to the supplied data asynchronously.
   * @param data The data to be transformed
   */
  async execute(data: T): Promise<void> {
    await Promise.all(
      this.registrations.map(async (transformation) => {
        if (await transformation.evaluate(data)) {
          await transformation.execute(data);
        }
      })
    );
  }
}
