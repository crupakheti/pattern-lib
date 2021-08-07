import { Transformation } from './transformation';

export class Transformer<T> {
  constructor(protected readonly transformations = new Array<Transformation<T>>()) {}

  /**
   * Adds a new transformation
   *
   * @param transformation A {@link Transformation} object
   * @returns `this` to support fluent API
   */
  register(transformation: Transformation<T>): Transformer<T> {
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
