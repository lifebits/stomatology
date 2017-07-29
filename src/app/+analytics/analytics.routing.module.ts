import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReferralComponent } from './referral/referral.component';
import { ReferralIncComponent } from './referral/referral-inc/referral-inc.component';
import { TherapyComponent } from './therapy/therapy.component';
import { OrthopedicsComponent } from './orthopedics/orthopedics.component';
import { SurgeryComponent } from './surgery/surgery.component';
import { OrthodonticsComponent } from './orthodontics/orthodontics.component';

const routes: Routes = [
   {
      path: '',
      component: AnalyticsComponent,
      children: [
         {
            path: 'dashboard', component: DashboardComponent
         },
         {
            path: 'referral',
            component: ReferralComponent,
            children: [
               {path: '', redirectTo: 'request', pathMatch: 'full'},
               {path: ':listType', component: ReferralIncComponent}
            ]
         },
         {
            path: 'therapy', component: TherapyComponent
         },
         {
            path: 'orthopedics', component: OrthopedicsComponent
         },
         {
            path: 'surgery', component: SurgeryComponent
         },
         {
            path: 'orthodontics', component: OrthodonticsComponent
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
export class AnalyticsRoutingModule {}
