import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import {DashboardModule} from '@al/dashboard-components';

import {AppComponent} from './app.component';
import {BookmarkItemComponent} from './components/bookmark-item/bookmark-item.component';
import {BookmarkListComponent} from './components/bookmark-list/bookmark-list.component';
import {BookmarkSearchComponent} from './components/bookmark-search/bookmark-search.component';
import {BookmarkService} from './services/bookmark.service';
import {FaviconService} from './services/favicon.service';
import {IconPipe} from './pipe/icon.pipe';

/**
 * AppModule.
 */
@NgModule({
  declarations: [
    AppComponent,
    BookmarkListComponent,
    BookmarkItemComponent,
    BookmarkSearchComponent,
    IconPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    DashboardModule,
    HttpClientModule
  ],
  providers: [
    BookmarkService,
    FaviconService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
