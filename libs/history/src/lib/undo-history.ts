import {Command, CommandResult, HistoryAction} from './types';
import {Stack} from './stack';


/**
 * HistoryStackEntry.
 */
export interface HistoryStackEntry {
  key: string
  command: Command;
}

/**
 * UndoHistory.
 */
export class UndoHistory {
  private undoStack: Stack<HistoryStackEntry> = new Stack();
  private redoStack: Stack<HistoryStackEntry> = new Stack();

  /**
   * Add an entry to the undo stack.
   *
   * @param entry Command object.
   * @param result Command result.
   * @param action history action.
   */
  public add(entry: HistoryStackEntry, result: CommandResult, action: HistoryAction): void {
    if (result.canUndo) {
      this.undoStack.push(entry);
    }
    let canRedo = false;
    switch (action) {
    case HistoryAction.Execute: {
      this.redoStack.clear();
      canRedo = Boolean(result.canRedo);
      break;
    }
    case HistoryAction.Redo: {
      canRedo = Boolean(result.canRedo) && !this.redoStack.peek();
      break;
    }
    default:
      break;
    }
    if (canRedo) {
      this.pushRedo(entry);
    }
  }

  /**
   * Push an entry to the redo stack.
   *
   * @param entry The entry to push.
   */
  private pushRedo(entry: HistoryStackEntry): void {
    const nextRedoEntry = this.redoStack.peek();
    if (nextRedoEntry === null || nextRedoEntry !== entry) {
      this.redoStack.push(entry);
    }
  }

  /**
   * Get the undo stack.
   *
   * @returns The undo stack.
   */
  public getUndoEntries(): HistoryStackEntry[] {
    return this.undoStack.getAll();
  }

  /**
   * Get the redo stack.
   *
   * @returns The redo stack.
   */
  public getRedoEntries(): HistoryStackEntry[] {
    return this.redoStack.getAll();
  }

  /**
   * Clear the undo and redo stack.
   */
  public clear(): void {
    this.undoStack.clear();
    this.redoStack.clear();
  }

  /**
   * Pop the top item of the undo stack.
   * Push that item in the redo stack.
   *
   * @returns The top of the undo stack.
   */
  public popUndo(): HistoryStackEntry | undefined {
    const entry = this.undoStack.pop();
    if (entry) {
      this.pushRedo(entry);
    }
    return entry;
  }

  /**
   * Pop the top item of the redo stack.
   *
   * @returns The top of the redo stack.
   */
  public popRedo(): HistoryStackEntry | undefined {
    return this.redoStack.pop();
  }

  /**
   * Peek at the top of the redo stack.
   *
   * @returns Top of the redo stack.
   */
  public peekRedo(): HistoryStackEntry | undefined {
    return this.redoStack.peek();
  }
}
