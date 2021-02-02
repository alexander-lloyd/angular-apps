import {UpdatePropertyCommand} from './command';
import {CommandHandler} from './command-handler';
import {Command, CommandResult} from './types';
import {UndoHistory} from './undo-history';

class TestCommand implements Command {
  public constructor(
    private result: () => CommandResult
  ) {}

  public execute(): CommandResult {
    return this.result();
  }

  public undo(): CommandResult {
    return this.result();
  }

  public redo(): CommandResult {
    return this.result();
  }
}

describe('CommandHandler', () => {
  let undoHistory: UndoHistory;
  let commandHandler: CommandHandler;

  beforeEach(() => {
    undoHistory = new UndoHistory();
    commandHandler = new CommandHandler(undoHistory);
  });

  it('should be truthy', () => {
    expect.assertions(1);
    expect(commandHandler).toBeTruthy();
  });

  it('should update the value of an object', () => {
    expect.assertions(2);
    const object = {
      a: 1
    };

    const command = new UpdatePropertyCommand(object, 'a', 2);
    commandHandler.execute('update-property', command);

    expect(object.a).toBe(2);
    expect(undoHistory.getUndoEntries()).toHaveLength(1);
  });

  it('should not add the command to the undo stack if it failed', () => {
    expect.assertions(1);
    const result: CommandResult = {
      success: false,
      canUndo: true
    };
    const command = new TestCommand(() => result);
    commandHandler.execute('test', command);

    expect(undoHistory.getUndoEntries()).toHaveLength(0);
  });

  it('should undo an executed command', () => {
    expect.assertions(4);
    const object = {
      a: 1
    };

    const command = new UpdatePropertyCommand(object, 'a', 2);
    commandHandler.execute('update-property', command);
    const result = commandHandler.undo();

    expect(object.a).toBe(1);
    expect(result).toBeDefined();
    expect(undoHistory.getUndoEntries()).toHaveLength(0);
    expect(undoHistory.getRedoEntries()).toHaveLength(1);
  });

  it('should return undefined if there are no elements on the undo stack', () => {
    expect.assertions(3);

    const result = commandHandler.undo();

    expect(result).toBeUndefined();
    expect(undoHistory.getUndoEntries()).toHaveLength(0);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });

  it('should redo an undone executed command', () => {
    expect.assertions(4);
    const object = {
      a: 1
    };

    const command = new UpdatePropertyCommand(object, 'a', 2);
    commandHandler.execute('update-property', command);
    commandHandler.undo();
    const result = commandHandler.redo();

    expect(object.a).toBe(2);
    expect(result).toBeDefined();
    expect(undoHistory.getUndoEntries()).toHaveLength(1);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });

  it('should return undefined if there are no items on the redo stack', () => {
    expect.assertions(3);

    const result = commandHandler.redo();

    expect(result).toBeUndefined();
    expect(undoHistory.getUndoEntries()).toHaveLength(0);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });

  it('should not add the item to the undo stack if it was not successful.', () => {
    expect.assertions(2);
    const result: CommandResult = {
      success: true,
      canUndo: true
    };

    const command = new TestCommand(() => result);
    // Command and undo executed successfully.
    commandHandler.execute('test-command', command);
    commandHandler.undo();

    // Now the command will not be successful.
    result.success = false;
    commandHandler.redo();

    expect(undoHistory.getUndoEntries()).toHaveLength(0);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });
});
