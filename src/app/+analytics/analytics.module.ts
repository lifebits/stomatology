import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics.routing.module';
import { ParseXlsComponent } from './parse-xls/parse-xls.component';
import { AnalyticsComponent } from './analytics.component';

@NgModule({
   imports: [
      CommonModule,
      AnalyticsRoutingModule
   ],
   declarations: [
      ParseXlsComponent,
      AnalyticsComponent
   ]
})
export class AnalyticsModule {
}
