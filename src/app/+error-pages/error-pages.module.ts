import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPagesRoutingModule } from './error-pages.routing.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageAccessDeniedComponent } from './page-access-denied/page-access-denied.component';

@NgModule({
   imports: [
      CommonModule,
      ErrorPagesRoutingModule
   ],
   declarations: [
      PageNotFoundComponent,
      PageAccessDeniedComponent
   ]
})
export class ErrorPagesModule {
}
