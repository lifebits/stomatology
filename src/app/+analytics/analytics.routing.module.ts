import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics.component';
// import { ParseXlsComponent } from './parse-xls/parse-xls.component';

const routes: Routes = [
   {
      path: '',
      component: AnalyticsComponent
   }
];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [ RouterModule ]
})
export class AnalyticsRoutingModule {}
