import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrmComponent } from './crm.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

const routes: Routes = [
   {
      path: '',
      component: CrmComponent,
      children: [
         {
            path: 'patient', component: PatientDetailComponent
         }
      ]
   }
];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [ RouterModule ]
})
export class CrmRoutingModule {}
