import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

@Pipe({
   name: 'cellFormat'
})
export class CellFormatPipe implements PipeTransform {

   constructor(
      private datePipe: DatePipe,
      private decimalPipe: DecimalPipe) {

   }

   transform(value: any, args?: any): any {

      if ( value instanceof Date ) {
         return this.datePipe.transform(value, args);
      }

      if ( Number.isFinite(value) ) {
         return this.decimalPipe.transform(value);
      }

      return value;
   }

}
