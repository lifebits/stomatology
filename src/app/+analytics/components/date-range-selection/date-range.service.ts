import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface DateRange {
   startDate: Date;
   endDate: Date;
}

@Injectable()
export class DateRangeService {

   private currentDateRangeSource = new BehaviorSubject(this.getTestedDateRange());
   currentDateRange$ = this.currentDateRangeSource.asObservable();

   constructor() {}

   setCurrentDateRange(value: DateRange) {
      this.currentDateRangeSource.next(value);
   }

   getDateRangeForQuery(): string {
      const dateRange = this.currentDateRangeSource.getValue();
      return dateRange.startDate + ',' + dateRange.endDate;
   }

   dataFilteringByDate(data: Object[], dataField: string, dateRange?: DateRange): Object[] {
      const _dateRange = dateRange || this.currentDateRangeSource.getValue();
      const startDate = +_dateRange.startDate;
      const endDate = +_dateRange.endDate;
      return data.filter(a => {
         const dateReferral = +new Date(a[dataField]);
         return (dateReferral >= startDate && dateReferral <= endDate);
      });
   }

   getTestedDateRange(): DateRange {
      return {
         startDate: new Date(2017, 5, 1),
         endDate: new Date(2017, 5, 30)
      };
   }

   getCurrentDayRange(): DateRange {
      const currentDay = new Date();
      /*const dayOfMonth = currentDay.getDate();
      const startDay = new Date().setDate(dayOfMonth - 1);*/
      return {
         startDate: currentDay,
         endDate: currentDay
      };
   }

   getCurrentWeekRange(): DateRange {
      const currentDay = new Date();
      const dayOfWeek = currentDay.getDay();
      const dayOfMonth = currentDay.getDate();
      const result = new Date().setDate(dayOfMonth - dayOfWeek + 1);
      return {
         startDate: new Date(result),
         endDate: new Date()
      };
   }

   getCurrentMonthRange(): DateRange {
      const startDay = new Date().setDate(1);
      return {
         startDate: new Date(startDay),
         endDate: new Date()
      };
   }

   getCurrentQuarterRange() {
      const currentDay = new Date();
      const monthNumber = currentDay.getMonth();
      const quarter = new Date().setMonth(monthNumber - 2, 1);
      return {
         startDate: new Date(quarter),
         endDate: new Date()
      };
   }

   getCurrentYearRange(): DateRange {
      const currentDay = new Date();
      const currentYear = currentDay.getFullYear();
      const year = new Date().setFullYear(currentYear, 0, 1);
      return {
         startDate: new Date(year),
         endDate: new Date()
      };
   }
}
