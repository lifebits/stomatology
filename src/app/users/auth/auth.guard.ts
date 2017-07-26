import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { NotificationService } from 'app/services/notification/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {

   constructor(
      private auth: AuthService,
      private notification: NotificationService,
      private router: Router) {
   }

   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const url: string = state.url;
      return this.checkLogin(url);
   }

   checkLogin(url: string): boolean {
      if (this.auth.isLoggedIn) { return true; }
      this.auth.redirectUrl = url;
      this.router.navigate(['/login']);
      this.notification.error('Требуется авторизация');
      return false;
   }

}
