import { Injectable } from '@angular/core';
import { DateRange } from '../../analytics.service';

@Injectable()
export class DateRangeService {

   constructor() {}

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
}
