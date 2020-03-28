import {AuthConfig} from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  loginUrl: 'https://accounts.spotify.com/authorize',
  redirectUri: `${window.location.origin}/index.html`,
  clientId: '67ece50079eb4ff5baf9969e6905f022',
  responseType: 'token',
  scope: 'user-read-playback-state user-modify-playback-state',
  showDebugInformation: true,
  oidc: false
};
