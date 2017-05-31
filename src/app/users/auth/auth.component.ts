import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

import { LoginUser } from '../users.interface';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

   public authForm: FormGroup = new FormGroup({
      userName: new FormControl('Veronika', [Validators.required]),
      password: new FormControl('', [Validators.required])
   });

   constructor(
      private router: Router,
      private auth: AuthService) {

   }

   ngOnInit() {

   }

   userAuth({ value, valid }: {value: LoginUser, valid: boolean}): void {
      console.log(value, valid);
   }

   closeLoginPopup(): void {
      this.router.navigate([{outlets: {popup: null}}]);
   }

}
