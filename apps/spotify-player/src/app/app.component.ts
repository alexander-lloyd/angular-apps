import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OAuthService} from 'angular-oauth2-oidc';

import {authConfig} from './app.config';

/**
 * App Component.
 */
@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public constructor(
    private oauthService: OAuthService,
    private httpClient: HttpClient) {
    this.oauthService.configure(authConfig);
    this.oauthService.tryLogin()
      .then((loggedIn) => {
        if (!loggedIn) {
          this.oauthService.initImplicitFlow();
        }
      });
    this.httpClient.put('https://api.spotify.com/v1/me/player/pause', {}).subscribe({
      next: (content) => console.log(content)
    });
  }
}
