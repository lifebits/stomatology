import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AnalyticsService, DateRange } from '../../analytics.service';
import { DateRangeService } from './date-range.service';

interface DateRangeButton {
   name: string;
   title: string;
   isActive: boolean;
}

@Component({
   selector: 'app-date-range-selection',
   templateUrl: './date-range-selection.component.html',
   styleUrls: ['./date-range-selection.component.scss']
})
export class DateRangeSelectionComponent implements OnInit {

   buttons: DateRangeButton[] = [
      {
         name: 'year',
         title: 'год',
         isActive: false
      }, {
         name: 'quarter',
         title: 'квартал',
         isActive: false
      }, {
         name: 'month',
         title: 'месяц',
         isActive: false
      }, {
         name: 'week',
         title: 'неделя',
         isActive: false
      }, {
         name: 'day',
         title: 'день',
         isActive: false
      }
   ];

   dateForm: FormGroup = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('')
   });

   constructor(
      private analytics: AnalyticsService,
      private dateRange: DateRangeService) {

   }

   ngOnInit() {
      // const range = this.dateRange.getCurrentDayRange();
      /*this.dateForm.patchValue({
         startDate: range.startDate,
         endDate: range.endDate
      });*/
      this.dateForm.valueChanges.subscribe(
         value => {
            // console.log(value);
         }
      );
   }

   setDateRange(dateRange) {
      this.resetActiveStatus();
      dateRange.isActive = true;
      switch (dateRange.name) {
         case 'day':
            this.patchDateForm(this.dateRange.getCurrentDayRange());
            break;
         case 'week':
            this.patchDateForm(this.dateRange.getCurrentWeekRange());
            break;
         case 'month':
            this.patchDateForm(this.dateRange.getCurrentMonthRange());
            break;
      }
   }

   private resetActiveStatus() {
      this.buttons.map(p => {
         p.isActive = false;
         return p;
      });
   }

   private patchDateForm(value: DateRange) {
      this.dateForm.patchValue({
         startDate: value.startDate,
         endDate: value.endDate
      });
   }

}
