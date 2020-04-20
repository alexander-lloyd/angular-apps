import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BrowserModule} from '@angular/platform-browser';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {OAuthModule} from 'angular-oauth2-oidc';

import {AppComponent} from './app.component';
import {MediaControlModule} from './media-control/media-control.module';
import {spotifyReducer} from './media-control/store/spotify.reducer';
import {SpotifyPlayerEffects} from './media-control/store/spotify.effects';
import {environment} from '../environments/environment';


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
    MediaControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
