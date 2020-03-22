/**
 * NotImplementedError.
 */
export class NotImplementedError extends Error {
}

/**
 * Build a not implemented exception.
 *
 * @param message Error message.
 * @returns NotImplementedError.
 */
export function buildNotImplementedException(message: string): NotImplementedError {
  return new NotImplementedError(message);
}
