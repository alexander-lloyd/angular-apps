import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DashboardHeaderComponent} from './dashboard-header/dashboard-header.component';
import {DashboardHeaderLogoComponent} from './dashboard-header-logo/dashboard-header-logo.component';

import {ButtonModule} from '@al/button-component';

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
    DashboardHeaderComponent,
    DashboardHeaderLogoComponent
  ],
  exports: [
    DashboardComponent,
    DashboardHeaderComponent,
    DashboardHeaderLogoComponent
  ]
})
export class DashboardModule {}
