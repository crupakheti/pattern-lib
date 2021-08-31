import { Strategizer } from './strategizer';
import { Strategy } from './strategy';

export class DefaultStrategizer<I, O> implements Strategizer<I, O> {
  /**
   * Creates a new Strategizer object.
   *
   * @param strategies Default set of strategies to be used by the Strategizer
   */
  constructor(protected readonly strategies = new Array<Strategy<I, O>>()) {}

  register(strategy: Strategy<I, O>): DefaultStrategizer<I, O> {
    this.strategies.push(strategy);
    return this;
  }

  unregister(strategy: Strategy<I, O>): boolean {
    const index = this.strategies.indexOf(strategy);
    if (index < 0) {
      return false;
    }

    this.strategies.splice(index, 1);
    return true;
  }

  async execute(context: I): Promise<O | undefined> {
    for (const strategy of this.strategies) {
      if (await strategy.evaluate(context)) {
        return strategy.execute(context);
      }
    }
    return undefined;
  }
}
