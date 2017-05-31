import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SitePagesComponent } from './site-pages.component';

import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
   {
      path: '',
      component: SitePagesComponent,
      children: [
         {path: '', component: HomePageComponent},
         {path: 'about', component: AboutPageComponent},
      ]
   }
];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [ RouterModule ]
})
export class SitePagesRoutingModule {}
