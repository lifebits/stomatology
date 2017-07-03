import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAccessDeniedComponent } from './page-access-denied/page-access-denied.component';

const routes: Routes = [
   {
      path: '404',
      component: PageNotFoundComponent
   },
   {
      path: '403',
      component: PageAccessDeniedComponent
   }
];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [ RouterModule ]
})
export class ErrorPagesRoutingModule {}