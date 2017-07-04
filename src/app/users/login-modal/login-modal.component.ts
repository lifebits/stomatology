import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   selector: 'app-auth',
   templateUrl: './login-modal.component.html',
   styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

   constructor(
      private router: Router) {
   }

   ngOnInit() {

   }

   closeLoginPopup(): void {
      this.router.navigate([{outlets: {popup: null}}]);
   }
}
