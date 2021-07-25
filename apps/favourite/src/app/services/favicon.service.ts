import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

/**
 * Favicon Service.
 *
 * Uses the Favicon Grabber API:
 * https://favicongrabber.com/api/grab/alexander-lloyd.dev
 */
@Injectable()
export class FaviconService {
  private readonly ERROR_ICON = '/favicon.ico';
  private readonly ICON_TYPE_PREFERENCE = [
    'image/svg+xml',
    'image/png',
    'image/x-icon'
  ];

  /**
   * Constructor.
   *
   * @param httpClient Http Client.
   */
  public constructor(
    private httpClient: HttpClient
  ) {}

  /**
   * Get the URL of the domains favicon If we get more than 1 icon
   * get the most preferred one.
   *
   * @param {string} domain Domain. E.g. 'github.com'
   * @returns {Observable<string>} The url for the icon.
   */
  public getFavicon(domain: string): Observable<string> {
    return this.httpClient.get<FaviconGrabberResponse>(this.buildUrl(domain)).pipe(
      map((response) => response.icons),
      map((icons) => {
        icons.sort((icon, icon2) => {
          // Sort by icon type preference.
          if (icon.type && icon2.type) {
            return this.ICON_TYPE_PREFERENCE.indexOf(icon2.type) - this.ICON_TYPE_PREFERENCE.indexOf(icon.type);
          } else if (icon.type && !icon2.type) {
            // If we have a type for 1
            return -1;
          }
          return 1;
        });
        return icons[0].src;
      }),
      catchError(() => this.ERROR_ICON)
    );
  }

  /**
   * Build the URL.
   *
   * @param {string} domain Domain to fetch.
   * @returns {string} API Url.
   */
  private buildUrl(domain: string): string {
    return `https://favicongrabber.com/api/grab/${domain}`;
  }
}

interface FaviconGrabberIcon {
  src: string;
  type?: string;
  sizes?: string;
}

interface FaviconGrabberResponse {
  domain: string,
  icons: FaviconGrabberIcon[]
}
