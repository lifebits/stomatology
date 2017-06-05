import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'app/users/auth/auth.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { User } from '../../../users/users.interface';

@Component({
   selector: 'app-header-contacts',
   templateUrl: './header-contacts.component.html',
   styleUrls: ['./header-contacts.component.scss']
})
export class HeaderContactsComponent implements OnInit {

   private subscription: Subscription;

   isLoggedIn: boolean;
   currentUser: User;

   constructor(
      private auth: AuthService) {
   }

   ngOnInit() {
      this.subscription = this.auth.isLoggedIn$
         .do(authStatus => this.isLoggedIn = authStatus)
         .switchMap(() => this.auth.getAuthUser())
         .filter(authUser => !!authUser)
         .subscribe(
            authUser => this.currentUser = authUser
         );
   }

   exit() {
      this.auth.logout();
   }

}
