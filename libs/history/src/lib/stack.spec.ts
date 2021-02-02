import {Stack} from './stack';


describe('Stack', () => {
  it('should have the correct size', () => {
    expect.assertions(3);

    const stack = new Stack<number>();
    expect(stack.length()).toBe(0);

    stack.push(1);
    expect(stack.length()).toBe(1);
    stack.pop();
    expect(stack.length()).toBe(0);
  });

  it('should push elements', () => {
    expect.assertions(2);

    const stack = new Stack<number>();
    expect(stack.getAll()).toStrictEqual([]);

    stack.push(1);
    stack.push(2);
    expect(stack.getAll()).toStrictEqual([1, 2]);
  });

  it('should peek', () => {
    expect.assertions(3);

    const stack = new Stack<number>();
    expect(stack.peek()).toBeUndefined();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.peek()).toBe(1);
    expect(stack.peek(1)).toBe(2);
  });

  it('should clear', () => {
    expect.assertions(2);

    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.clear();
    expect(stack.length()).toBe(0);
    expect(stack.getAll()).toStrictEqual([]);
  });

  it('should pop', () => {
    expect.assertions(5);

    const stack = new Stack<number>();
    expect(stack.pop()).toBeUndefined();

    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.length()).toBe(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.length()).toBe(1);
  });
});
