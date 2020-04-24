import {Component, OnDestroy, OnInit} from '@angular/core';
import {faSpotify} from '@fortawesome/free-brands-svg-icons';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {BehaviorSubject, Subscription, timer} from 'rxjs';

import {AuthConfigService} from './app-config.service';
import {actions, SpotifyState} from './media-control/store';

/**
 * App Component.
 */
@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  public faSpotify = faSpotify;

  public loading$ = new BehaviorSubject(true);
  public authenticated$ = new BehaviorSubject(false);

  private updateSpotify: Subscription | null = null;

  /**
   * Constructor.
   *
   * @param oauthService OAuthService.
   * @param translate TranslateService.
   * @param authConfigService AuthConfigService.
   * @param store Spotify Store.
   */
  public constructor(
    private oauthService: OAuthService,
    private translate: TranslateService,
    private authConfigService: AuthConfigService,
    private store: Store<SpotifyState>
  ) {
    const config = this.authConfigService.getConfig();
    this.oauthService.configure(config);
    this.translate.setDefaultLang('en');
  }

  public ngOnInit(): void {
    this.oauthService.tryLogin();
    const hasValidAccessToken = this.oauthService.hasValidAccessToken();
    this.authenticated$.next(hasValidAccessToken);
    // No longer loading.
    this.loading$.next(false);

    if (hasValidAccessToken) {
      this.updateSpotify = timer(0, 1000)
        .subscribe(() => this.updateCurrentTrack());
    }
  }

  public ngOnDestroy(): void {
    if (this.updateSpotify !== null) {
      this.updateSpotify.unsubscribe();
    }
  }

  public logIn(): void {
    this.oauthService.initImplicitFlow();
  }

  public updateCurrentTrack(): void {
    this.store.dispatch(actions.currentTrackRequest());
  }
}
