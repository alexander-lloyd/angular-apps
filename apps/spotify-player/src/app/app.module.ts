import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {OAuthModule} from 'angular-oauth2-oidc';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {spotifyReducer} from './media-control/store/spotify.reducer';
import {environment} from '../environments/environment';

/**
 * App Module.
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://api.spotify.com/v1'],
        sendAccessToken: true
      }
    }),
    StoreModule.forRoot({
      spotify: spotifyReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
