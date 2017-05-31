import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing.module';
import { UsersModule } from './users/users.module';
import { SitePagesModule } from './+site-pages/site-pages.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
   declarations: [
      AppComponent,
      NotFoundComponent,
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      UsersModule,
      SitePagesModule,
   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule {
}
