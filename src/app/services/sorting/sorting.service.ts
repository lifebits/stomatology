import { Injectable } from '@angular/core';

@Injectable()
export class SortingService {

  constructor() { }

   asc(fieldName: string) {
      return function(a, b): number {
         if (a[fieldName] > b[fieldName]) {
            return 1;
         }
         if (a[fieldName] < b[fieldName]) {
            return -1;
         }
         return 0;
      };
   }

   desc(fieldName: string) {
      return function(a, b): number {
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
