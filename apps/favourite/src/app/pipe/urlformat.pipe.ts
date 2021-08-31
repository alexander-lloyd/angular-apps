import {Pipe, PipeTransform} from '@angular/core';

/**
 * Format a Url to be human readable. Remove encoding for storing tags.
 */
@Pipe({
  name: 'urlformat',
  pure: true
})
export class UrlFormatPipe implements PipeTransform {
  /**
   * Transform the url into a user friendly formatted url.
   *
   * @param {string} value url with tags encoded.
   * @returns Formatted Url.
   */
  public transform(value: string): string {
    const url = new URL(value);
    const tagIndex = url.hash.indexOf('~:tags');
    if (tagIndex > -1) {
      const [cleanedHash] = url.hash.split('~:tags');
      url.hash = cleanedHash;
    }
    return url.toString();
  }
}
