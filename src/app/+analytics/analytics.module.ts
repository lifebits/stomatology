import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

import { AnalyticsRoutingModule } from './analytics.routing.module';
import { ParseXlsComponent } from './parse-xls/parse-xls.component';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsHeaderComponent } from './components/analytics-header/analytics-header.component';
import { AnalyticsNavigatorComponent } from './components/analytics-navigator/analytics-navigator.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DateRangeSelectionComponent } from './components/date-range-selection/date-range-selection.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ReferralComponent } from './referral/referral.component';
import { TherapyComponent } from './therapy/therapy.component';
import { OrthopedicsComponent } from './orthopedics/orthopedics.component';
import { SurgeryComponent } from './surgery/surgery.component';
import { OrthodonticsComponent } from './orthodontics/orthodontics.component';

import { CellFormatPipe } from './components/data-table/cell-format.pipe';

import { AnalyticsService } from './analytics.service';
import { DateRangeService } from './components/date-range-selection/date-range.service';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MdIconModule,
      MdCardModule,
      MdInputModule,
      MdButtonModule,
      MdNativeDateModule,
      MdDatepickerModule,
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
      OrthopedicsComponent,
      SurgeryComponent,
      OrthodonticsComponent,
      DateRangeSelectionComponent,
   ],
   providers: [
      DatePipe,
      DecimalPipe,
      AnalyticsService,
      DateRangeService
   ]
})
export class AnalyticsModule {
}
