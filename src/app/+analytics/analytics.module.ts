import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdIconModule, MdCardModule, MdInputModule } from '@angular/material';

import { AnalyticsRoutingModule } from './analytics.routing.module';
import { ParseXlsComponent } from './parse-xls/parse-xls.component';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsHeaderComponent } from './components/analytics-header/analytics-header.component';
import { AnalyticsNavigatorComponent } from './components/analytics-navigator/analytics-navigator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReferralComponent } from './referral/referral.component';

import { ReferralService } from './referral/referral.service';
import { TherapyComponent } from './therapy/therapy.component';

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
   ],
   providers: [
      ReferralService
   ]
})
export class AnalyticsModule {
}
