import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   constructor(
      private router: Router,
      private auth: AuthService) {
   }

   ngOnInit() {
      this.auth.isLoggedIn$
         .subscribe(isAuth => {
            if (isAuth) {
               this.router.navigate(['/analytics']);
            }
         })
   }

   cancelAuth() {
      this.router.navigate(['']);
   }

}
