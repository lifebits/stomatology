import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-referral',
   templateUrl: './referral.component.html',
   styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

   buttonsList = [
      {
         // name: 'mainList',
         title: 'Основной список',
         route: ['./']
      }, {
         // name: 'consultation',
         title: 'Доведены до ПК',
         route: ['./consultation']
      }, {
         // name: 'primary-treatment',
         title: 'Доведены до ПЛ',
         route: ['./primary-treatment']
      }, {
         // name: 're-treatment',
         title: 'Доведены до ВЛ',
         route: ['./re-treatment']
      }, {
         // name: 'contacts',
         title: 'Контакты текущих пациентов',
         route: ['./contacts']
      }
   ];

   constructor() {

   }

   ngOnInit() {

   }
}
