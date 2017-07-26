import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
   selector: 'app-auth',
   templateUrl: './login-modal.component.html',
   styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

   constructor(
      private auth: AuthService,
      private router: Router) {
   }

   ngOnInit() {
      this.auth.isLoggedIn$
         .subscribe(isAuth => {
            if (isAuth) {
               this.router.navigate(['/']);
            }
         })
   }

   closeLoginPopup(): void {
      this.router.navigate([{outlets: {popup: null}}]);
   }
}
