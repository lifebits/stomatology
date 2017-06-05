import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitePagesRoutingModule } from './site-pages.routing.module';

import { MdIconModule, MdButtonModule, MdMenuModule } from '@angular/material';

import { HeaderContactsComponent } from './components/header-contacts/header-contacts.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';

import { SitePagesComponent } from './site-pages.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeSlideComponent } from './home-page/home-slide/home-slide.component';
import { AboutPageComponent } from './about-page/about-page.component';


@NgModule({
   imports: [
      CommonModule,
      SitePagesRoutingModule,
      MdIconModule,
      MdButtonModule,
      MdMenuModule
   ],
   declarations: [
      HeaderContactsComponent,
      HeaderLogoComponent,
      HeaderNavComponent,
      SitePagesComponent,
      HomePageComponent,
      HomeSlideComponent,
      AboutPageComponent,
   ]
})
export class SitePagesModule {
}
