import {Command, CommandResult, HistoryAction} from './types';
import {HistoryStackEntry, UndoHistory} from './undo-history';

/**
 * CommandHandlerResult.
 */
export interface CommandHandlerResult {
  key: string;
  action: HistoryAction;
  result: CommandResult;
}


/**
 * CommandHandler.
 */
export class CommandHandler {
  /**
   * Constructor.
   *
   * @param undoHistory UndoHistory object.
   */
  public constructor(private undoHistory: UndoHistory) {}

  /**
   * Execute the command.
   *
   * @param key The command name.
   * @param command The command to execute.
   * @returns The result of command execution.
   */
  public execute(key: string, command: Command): CommandHandlerResult {
    const result = command.execute();
    if (result.success && result.canUndo) {
      const entry: HistoryStackEntry = {
        key,
        command
      };
      this.undoHistory.add(entry, result, HistoryAction.Execute);
    }
    return {
      key,
      result,
      action: HistoryAction.Execute
    };
  }

  /**
   * Undo the previously executed command.
   *
   * @returns Result of the command handler.
   */
  public undo(): CommandHandlerResult | undefined {
    const entry = this.undoHistory.popUndo();
    if (!entry) {
      return undefined;
    }

    const commandResult = entry.command.undo();
    return {
      key: entry.key,
      result: commandResult,
      action: HistoryAction.Undo
    };
  }

  /**
   * Redo the previously undone command.
   *
   * @returns Result of the command handler.
   */
  public redo(): CommandHandlerResult | undefined {
    const entry = this.undoHistory.popRedo();
    if (!entry) {
      return undefined;
    }

    const commandResult = entry.command.redo();
    if (commandResult.success) {
      // Add back to the undo history.
      this.undoHistory.add(entry, commandResult, HistoryAction.Redo);
    }
    return {
      key: entry.key,
      result: commandResult,
      action: HistoryAction.Redo
    };
  }
}
