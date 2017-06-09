import {Component, OnInit} from '@angular/core';
import {Route} from '@angular/router';


const PARTS: AnalyticsParts[] = [
   {
      title: 'Дашбоард',
      svg: 'analytics:speedometer',
      route: ['./']
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
      route: ''
   },
   {
      title: 'Ортодонтия',
      svg: 'analytics:orthodontics',
      route: ''
   },
   {
      title: 'Гигиентисты',
      svg: 'analytics:hygienists',
      route: ''
   }
];

@Component({
   selector: 'app-analytics-navigator',
   templateUrl: './analytics-navigator.component.html',
   styleUrls: ['./analytics-navigator.component.scss']
})
export class AnalyticsNavigatorComponent implements OnInit {

   parts: AnalyticsParts[] = PARTS;

   constructor() {
   }

   ngOnInit() {
   }

}

export interface AnalyticsParts {
   title: string;
   svg: string;
   route: Route;
}
