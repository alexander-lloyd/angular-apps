import {APP_BASE_HREF} from '@angular/common';
import {Inject, Injectable} from '@angular/core';
import {AuthConfig} from 'angular-oauth2-oidc';

const defaultConfig: AuthConfig = {
  loginUrl: 'https://accounts.spotify.com/authorize',
  clientId: '67ece50079eb4ff5baf9969e6905f022',
  responseType: 'token',
  scope: 'user-read-playback-state user-modify-playback-state',
  showDebugInformation: true,
  oidc: false
};

/**
 * AuthConfigService.
 */
@Injectable()
export class AuthConfigService {
  /**
   * Constructor.
   *
   * @param baseHref App Base Href.
   */
  public constructor(
    @Inject(APP_BASE_HREF) private baseHref: string
  ) {}

  /**
   * Get the OAuth Config.
   *
   * @returns OAuth Config.
   */
  public getConfig(): AuthConfig {
    const redirectUri = `${this.baseHref}`;
    return {
      ...defaultConfig,
      redirectUri
    };
  }
}
