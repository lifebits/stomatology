import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdIconModule } from '@angular/material';

import { AnalyticsRoutingModule } from './analytics.routing.module';
import { ParseXlsComponent } from './parse-xls/parse-xls.component';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsHeaderComponent } from './components/analytics-header/analytics-header.component';
import { AnalyticsNavigatorComponent } from './components/analytics-navigator/analytics-navigator.component';

@NgModule({
   imports: [
      CommonModule,
      MdIconModule,
      AnalyticsRoutingModule
   ],
   declarations: [
      ParseXlsComponent,
      AnalyticsComponent,
      AnalyticsHeaderComponent,
      AnalyticsNavigatorComponent
   ]
})
export class AnalyticsModule {
}
