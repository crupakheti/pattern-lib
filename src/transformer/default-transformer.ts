import { DefaultRegistry, Registry } from '../registration';
import { Transformation } from './transformation';
import { Transformer } from './transformer';

/**
 * `DefaultTransformer` implements the behavior of {@link Transformer} by applying matching {@link Transformation} objects
 * to the supplied data/context, T, **synchronously**.
 *
 * @typeParam T The type of context/input object used for transformations
 */
export class DefaultTransformer<T> implements Transformer<T> {
  /**
   * Creates a new {@link Transformer} object that executes matching {@link Transformation} objects sequentially.
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
    return new DefaultTransformer<T>(registry);
  }

  /**
   * Creates a new `Transformer` object.
   *
   * @param registry The registry to be used for {@link Transformation} registration
   */
  protected constructor(protected readonly registry: Registry<Transformation<T>>) {}

  register(transformation: Transformation<T>): Transformer<T> {
    this.registry.register(transformation);
    return this;
  }

  unregister(transformation: Transformation<T>): boolean {
    return this.registry.unregister(transformation);
  }

  get registrations(): Transformation<T>[] {
    return this.registry.registrations;
  }

  async execute(data: T): Promise<void> {
    for (const transformation of this.registrations) {
      if (await transformation.evaluate(data)) {
        await transformation.execute(data);
      }
    }
  }
}
