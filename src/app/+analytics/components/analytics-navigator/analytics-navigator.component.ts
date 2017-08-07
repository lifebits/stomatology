import { Component } from '@angular/core';
import { Route } from '@angular/router';

export interface AnalyticsParts {
   title: string;
   svg: string;
   route: Route;
}

const PARTS: AnalyticsParts[] = [
   {
      title: 'Дашбоард',
      svg: 'analytics:speedometer',
      route: ['./dashboard']
   },
   {
      title: 'Обращения',
      svg: 'analytics:patient',
      route: ['./referral']
   },
   {
      title: 'Терапия',
      svg: 'analytics:therapy',
      route: ['./therapy']
   },
   {
      title: 'Ортопедия',
      svg: 'analytics:orthopedics',
      route: ['./orthopedics']
   },
   {
      title: 'Хирургия',
      svg: 'analytics:surgery',
      route: ['./surgery']
   },
   {
      title: 'Ортодонтия',
      svg: 'analytics:orthodontics',
      route: ['./orthodontics']
   },
   {
      title: 'Гигиентисты',
      svg: 'analytics:hygienists',
      route: ['./hygienists']
   },
   {
      title: 'Снимки',
      svg: 'analytics:pictures',
      route: ['./pictures']
   }
];

@Component({
   selector: 'app-analytics-navigator',
   templateUrl: './analytics-navigator.component.html',
   styleUrls: ['./analytics-navigator.component.scss']
})
export class AnalyticsNavigatorComponent {

   parts: AnalyticsParts[] = PARTS;

   constructor() {}

}
