import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ButtonModule} from '@al/button-component';

import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardContentComponent} from './dashboard-content/dashboard-content.component';
import {DashboardHeaderComponent} from './dashboard-header/dashboard-header.component';
import {DashboardHeaderLogoComponent} from './dashboard-header-logo/dashboard-header-logo.component';
import {DashboardSidebarComponent} from './dashboard-sidebar/dashboard-sidebar.component';
import {DashboardSidebarItemComponent} from './dashboard-sidebar-item/dashboard-sidebar-item.component';



/**
 * Dashboard Module.
 */
@NgModule({
  imports: [
    ButtonModule,
    CommonModule
  ],
  declarations: [
    DashboardComponent,
    DashboardContentComponent,
    DashboardHeaderComponent,
    DashboardHeaderLogoComponent,
    DashboardSidebarComponent,
    DashboardSidebarItemComponent
  ],
  exports: [
    DashboardComponent,
    DashboardContentComponent,
    DashboardHeaderComponent,
    DashboardHeaderLogoComponent,
    DashboardSidebarComponent,
    DashboardSidebarItemComponent
  ]
})
export class DashboardModule {}
