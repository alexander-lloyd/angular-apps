export class NotImplementedError extends Error {
}

/**
 * Build a not implemented exception.
 */
export function buildNotImplementedException(message: string): NotImplementedError {
  return new NotImplementedError(message);
}
