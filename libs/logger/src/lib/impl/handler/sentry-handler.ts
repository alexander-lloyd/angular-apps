import {ErrorMessage, LogHandler, LogMessage} from '../../api';

type StackTrace = {
  filename: string;
  function?: string,
  lineno?: number
  colno?: number;
  in_app?: boolean
};

const FILENAME_MATCH = /^\s*[-]{4,}$/u;
const LINE_MATCH = /at (?:(?<fun>.+)\s+\()?(?:(?<file>.+?):(?<line>\d+)(?::(?<col>\d+))?|(?<app>[^)]+))\)?/u;

/**
 * Sentry Log Handler.
 *
 * Send logs to sentry.
 */
export class SentryHandler implements LogHandler {
  private static readonly CLIENT_NAME = 'al-logger-sentry-handler';
  private static readonly CLIENT_VERSION = '1.0.0';

  /**
   * Constructor.
   *
   * @param  {string} projectId Project Id
   * @param  {string} key Project Key
   * @param  {string} applicationName Application Name
   * @param  {string} environment Environment
   * @param  {string} release Release Version
   */
  public constructor(
    private projectId: string,
    private key: string,
    private applicationName: string,
    private environment: string,
    private release: string
  ) {}

  /**
   * Send log messages to Sentry.
   *
   * @param   {LogMessage}  message Log Message.
   *
   * @returns {void}
   */
  public onMessage(message: LogMessage): void {
  }

  public onError(message: ErrorMessage): void {
    const url = `https://sentry.io/api/${this.projectId}/store/`;
    const headers = new Headers({
      'Content-Type': 'application/json',
      'X-Sentry-Auth': [
        'Sentry sentry_version=7',
        `Sentry_client=${SentryHandler.CLIENT_NAME}:${SentryHandler.CLIENT_VERSION}`
      ].join(',')
    });

    const errType = message.error.name || (message.error.constructor || {}).name;
    const frames = parseStackTrace(message.error)

    const body = {
      event_id: message.id,
      message: errType + ': ' + (message.error.message || '<no message>'),
      exception: {
        value: {
          type: errType,
          value: message.error.message,
          stacktrace: frames.length ? {frames: frames.reverse() } : undefined
        }
      },
      extra: {},
      tags:
    };

    const response = await fetch({
      headers,
      method: 'POST',
      url,
      body
    });
  }
}

/**
 * Parse an Error stacktrace.
 *
 * @param   {Error[]} error Error.
 * @returns {StackTrace[]} Parsed stacktrace.
 */
export function parseStackTrace(error: Error): StackTrace[] {
  return (error.stack || '')
    .split('\n')
    .slice(1)
    .map((line: string) => {
      if (line.match(FILENAME_MATCH)) {
        return {
          filename: line
        };
      }

      const lineMatch = line.match(LINE_MATCH)
      if (!lineMatch) {
        return
      }

      return {
        function: lineMatch[1] || undefined,
        filename: lineMatch[2] || undefined,
        lineno: Number(lineMatch[3]) || undefined,
        colno: Number(lineMatch[4]) || undefined,
        in_app: lineMatch[5] !== 'native' || undefined
      };
    })
    .filter(Boolean)
}
