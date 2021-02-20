import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

/**
 * Webpack injects these into our app bundle.
 */
declare const BUILD_TIME: number;
declare const COMMIT_HASH: string;
declare const VERSION: string;

/**
 * VersionService.
 *
 * Used in conjunction with the webpack.DefinePlugin to pass
 * app version, commit hash and build time into the web app.
 */
@Injectable()
export class VersionService {
  /**
   * Get the app build time.
   *
   * @returns app build time.
   */
  public getBuildTime(): Observable<string> {
    return of(new Date(BUILD_TIME).toUTCString());
  }

  /**
   * Get the app commit hash.
   *
   * @returns app commit hash.
   */
  public getCommitHash(): Observable<string> {
    return of(COMMIT_HASH);
  }

  /**
   * Get the app version.
   *
   * @returns app version string.
   */
  public getVersion(): Observable<string> {
    return of(VERSION);
  }
}
