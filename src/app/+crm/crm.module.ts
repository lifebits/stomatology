import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdInputModule, MdProgressBarModule, MdButtonModule } from '@angular/material';

import { CrmRoutingModule } from './crm.routing.module';
import { ComponentsModule } from '../components/components.module';

import { CrmComponent } from './crm.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

@NgModule({
   imports: [
      CommonModule,
      CrmRoutingModule,
      ComponentsModule,
      ReactiveFormsModule,
      MdInputModule,
      MdProgressBarModule,
      MdButtonModule
   ],
   declarations: [
      CrmComponent,
      PatientDetailComponent
   ]
})
export class CrmModule {
}
