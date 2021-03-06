import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { NotificationService } from 'app/services/notification/notification.service';
import { LoginUser, User } from '../users.interface';

@Injectable()
export class AuthService {

   redirectUrl: string;
   isLoggedIn: boolean = !!localStorage.getItem('user');

   private isLoggedInSource = new BehaviorSubject<boolean>(this.isLoggedIn);
   isLoggedIn$ = this.isLoggedInSource.asObservable();

   constructor(
      private http: Http,
      private router: Router,
      private notification: NotificationService) {

      console.log('local storage: ', localStorage.getItem('user'));
   }

   setAuthStatus(value: boolean): void {
      this.isLoggedInSource.next(value);
      this.isLoggedIn = value;
   }

   login(user: LoginUser): Observable<User> {
      const url = 'assets/mocks/users.json';
      return this.http.get(url)
         .map((res: Response) => res.json())
         .map((users: User[]) => users.find(p => p.account.login === user.login))
         .map((authUser: User) => {
            if (authUser) { this.setAuthUser(authUser); }
            return authUser;
         })
         .catch((error: any) => {
            this.notification.error('Серверная ошибка!');
            return Observable.throw(error);
         });
   }

   logout(): void {
      localStorage.removeItem('user');
      this.setAuthStatus(false);
   }

   getAuthUser(): Observable<User> {
      const user: User = JSON.parse(localStorage.getItem('user'));
      return Observable.of(user);
   }

   private setAuthUser(user: User): void {
      if (user && user.token) {
         localStorage.setItem('user', JSON.stringify(user));
         this.setAuthStatus(true);
      }
   }

   private redirect(url: string): void {

   }
}
