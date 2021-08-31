import { Transformation } from './transformation';

export class DefaultTransformer<T> {
  /**
   * Creates a new Transformer object.
   *
   * @param transformations The default transformations to be used by the transformer.
   */
  constructor(protected readonly transformations = new Array<Transformation<T>>()) {}

  /**
   * Adds a new transformation
   *
   * @param transformation A {@link Transformation} object
   * @returns `this` to support fluent API
   */
  register(transformation: Transformation<T>): DefaultTransformer<T> {
    this.transformations.push(transformation);
    return this;
  }

  /**
   * Applies a sequence of matching transformations on the supplied data.
   *
   * @param data The input to transformer
   * @returns A void promise when the execution completes
   */
  async execute(data: T): Promise<void> {
    for (const transformation of this.transformations) {
      if (transformation.evaluate(data)) {
        await transformation.execute(data);
      }
    }
  }
}
