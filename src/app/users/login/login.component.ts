import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from 'app/services/notification/notification.service';
import { AuthService } from '../auth/auth.service';

import { LoginUser } from '../users.interface';

import 'rxjs/operator/debounceTime';

@Component({
   selector: 'app-auth',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   public authForm: FormGroup = new FormGroup({
      login: new FormControl('veronika@lifebits.ru', [Validators.required]),
      password: new FormControl('', [Validators.required])
   });

   constructor(
      private router: Router,
      private auth: AuthService,
      private notification: NotificationService) {
   }

   ngOnInit(): void {

   }

   submit({ value, valid }: {value: LoginUser, valid: boolean}): void {
      if (valid) {
         this.auth.login(value).subscribe(
            result => {
               this.notification.success('Авторизация выполнена успешно');
               this.closeLoginPopup();
            }
         );
      } else {
         this.notification.error('Форма заполнена некорректно');
      }

      console.log(value, valid);
   }

   closeLoginPopup(): void {
      this.router.navigate([{outlets: {popup: null}}]);
   }

   // private getValidationErrors(formGroup: FormGroup, validationMsg: Object) {}
}
