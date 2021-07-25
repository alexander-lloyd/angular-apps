import {Pipe, PipeTransform} from '@angular/core';
import { Observable } from 'rxjs';
import {FaviconService} from '../services/favicon.service';

/**
 * Icon Pipe. Get the Icon Url of a domain.
 */
@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {
  private readonly URL_REGEX = /(?<protocol>https?):\/\/(?<www>www\.)?(?<domain>[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})\b(?<path>[-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/giu;

  /**
   * Constructor.
   *
   * @param iconService IconService.
   */
  public constructor(
    private iconService: FaviconService
  ) {}

  /**
   * Get the Url of a domain.
   *
   * @param {string} value The full domain.
   * @return {string} The Url of the icon.
   */
  public transform(value: string): Observable<string> {
    const matches = this.URL_REGEX.exec(value);

    if (matches) {
      const domain = matches[3];
      console.log(domain);
      return this.iconService.getFavicon(domain);
    }

    return this.iconService.getFavicon('');
  }
}
