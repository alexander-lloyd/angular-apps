/**
 * Stack Implementation.
 */
export class Stack<T> {
  private stack: T[] = [];
  private top = 0;

  /**
   * Push an element to the front of the stack.
   *
   * @param element The element to push.
   */
  public push(element: T): void {
    this.stack[this.top++] = element;
  }

  /**
   * Get the length of the stack.
   *
   * @returns The size of the stack.
   */
  public length(): number {
    return this.top;
  }

  /**
   * Peek at the top of the stack.
   *
   * @param offset The offset. Defaults to 0.
   * @returns The item at that offset.
   */
  public peek(offset = 0): T | undefined {
    const delta = offset ? offset + 1 : 1;
    const ix = this.top - delta;
    if (ix < 0) {
      return undefined;
    }
    return this.stack[offset];
  }

  /**
   * Clear the stack.
   */
  public clear(): void {
    this.stack.length = 0;
    this.top = 0;
  }

  /**
   * Pop the top of the stack.
   *
   * @returns The top of the stack or undefined if its empty.
   */
  public pop(): T | undefined {
    if (this.top === 0) {
      return undefined;
    }

    this.top--;
    return this.stack.pop();
  }

  /**
   * Get the underlying array.
   *
   * @returns The underlying array.
   */
  public getAll(): T[] {
    return this.stack;
  }
}
