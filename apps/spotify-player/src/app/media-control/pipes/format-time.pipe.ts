import {Pipe, PipeTransform} from '@angular/core';

const DEFAULT_PADDING = 2;

function pad(n: number, z: number = DEFAULT_PADDING): string {
  return `00${n}`.slice(-z);
}

/**
 * FormatTimePipe.
 */
@Pipe({
  name: 'formattime',
  pure: true
})
export class FormatTimePipe implements PipeTransform {
  private static readonly MILLISECONDS_IN_SECONDS = 1000;
  private static readonly SECONDS_IN_MINUTE = 60;
  private static readonly MINUTES_IN_HOUR = 60;
  private static readonly ZERO = 0;

  /**
   * Transform a millisecond value into a formatted string.
   *
   * @param ms The number of milliseconds
   * @returns Formatted String.
   *
   * @example transform(0) -> 0:00
   * @example transform(2000) -> 0:02
   * @example transform(60000) -> 1:00
   */
  public transform(ms: number): string {
    const seconds = Math.floor((ms / FormatTimePipe.MILLISECONDS_IN_SECONDS) % FormatTimePipe.SECONDS_IN_MINUTE);
    const minutes = Math.floor((ms / (
      FormatTimePipe.SECONDS_IN_MINUTE *
      FormatTimePipe.MILLISECONDS_IN_SECONDS
    )) % FormatTimePipe.MINUTES_IN_HOUR);
    const hours = Math.floor(ms / (
      FormatTimePipe.MINUTES_IN_HOUR *
      FormatTimePipe.SECONDS_IN_MINUTE *
      FormatTimePipe.MILLISECONDS_IN_SECONDS
    ));

    if (hours > FormatTimePipe.ZERO) {
      return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }

    return `${minutes}:${pad(seconds)}`;
  }
}
