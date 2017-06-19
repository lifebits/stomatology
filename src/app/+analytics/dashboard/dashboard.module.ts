import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { PatientMovementComponent } from './patient-movement/patient-movement.component';

import { ChartsService } from 'app/services/chart/charts.service';

@NgModule({
   imports: [
      CommonModule,
      MdCardModule
   ],
   declarations: [
      DashboardComponent,
      PatientMovementComponent
   ],
   providers: [
      ChartsService
   ]
})
export class DashboardModule {
}
