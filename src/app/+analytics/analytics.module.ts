import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdDatepickerModule, MdNativeDateModule } from '@angular/material';

import { AnalyticsRoutingModule } from './analytics.routing.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AnalyticsComponent } from './analytics.component';
import { AnalyticsHeaderComponent } from './components/analytics-header/analytics-header.component';
import { AnalyticsNavigatorComponent } from './components/analytics-navigator/analytics-navigator.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DateRangeSelectionComponent } from './components/date-range-selection/date-range-selection.component';

import { ReferralComponent } from './referral/referral.component';
import { TherapyComponent } from './therapy/therapy.component';
import { OrthopedicsComponent } from './orthopedics/orthopedics.component';
import { SurgeryComponent } from './surgery/surgery.component';
import { OrthodonticsComponent } from './orthodontics/orthodontics.component';

import { CellFormatPipe } from './components/data-table/cell-format.pipe';

import { AnalyticsService } from './analytics.service';
import { DateRangeService } from './components/date-range-selection/date-range.service';
import { ReferralIncComponent } from './referral/referral-inc/referral-inc.component';

@NgModule({
   imports: [
      CommonModule,
      AnalyticsRoutingModule,
      DashboardModule,
      ReactiveFormsModule,
      MdIconModule,
      MdCardModule,
      MdInputModule,
      MdButtonModule,
      MdNativeDateModule,
      MdDatepickerModule,
   ],
   declarations: [
      AnalyticsComponent,
      AnalyticsHeaderComponent,
      AnalyticsNavigatorComponent,
      ReferralComponent,
      TherapyComponent,
      DataTableComponent,
      CellFormatPipe,
      OrthopedicsComponent,
      SurgeryComponent,
      OrthodonticsComponent,
      DateRangeSelectionComponent,
      ReferralIncComponent,
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
