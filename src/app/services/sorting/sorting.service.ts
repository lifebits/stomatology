import { Injectable } from '@angular/core';

@Injectable()
export class SortingService {

  constructor() { }

   asc(fieldName: string): Function {
      return function(a, b) {
         if (a[fieldName] > b[fieldName]) {
            return 1;
         }
         if (a[fieldName] < b[fieldName]) {
            return -1;
         }
         return 0;
      };
   }

   desc(fieldName: string): Function {
      return function(a, b) {
         if (a[fieldName] > b[fieldName]) {
            return -1;
         }
         if (a[fieldName] < b[fieldName]) {
            return 1;
         }
         return 0;
      };
   }

}
