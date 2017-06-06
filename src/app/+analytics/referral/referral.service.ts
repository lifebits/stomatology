import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class ReferralService {

   constructor(
      private http: Http) {
   }

   getDirectedPatients() {
      const url = 'assets/mocks/analytics/data.json';
      return this.http.get(url)
         .map((res: Response) => res.json())
         .map((data) => data['Обращения']);
   }

}
