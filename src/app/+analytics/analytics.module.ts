import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdIconModule, MdCardModule, MdInputModule, MdButtonModule, MdDatepickerModule, MdNativeDateModule,
   MdProgressBarModule, MdMenuModule } from '@angular/material';

import { AnalyticsRoutingModule } from './analytics.routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsModule } from '../components/components.module';

import { AnalyticsComponent } from './analytics.component';
import { AnalyticsHeaderComponent } from './components/analytics-header/analytics-header.component';
import { AnalyticsNavigatorComponent } from './components/analytics-navigator/analytics-navigator.component';
import { DateRangeSelectionComponent } from './components/date-range-selection/date-range-selection.component';

import { ReferralComponent } from './referral/referral.component';
import { TherapyComponent } from './therapy/therapy.component';
import { OrthopedicsComponent } from './orthopedics/orthopedics.component';
import { SurgeryComponent } from './surgery/surgery.component';
import { OrthodonticsComponent } from './orthodontics/orthodontics.component';

import { DateRangeService } from './components/date-range-selection/date-range.service';
import { ReferralIncComponent } from './referral/referral-inc/referral-inc.component';

@NgModule({
   imports: [
      CommonModule,
      AnalyticsRoutingModule,
      DashboardModule,
      ComponentsModule,
      ReactiveFormsModule,
      MdIconModule,
      MdCardModule,
      MdInputModule,
      MdButtonModule,
      MdNativeDateModule,
      MdDatepickerModule,
      MdProgressBarModule,
      MdMenuModule
   ],
   declarations: [
      AnalyticsComponent,
      AnalyticsHeaderComponent,
      AnalyticsNavigatorComponent,
      ReferralComponent,
      TherapyComponent,
      OrthopedicsComponent,
      SurgeryComponent,
      OrthodonticsComponent,
      DateRangeSelectionComponent,
      ReferralIncComponent,
   ],
   providers: [
      DateRangeService
   ]
})
export class AnalyticsModule {
}
