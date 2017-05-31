import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { LoginUser, User } from '../users.interface';

@Injectable()
export class AuthService {

   constructor(
      private http: Http) {

   }

   userAuth(user: LoginUser) {
      const apiUrl = 'jkh';
   }

}
