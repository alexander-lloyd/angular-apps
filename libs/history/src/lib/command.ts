import {Command, CommandResult} from './types';

/**
 * Update the property of an object.
 *
 * @param T The type of the object to modify.
 *
 * @example
 * const object = { key: 'old' }
 * const command = new UpdatePropertyCommand(object, 'key', 'new');
 * command.execute();
 */
export class UpdatePropertyCommand<T> implements Command {
  public readonly displayName = 'update-property-command';

  private previousValue: T[keyof T] | undefined;

  /**
   * Constructor.
   *
   * @param target The target object.
   * @param property The property to update.
   * @param newValue The new value.
   */
  public constructor(
    private target: T,
    private property: keyof T,
    private newValue: T[keyof T]
  ) {}

  /**
   * Execute the command. Set the property.
   *
   * @returns The result of the execution.
   */
  public execute(): CommandResult {
    this.previousValue = this.updateProperty(this.newValue);

    return {
      success: true,
      canUndo: true
    };
  }

  /**
   * Undo the command. Set the property to the old value.
   *
   * @returns The result of the execution.
   */
  public undo(): CommandResult {
    this.updateProperty(this.previousValue as T[keyof T]);
    this.previousValue = undefined;
    return {
      success: true,
      canRedo: true
    };
  }

  /**
   * Redo the command. Set the property back to the new value.
   *
   * @returns The result of the execution.
   */
  public redo(): CommandResult {
    return this.execute();
  }

  /**
   * Update the property on the value.
   *
   * @param value The new value.
   * @returns The old value.
   */
  private updateProperty(value: T[keyof T]): T[keyof T] {
    const previousValue = this.target[this.property];
    this.target[this.property] = value;

    return previousValue;
  }
}
