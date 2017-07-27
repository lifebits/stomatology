import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdInputModule } from '@angular/material';

import { CrmRoutingModule } from './crm.routing.module';

import { CrmComponent } from './crm.component';

@NgModule({
   imports: [
      CommonModule,
      CrmRoutingModule,
      MdInputModule
   ],
   declarations: [CrmComponent]
})
export class CrmModule {
}
