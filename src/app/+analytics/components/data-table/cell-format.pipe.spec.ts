import {TestBed, inject} from '@angular/core/testing';

import {DatePipe, DecimalPipe} from '@angular/common';
import {CellFormatPipe} from './cell-format.pipe';

describe('CellFormatPipe', () => {
   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [DatePipe, DecimalPipe]
      });
   });

   it('create an instance', inject([DatePipe, DecimalPipe], (datePipe, decimalPipe) => {
      const pipe = new CellFormatPipe(datePipe, decimalPipe);
      expect(pipe).toBeTruthy();
   }));
});
