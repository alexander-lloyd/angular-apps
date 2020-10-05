import {BrowserModule} from '@angular/platform-browser';
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
    })
  ],
  providers: [
    LocalStorageService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
