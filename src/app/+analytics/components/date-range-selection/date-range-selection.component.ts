import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
   selector: 'app-date-range-selection',
   templateUrl: './date-range-selection.component.html',
   styleUrls: ['./date-range-selection.component.scss']
})
export class DateRangeSelectionComponent implements OnInit {

   dateForm: FormGroup = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
   });

   constructor() {
   }

   ngOnInit() {
      this.dateForm.valueChanges.subscribe(
         value => console.log(value)
      );
   }

}
