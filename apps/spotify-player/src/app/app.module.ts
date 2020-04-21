import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {OAuthModule, OAuthStorage} from 'angular-oauth2-oidc';

import {AppComponent} from './app.component';
import {MediaControlModule} from './media-control/media-control.module';
import {spotifyReducer} from './media-control/store/spotify.reducer';
import {SpotifyPlayerEffects} from './media-control/store/spotify.effects';
import {environment} from '../environments/environment';

/**
 * Ngx Translate Loader Factory.
 *
 * @param http HttpClient.
 * @returns Translate Loader.
 */
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}

/**
 * OAuthStorage Factory.
 *
 * @returns OAuthStorage.
 */
export function oAuthStorageFactory(): OAuthStorage {
  return localStorage;
}

/**
 * App Module.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.spotify.com/v1'],
        sendAccessToken: true
      }
    }),
    EffectsModule.forRoot([
      SpotifyPlayerEffects
    ]),
    StoreModule.forRoot({
      spotify: spotifyReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    MatButtonModule,
    MatProgressSpinnerModule,
    MediaControlModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: OAuthStorage,
      useFactory: oAuthStorageFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
