import { Component } from '@angular/core';
import { Route } from '@angular/router';

interface Button {
   title: string,
   route: Route
}

@Component({
   selector: 'app-referral',
   templateUrl: './referral.component.html',
   styleUrls: ['./referral.component.scss']
})
export class ReferralComponent {

   buttonsList: Button[] = [
      {
         title: 'Основной список',
         route: ['./request']
      }, {
         title: 'Доведены до ПК',
         route: ['./consultation']
      }, {
         title: 'Доведены до ПЛ',
         route: ['./primary_treatment']
      }, {
         title: 'Доведены до ВЛ',
         route: ['./re_treatment']
      }, {
         title: 'Контакты текущих пациентов',
         route: ['./contacts']
      }
   ];

   constructor() {

   }

}
