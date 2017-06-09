import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdIconModule, MdCardModule, MdInputModule } from '@angular/material';

import { AnalyticsRoutingModule } from './analytics.routing.module';
import { ParseXlsComponent } from './parse-xls/parse-xls.component';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsHeaderComponent } from './components/analytics-header/analytics-header.component';
import { AnalyticsNavigatorComponent } from './components/analytics-navigator/analytics-navigator.component';
import { DataTableComponent } from './components/data-table/data-table.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ReferralComponent } from './referral/referral.component';
import { TherapyComponent } from './therapy/therapy.component';

import { CellFormatPipe } from './components/data-table/cell-format.pipe';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MdIconModule,
      MdCardModule,
      MdInputModule,
      AnalyticsRoutingModule
   ],
   declarations: [
      ParseXlsComponent,
      AnalyticsComponent,
      AnalyticsHeaderComponent,
      AnalyticsNavigatorComponent,
      DashboardComponent,
      ReferralComponent,
      TherapyComponent,
      DataTableComponent,
      CellFormatPipe,
   ],
   providers: [
      DatePipe,
      DecimalPipe
   ]
})
export class AnalyticsModule {
}
