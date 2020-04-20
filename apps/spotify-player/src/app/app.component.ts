import {Component, OnInit} from '@angular/core';
import {faSpotify} from '@fortawesome/free-brands-svg-icons';
import {TranslateService} from '@ngx-translate/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {BehaviorSubject} from 'rxjs';

import {authConfig} from './app.config';

/**
 * App Component.
 */
@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public faSpotify = faSpotify;

  public loading$ = new BehaviorSubject(true);
  public authenticated$ = new BehaviorSubject(false);

  public constructor(
    private oauthService: OAuthService,
    private translate: TranslateService
  ) {
    this.oauthService.configure(authConfig);
    this.translate.setDefaultLang('en');
  }

  public ngOnInit(): void {
    this.oauthService.tryLogin();
    this.authenticated$.next(this.oauthService.hasValidAccessToken());
    // No longer loading.
    this.loading$.next(false);
  }

  public logIn(): void {
    this.oauthService.initImplicitFlow();
  }
}
