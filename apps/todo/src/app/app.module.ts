import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MomentModule} from 'ngx-moment';

import {LoggerModule} from '@al/logger';
import {AppComponent} from './app.component';
import {TodoListComponent} from './components/todo-item/todo-list.component';
import {LocalStorageService} from './services/local-storage.service';
import {TodoService} from './services/todo.service';
import {CreateTodoComponent} from './components/todo-item/create-todo/create-todo.component';
import {environment} from '../environments/environment';


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
    FormsModule,
    FontAwesomeModule,
    LoggerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MomentModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    LocalStorageService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
