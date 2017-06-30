import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from 'app/services/notification/notification.service';
import { AuthService } from '../../auth/auth.service';

import { LoginUser } from '../../users.interface';

@Component({
   selector: 'app-login-form',
   templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

   public authForm: FormGroup = new FormGroup({
      login: new FormControl('veronika@lifebits.ru', [Validators.required]),
      password: new FormControl('', [Validators.required])
   });

   constructor(
      private auth: AuthService,
      private notification: NotificationService) {
   }

   submit({ value, valid }: {value: LoginUser, valid: boolean}): void {
      if (valid) {
         this.auth.login(value)
            .subscribe(
               result => {
                  this.notification.success('Авторизация выполнена успешно');
                  // Надо сделать переход куда-нибудь
               }
            );
      } else {
         this.notification.error('Форма заполнена некорректно');
      }

      console.log(value, valid);
   }

}
