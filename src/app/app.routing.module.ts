import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './users/auth/auth.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
   {
      path: '',
      loadChildren: './+site-pages/site-pages.module#SitePagesModule'
   },
   {
      path: 'auth',
      component: AuthComponent,
      outlet: 'popup'
   },
   {
      path: '**',
      component: NotFoundComponent
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
