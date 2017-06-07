import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReferralComponent } from './referral/referral.component';
import { TherapyComponent } from './therapy/therapy.component';

// import { ParseXlsComponent } from './parse-xls/parse-xls.component';

const routes: Routes = [
   {
      path: '',
      component: AnalyticsComponent,
      children: [
         {path: '', component: DashboardComponent},
         {path: 'referral', component: ReferralComponent},
         {path: 'therapy', component: TherapyComponent}
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
