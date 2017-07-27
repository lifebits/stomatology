import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app.routing.module';

import { AnalyticsModule } from './+analytics/analytics.module';
import { SitePagesModule } from './+site-pages/site-pages.module';
import { CrmModule } from './+crm/crm.module';
import { ErrorPagesModule } from './+error-pages/error-pages.module';

import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { LogbookModule } from './logbook/logbook.module';

import { AppComponent } from './app.component';

@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      BrowserAnimationsModule,
      ServicesModule,
      AppRoutingModule,
      UsersModule,
      LogbookModule,
      SitePagesModule,
      CrmModule,
      ErrorPagesModule,
      AnalyticsModule,
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
