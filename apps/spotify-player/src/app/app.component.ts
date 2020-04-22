import {Component, OnInit} from '@angular/core';
import {faSpotify} from '@fortawesome/free-brands-svg-icons';
import {TranslateService} from '@ngx-translate/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {BehaviorSubject} from 'rxjs';

import {AuthConfigService} from './app-config.service';

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

  /**
   * Constructor.
   *
   * @param oauthService OAuthService.
   * @param translate TranslateService.
   * @param authConfigService AuthConfigService.
   */
  public constructor(
    private oauthService: OAuthService,
    private translate: TranslateService,
    private authConfigService: AuthConfigService
  ) {
    const config = this.authConfigService.getConfig();
    this.oauthService.configure(config);
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
