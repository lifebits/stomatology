import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdSnackBarModule } from '@angular/material';

import { NotificationService } from './notification/notification.service';
import { SortingService } from './sorting/sorting.service';

@NgModule({
   imports: [
      CommonModule,
      MdSnackBarModule
   ],
   providers: [
      NotificationService,
      SortingService
   ]
})
export class ServicesModule {}
