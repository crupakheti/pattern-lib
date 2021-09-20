/**
 * A abstraction to support object registration and deregistration.
 */
export interface Registry<T> {
  /**
   * Registers an element to the registry
   *
   * @param element The element to be registered
   * @returns The registry object itself
   */
  register(element: T): Registry<T>;

  /**
   * Removes the supplied element from the registry if it has already been registered.
   *
   * @param element The element to be registered
   * @returns `true` if the element has been removed and `false` otherwise.
   */
  unregister(element: T): boolean;

  /**
   * Gets the registration list
   */
  get registrations(): Array<T>;
}
