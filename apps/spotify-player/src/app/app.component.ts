import {Component} from '@angular/core';
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
  public constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authConfig);
    this.oauthService.tryLogin()
      .then((loggedIn) => {
        if (!loggedIn) {
          this.oauthService.initImplicitFlow();
        }
      });
  }
}
