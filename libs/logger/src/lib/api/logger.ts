/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Logger Interface.
 */
export interface Logger {
  /**
   * Outputs a message to the console with the log level "debug".
   * The message is only displayed to the user if the output is
   * configured to display debug output.
   *
   * @param messages A list of JavaScript objects to output.
   */
  debug(messages?: any, ...args: any[]): void;

  /**
   * Outputs a message to the console with the log level "info".
   * The message is only displayed to the user if the output is
   * configured to display info output.
   *
   * @param messages A list of JavaScript objects to output.
   */
  info(messages?: any, ...args: any[]): void;

  /**
   * Outputs a message to the console with the log level "warn".
   * The message is only displayed to the user if the output is
   * configured to display warn output.
   *
   * @param messages A list of JavaScript objects to output.
   */
  warn(messages?: any, ...args: any[]): void;

  /**
   * Outputs a message to the console with the log level "error".
   * The message is only displayed to the user if the output is
   * configured to display error output.
   *
   * @param messages A list of JavaScript objects to output.
   */
  error(messages?: any, ...args: any[]): void;
}
