/**
 * An abstraction for the output of a {@link Strategy}.
 * @param T The output type.
 */
export interface Output<T> {
  name: string;
  output: T;
}

/**
 * An abstraction of a execution strategy.
 *
 * @param InputType The type of `value` for {@link Context}
 * @param OutputType The type of `value` for {@link Output}
 */
export interface Strategy<InputType, OutputType> {
  name: string;
  evaluate: (input: InputType) => boolean;
  execute: (input: InputType) => Promise<OutputType>;
}

/**
 * Strategizer executes a collection of {@link Strategy} when the input matches the execution conditions specified in the
 * registered strategies.
 *
 * @param InputType The type of `value` for {@link Context}
 * @param OutputType The type of `value` for {@link Output}
 */
export class Strategizer<InputType, OutputType> {
  constructor(protected readonly strategies = new Array<Strategy<InputType, OutputType>>()) {}

  /**
   * Register a new strategy for the strategizer.
   *
   * @param strategy A {@link Strategy} object
   * @returns {@link Strategizer} `this` to support fluent API.
   */
  register(strategy: Strategy<InputType, OutputType>): Strategizer<InputType, OutputType> {
    this.strategies.push(strategy);
    return this;
  }

  /**
   * Removes the strategy based on the supplied `name` key if it has been registered in the strategizer.
   *
   * @param name The name of the {@link Strategy} to be removed.
   * @returns `true` on success and `false` otherwise
   */
  unregister(name: string): boolean {
    const index = this.strategies.findIndex((strategy) => strategy.name === name);

    if (index > -1) {
      this.strategies.splice(index, 1);
      return true;
    }

    return false;
  }

  /**
   * Checks whether the given strategy name has been registered to the strategizer.
   *
   * @param name The name of the strategy
   * @returns `true` if the given strategy name already exists and `false` otherwise.
   */
  has(name: string): boolean {
    return this.strategies.findIndex((strategy) => strategy.name === name) > -1;
  }

  /**
   * Executes a strategy whose execution condition is satisfied.
   *
   * @param input The input to the strategizer
   * @returns An {@link Output} promise if a strategy has been executed, otherwise `undefined`
   */
  async any(input: InputType): Promise<Output<OutputType> | undefined> {
    for (const strategy of this.strategies) {
      if (strategy.evaluate(input)) {
        return {
          name: strategy.name,
          output: await strategy.execute(input),
        };
      }
    }
    return undefined;
  }

  /**
   * Executes all strategies synchronously whose execution conditions are satisfied.
   *
   * @param input The input to the strategizer
   * @returns An array of {@link Output} as a promise if some strategies have been executed, otherwise an empty array.
   */
  async all(input: InputType): Promise<Array<Output<OutputType>>> {
    const result = new Array<Output<OutputType>>();

    for (const strategy of this.strategies) {
      if (strategy.evaluate(input)) {
        result.push({
          name: strategy.name,
          output: await strategy.execute(input),
        });
      }
    }

    return result;
  }

  /**
   * Evaluates and executes all strategies asynchronously.
   *
   * @param input The input to strategizer
   * @returns An array of {@link Output} as a promise if some strategies have been executed, otherwise an empty array.
   */
  async allAsync(input: InputType): Promise<Array<Output<OutputType>>> {
    const result = await Promise.all(
      this.strategies.map(async (strategy) => {
        if (strategy.evaluate(input)) {
          const output = await strategy.execute(input);
          return { name: strategy.name, output: output };
        }
        return undefined;
      })
    );

    return result.filter((value) => !!value) as Array<Output<OutputType>>;
  }
}
