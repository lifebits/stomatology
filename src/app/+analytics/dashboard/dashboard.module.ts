import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdProgressBarModule } from '@angular/material';

import { DashboardComponent } from './dashboard.component';
import { PatientMovementComponent } from './patient-movement/patient-movement.component';

import { ChartsService } from 'app/services/chart/charts.service';
import { KeyIndicatorsContainerComponent } from './key-indicators-container/key-indicators-container.component';
import { KeyIndicatorWidgetComponent } from './key-indicators-container/key-indicator-widget/key-indicator-widget.component';

@NgModule({
   imports: [
      CommonModule,
      MdCardModule,
      MdProgressBarModule
   ],
   declarations: [
      DashboardComponent,
      PatientMovementComponent,
      KeyIndicatorsContainerComponent,
      KeyIndicatorWidgetComponent
   ],
   providers: [
      ChartsService
   ]
})
export class DashboardModule {
}
