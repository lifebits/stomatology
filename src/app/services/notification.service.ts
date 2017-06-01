import {Injectable} from '@angular/core';

import {MdSnackBar} from '@angular/material';

@Injectable()
export class NotificationService {

   private duration: number;

   constructor(private snackBar: MdSnackBar) {
      this.duration = 2000;
   }

   success(msg) {
      this.snackBar.open(msg, 'закрыть', {duration: this.duration, extraClasses: ['green']});
   }

   error(msg) {

   }

}
