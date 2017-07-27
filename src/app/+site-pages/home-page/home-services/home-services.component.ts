import { Component, OnInit } from '@angular/core';

interface HomeServiceGroup {
   title: string;
   svg: string;
   services: HomeServiceItem[];
}

interface HomeServiceItem {
   title: string;
   route: string;
}

@Component({
   selector: 'app-home-services',
   templateUrl: './home-services.component.html',
   styleUrls: ['./home-services.component.scss']
})
export class HomeServicesComponent implements OnInit {

   serviceList: HomeServiceGroup[] = [
      {
         title: 'Лечение зубов',
         svg: 'home-page:dental-treatment',
         services: [
            {
               title: 'Лечение зубов',
               route: ''
            }, {
               title: 'Лечение каналов зуба',
               route: ''
            }, {
               title: 'Лечение пульпита',
               route: ''
            }, {
               title: 'Пломбирование зубов',
               route: ''
            }
         ]
      }, {
         title: 'Реставрация зубов',
         svg: 'home-page:teeth-restoration',
         services: [
            {
               title: 'Установка виниров',
               route: ''
            }, {
               title: 'Эстетическая стоматология переднего зуба',
               route: ''
            }
         ]
      }, {
         title: 'Удаление зубов',
         svg: 'home-page:tooth-removal',
         services: [
            {
               title: 'Сложное удаление зуба',
               route: ''
            }, {
               title: 'Удаление зуба мудрости',
               route: ''
            }
         ]
      }, {
         title: 'Протезирование зубов',
         svg: 'home-page:dental-prosthetics',
         services: [
            {
               title: 'Безметалловая керамика',
               route: ''
            }, {
               title: 'Металлокерамика',
               route: ''
            }, {
               title: 'Установка протеза',
               route: ''
            }
         ]
      }, {
         title: 'Исправление прикуса',
         svg: 'home-page:occlusion-correction',
         services: [
            {
               title: 'Сапфировые брекеты',
               route: ''
            }, {
               title: 'Металлические брекеты',
               route: ''
            }, {
               title: 'Исправление прикуса брекетами',
               route: ''
            }, {
               title: 'Капы для выравнивания',
               route: ''
            }
         ]
      }, {
         title: 'Имплантация зубов',
         svg: 'home-page:tooth-implantation',
         services: [
            {
               title: 'Синус-лифтинг',
               route: ''
            }, {
               title: 'Имплантант на зубы',
               route: ''
            }, {
               title: 'Имплантация Alpha Bio',
               route: ''
            }
         ]
      }, {
         title: 'Зубная гигиена',
         svg: 'home-page:dental-hygiene',
         services: [
            {
               title: 'Ультразвуковая чистка зубов',
               route: ''
            }, {
               title: 'Чистка Air Flow',
               route: ''
            }, {
               title: 'Фтоорирование зубов',
               route: ''
            }, {
               title: 'Отбеливание зубов',
               route: ''
            }
         ]
      }
   ];

   constructor() {
   }

   ngOnInit() {
   }

}
