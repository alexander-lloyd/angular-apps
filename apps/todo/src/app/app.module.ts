import {BrowserModule} from '@angular/platform-browser';
import {APP_BASE_HREF, DOCUMENT} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {DateFnsModule} from 'ngx-date-fns';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {LoggerModule} from '@al/logger';
import {AppComponent} from './app.component';
import {TodoListComponent} from './components/todo-item/todo-list.component';
import {LocalStorageService} from './services/local-storage.service';
import {TodoService} from './services/todo.service';
import {CreateTodoComponent} from './components/create-todo/create-todo.component';
import {environment} from '../environments/environment';
import {TodoEffects} from './store/todo.effects';
import {todoReducer} from './store/todo.reducer';

/**
 * Ngx Translate Loader Factory.
 *
 * @param http HttpClient.
 * @param baseHref The base url.
 * @returns Translate Loader.
 */
export function translateLoaderFactory(http: HttpClient, baseHref: string): TranslateLoader {
  const url = new URL('assets/i18n/', baseHref);
  return new TranslateHttpLoader(http, url.href);
}

/**
 * Get the base url.
 *
 * @param document The Document object.
 * @returns The Base URL.
 */
function getBaseUrl(document: Document): string {
  const ZERO = 0;
  return document.getElementsByTagName('base')[ZERO].href;
}

/**
 * AppModule.
 */
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    CreateTodoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DateFnsModule.forRoot(),
    EffectsModule.forRoot([TodoEffects]),
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    LoggerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    StoreModule.forRoot({
      todo: todoReducer
    }, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient, APP_BASE_HREF]
      }
    })
  ],
  providers: [
    LocalStorageService,
    TodoService,
    {
      provide: APP_BASE_HREF,
      useFactory: getBaseUrl,
      deps: [DOCUMENT]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
