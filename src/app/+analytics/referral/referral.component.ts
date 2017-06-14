import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-referral',
   templateUrl: './referral.component.html',
   styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

   buttonsList = [
      {
         name: 'mainList',
         title: 'Основной список',
         route: ['./']
      }, {
         name: 'contacts',
         title: 'Контакты текущих пациентов',
         route: ['./contacts']
      }, {
         name: 'pk',
         title: 'Доведены до ПК',
         route: ['./consultation']
      }, {
         name: 'pl',
         title: 'Доведены до ПЛ',
         route: ['./primary_treatment']
      }, {
         name: 'vl',
         title: 'Доведены до ВЛ',
         route: ['./re_treatment']
      }
   ];

   constructor() {

   }

   ngOnInit() {

   }
}
