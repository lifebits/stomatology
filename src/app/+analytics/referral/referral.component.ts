import { Component } from '@angular/core';

@Component({
   selector: 'app-referral',
   templateUrl: './referral.component.html',
   styleUrls: ['./referral.component.scss']
})
export class ReferralComponent {

   buttonsList = [
      {
         title: 'Основной список',
         route: ['./main']
      }, {
         title: 'Доведены до ПК',
         route: ['./consultation']
      }, {
         title: 'Доведены до ПЛ',
         route: ['./primary-treatment']
      }, {
         title: 'Доведены до ВЛ',
         route: ['./re-treatment']
      }, {
         title: 'Контакты текущих пациентов',
         route: ['./contacts']
      }
   ];

   constructor() {

   }

}
