import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogbookUploadComponent } from './logbook/logbook-upload/logbook-upload.component';
import { LoginComponent } from './users/login/login.component';
import { LogautComponent } from './users/logaut/logaut.component';
import { LoginModalComponent } from './users/login-modal/login-modal.component';
import { PageNotFoundComponent } from './+error-pages/page-not-found/page-not-found.component';

import { AuthGuard } from './users/auth/auth.guard';

const routes: Routes = [
   {
      path: '',
      loadChildren: './+site-pages/site-pages.module#SitePagesModule'
   },
   {
      path: 'logbook',
      canActivate: [ AuthGuard ],
      component: LogbookUploadComponent
   },
   {
      path: 'analytics',
      canActivate: [ AuthGuard ],
      loadChildren: './+analytics/analytics.module#AnalyticsModule'
   },
   {
      path: 'crm',
      canActivate: [ AuthGuard ],
      loadChildren: './+crm/crm.module#CrmModule'
   },
   {
      path: 'error',
      loadChildren: './+error-pages/error-pages.module#ErrorPagesModule'
   },
   {
      path: 'login',
      component: LoginComponent
   },
   {
      path: 'login',
      component: LoginModalComponent,
      outlet: 'popup'
   },
   {
      path: 'logaut',
      component: LogautComponent
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
