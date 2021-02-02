import {Command, CommandResult, HistoryAction} from './types';
import {HistoryStackEntry, UndoHistory} from './undo-history';

class TestCommand implements Command {
  public displayName = 'test command';

  public execute(): CommandResult {
    throw new Error('Method not implemented.');
  }

  public undo(): CommandResult {
    throw new Error('Method not implemented.');
  }

  public redo(): CommandResult {
    throw new Error('Method not implemented.');
  }
}

describe('UndoHistory', () => {
  let undoHistory: UndoHistory;

  beforeEach(() => {
    undoHistory = new UndoHistory();
  });

  it('should be empty', () => {
    expect.assertions(2);
    expect(undoHistory.getUndoEntries()).toStrictEqual([]);
    expect(undoHistory.getRedoEntries()).toStrictEqual([]);
  });

  it('should add an entry to the undo stack', () => {
    expect.assertions(1);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const result: CommandResult = {
      success: true,
      canRedo: false,
      canUndo: true
    };
    const action: HistoryAction = HistoryAction.Execute;
    undoHistory.add(entry, result, action);

    expect(undoHistory.getUndoEntries()).toHaveLength(1);
  });

  it('should add an entry to the undo and redo stack', () => {
    expect.assertions(2);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const result: CommandResult = {
      success: true,
      canRedo: true,
      canUndo: true
    };
    const action: HistoryAction = HistoryAction.Execute;
    undoHistory.add(entry, result, action);

    expect(undoHistory.getUndoEntries()).toHaveLength(1);
    expect(undoHistory.getRedoEntries()).toHaveLength(1);
  });

  it('should execute and undo a command', () => {
    expect.assertions(2);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const executeResult: CommandResult = {
      success: true,
      canRedo: false,
      canUndo: true
    };
    const undoResult: CommandResult = {
      success: true,
      canRedo: true,
      canUndo: false
    };
    undoHistory.add(entry, executeResult, HistoryAction.Execute);
    undoHistory.add(entry, undoResult, HistoryAction.Undo);

    expect(undoHistory.getUndoEntries()).toHaveLength(1);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });

  it('should execute, undo and redo a command', () => {
    expect.assertions(2);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const executeResult: CommandResult = {
      success: true,
      canRedo: false,
      canUndo: true
    };
    const undoResult: CommandResult = {
      success: true,
      canRedo: true,
      canUndo: false
    };
    const redoResult: CommandResult = {
      success: true,
      canRedo: false,
      canUndo: true
    };
    undoHistory.add(entry, executeResult, HistoryAction.Execute);
    undoHistory.add(entry, undoResult, HistoryAction.Undo);
    undoHistory.add(entry, redoResult, HistoryAction.Redo);

    expect(undoHistory.getUndoEntries()).toHaveLength(2);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });

  it('should execute, undo and execute a command', () => {
    expect.assertions(2);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const executeResult: CommandResult = {
      success: true,
      canRedo: false,
      canUndo: true
    };
    const undoResult: CommandResult = {
      success: true,
      canRedo: true,
      canUndo: false
    };
    undoHistory.add(entry, executeResult, HistoryAction.Execute);
    undoHistory.add(entry, undoResult, HistoryAction.Undo);
    undoHistory.add(entry, executeResult, HistoryAction.Execute);

    expect(undoHistory.getUndoEntries()).toHaveLength(2);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });

  it('should execute command and then cleared', () => {
    expect.assertions(2);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const executeResult: CommandResult = {
      success: true,
      canRedo: false,
      canUndo: true
    };
    undoHistory.add(entry, executeResult, HistoryAction.Execute);
    undoHistory.clear();

    expect(undoHistory.getUndoEntries()).toHaveLength(0);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });

  it('should pop an entry from the undo stack', () => {
    expect.assertions(3);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const executeResult: CommandResult = {
      success: true,
      canRedo: false,
      canUndo: true
    };
    undoHistory.add(entry, executeResult, HistoryAction.Execute);
    const popedEntry = undoHistory.popUndo();

    expect(popedEntry).toBe(entry);
    expect(undoHistory.getUndoEntries()).toHaveLength(0);
    expect(undoHistory.getRedoEntries()).toHaveLength(1);
  });

  it('should pop an undefined entry from the undo stack and not put on redo stack', () => {
    expect.assertions(3);

    expect(undoHistory.popUndo()).toBeUndefined();

    expect(undoHistory.getUndoEntries()).toHaveLength(0);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });

  it('should pop an entry from the redo stack', () => {
    expect.assertions(3);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const executeResult: CommandResult = {
      success: true,
      canRedo: true,
      canUndo: false
    };
    undoHistory.add(entry, executeResult, HistoryAction.Execute);

    expect(undoHistory.getRedoEntries()).toHaveLength(1);
    const popedEntry = undoHistory.popRedo();

    expect(popedEntry).toBe(entry);
    expect(undoHistory.getRedoEntries()).toHaveLength(0);
  });

  it('should execute and undo should have something on the redo stack.', () => {
    expect.assertions(2);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const executeResult: CommandResult = {
      success: true,
      canRedo: true,
      canUndo: false
    };
    undoHistory.add(entry, executeResult, HistoryAction.Execute);

    expect(undoHistory.getRedoEntries()).toHaveLength(1);
    expect(undoHistory.peekRedo()).toBe(entry);
  });

  it('should not push an entry to redo stack if there is nothing to redo', () => {
    expect.assertions(1);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const executeResult: CommandResult = {
      success: true,
      canRedo: true,
      canUndo: false
    };
    undoHistory.add(entry, executeResult, HistoryAction.Execute);
    undoHistory.add(entry, executeResult, HistoryAction.Redo);

    expect(undoHistory.getRedoEntries()).toHaveLength(1);
  });

  it('should only put one item in the redo stack', () => {
    expect.assertions(1);

    const entry: HistoryStackEntry = {
      key: 'test command',
      command: new TestCommand()
    };
    const executeResult: CommandResult = {
      success: true,
      canRedo: true,
      canUndo: true
    };
    // Will add an entry to the redo stack.
    undoHistory.add(entry, executeResult, HistoryAction.Execute);
    // Will pop the top item and add to redo stack.
    undoHistory.popUndo();

    expect(undoHistory.getRedoEntries()).toHaveLength(1);
  });
});
