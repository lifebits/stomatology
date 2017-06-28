import {Component} from '@angular/core';

@Component({
   selector: 'app-header-nav',
   templateUrl: './header-nav.component.html',
   styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent {

   navButtons = [
      {
         name: '',
         title: 'Главная',
         route: ['']
      }, {
         name: '',
         title: 'Услуги',
         route: ['./service']
      }, {
         name: '',
         title: 'Прайс-лист',
         route: ['./price']
      }, {
         name: '',
         title: 'Рассрочка',
         route: ['./bebebe']
      }, {
         name: '',
         title: 'Врачи',
         route: ['./staff']
      }, {
         name: '',
         title: 'Памятка',
         route: ['./jotting']
      }, {
         name: '',
         title: 'О компании',
         route: ['/about']
      }, {
         name: '',
         title: 'Контакты',
         route: ['./contacts']
      }
   ];

   constructor() {
   }

}
