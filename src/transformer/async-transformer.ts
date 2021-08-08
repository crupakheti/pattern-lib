import { Transformation } from './transformation';
import { Transformer } from './transformer';

/**
 * AsyncTransformer extends the behavior of {@link Transformer} by applying matching transformations
 * to the supplied data **asynchronously**.
 */
export class AsyncTransformer<T> extends Transformer<T> {
  /**
   * Creates a new AsyncTransformer object.
   *
   * @param transformations The default transformations to be used by the transformer.
   */
  constructor(transformations = new Array<Transformation<T>>()) {
    super(transformations);
  }

  /**
   * Applies matching transformations to the supplied data asynchronously.
   * @param data The data to be transformed
   */
  async execute(data: T): Promise<void> {
    await Promise.all(
      this.transformations.map(async (transformation) => {
        if (transformation.evaluate(data)) {
          await transformation.execute(data);
        }
      })
    );
  }
}
