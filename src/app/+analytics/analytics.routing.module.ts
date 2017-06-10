import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReferralComponent } from './referral/referral.component';
import { TherapyComponent } from './therapy/therapy.component';
import { OrthopedicsComponent } from './orthopedics/orthopedics.component';
import { SurgeryComponent } from './surgery/surgery.component';

const routes: Routes = [
   {
      path: '',
      component: AnalyticsComponent,
      children: [
         {path: '', component: DashboardComponent},
         {path: 'referral', component: ReferralComponent},
         {path: 'therapy', component: TherapyComponent},
         {path: 'orthopedics', component: OrthopedicsComponent},
         {path: 'surgery', component: SurgeryComponent}
      ]
   }
];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [ RouterModule ]
})
export class AnalyticsRoutingModule {}
