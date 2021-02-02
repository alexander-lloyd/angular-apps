/**
 * CommandResult.
 */
export interface CommandResult {
  /**
   * Was the command successful.
   */
  success: boolean;

  /**
   * Can the command be undone?
   */
  canUndo?: boolean;

  /**
   * Can the action be redone?
   */
  canRedo?: boolean;
}

/**
 * Command.
 */
export interface Command {
  /**
   * Execute a command.
   *
   * @returns CommandResult.
   */
  execute(): CommandResult;

  /**
   * Cancel an action that was executed by execute().
   *
   * @returns CommandResult.
   */
  undo(): CommandResult;

  /**
   * Re execute an action that was executed by execute() function..
   *
   * @returns CommandResult.
   */
  redo(): CommandResult;

  /**
   * Optional name used for logging or debugging.
   *
   * @returns CommandResult.
   */
  displayName?: string;
}

/**
 * HistoryAction.
 */
export enum HistoryAction {
  Execute,
  Undo,
  Redo
}
