import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './users/auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
   {
      path: '',
      loadChildren: './+site-pages/site-pages.module#SitePagesModule'
   },
   {
      path: 'analytics',
      loadChildren: './+analytics/analytics.module#AnalyticsModule'
   },
   {
      path: 'auth',
      component: AuthComponent,
      outlet: 'popup'
   },
   {
      path: '**',
      component: PageNotFoundComponent
   }
];

@NgModule({
   imports: [
      RouterModule.forRoot(
         routes
      )
   ],
   exports: [ RouterModule ]
})
export class AppRoutingModule {}
