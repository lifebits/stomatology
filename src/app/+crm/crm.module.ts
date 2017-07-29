import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdInputModule, MdProgressBarModule } from '@angular/material';

import { CrmRoutingModule } from './crm.routing.module';

import { CrmComponent } from './crm.component';

@NgModule({
   imports: [
      CommonModule,
      CrmRoutingModule,
      ReactiveFormsModule,
      MdInputModule,
      MdProgressBarModule
   ],
   declarations: [CrmComponent]
})
export class CrmModule {
}
