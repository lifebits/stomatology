import { Component, EventEmitter, Output } from '@angular/core';
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

   @Output() onCanceledAuth = new EventEmitter();

   constructor(
      private auth: AuthService,
      private notification: NotificationService) {
   }

   submit({ value, valid }: {value: LoginUser, valid: boolean}): void {
      if (valid) {
         this.auth.login(value)
            .subscribe(
               authStatus => {
                  if (authStatus) {
                     this.notification.success('Авторизация выполнена успешно');
                  } else {
                     this.notification.error('Не правильная пара логин / пароль');
                  }
               }
            );
      } else {
         this.notification.error('Форма заполнена некорректно');
      }

      console.log(value, valid);
   }

   cancelAuth() {
      this.onCanceledAuth.emit();
   }

}
