import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdSnackBarModule } from '@angular/material';

import { NotificationService } from './notification/notification.service';

@NgModule({
   imports: [
      CommonModule,
      MdSnackBarModule
   ],
   providers: [
      NotificationService
   ]
})
export class ServicesModule {}
