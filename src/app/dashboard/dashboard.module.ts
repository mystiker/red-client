import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SearchModule } from '@red-probeaufgabe/search';
import { UiModule } from '@red-probeaufgabe/ui';
import { DashboardDetailsComponent } from './dashboard-details.component';
import { DashboardDetailsResolver } from './dashboard-details.prefetch';

@NgModule({
  declarations: [DashboardComponent, DashboardDetailsComponent],
  providers: [
    DashboardDetailsResolver
  ],
  imports: [CommonModule, UiModule, SearchModule, DashboardRoutingModule],
  exports: [DashboardComponent, DashboardDetailsComponent],
})
export class DashboardModule { }
