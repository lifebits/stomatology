import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
   selector: 'app-referral',
   templateUrl: './referral.component.html'
})
export class ReferralComponent implements OnInit {

   tableFields = [
      {
         name: 'Дата обращения',
         title: 'Дата обращения',
         dataType: 'date',
         pattern: 'dd/MM/yyyy',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'Администратор',
         title: 'Администратор',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'Источник обращения',
         title: 'Источник обращения',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'Пациент',
         title: 'Пациент',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'Записан на первичную консультацию',
         title: 'Запись на консультацию',
         dataType: 'date',
         pattern: 'dd/MM/yyyy HH:mm',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'Фамилия врача',
         title: 'Фамилия врача',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'Дата ПК',
         title: 'Дата ПК',
         dataType: 'date',
         pattern: 'dd/MM/yyyy HH:mm',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'Дата ПЛ',
         title: 'Дата ПЛ',
         dataType: 'date',
         pattern: 'dd/MM/yyyy',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }

   ];

   data: Object[];

   constructor(
      private http: Http) {

   }

   ngOnInit() {
      this.getData().subscribe(
         result => this.data = result
      );
   }

   private getData() {
      const url = 'assets/mocks/analytics/data.json';
      return this.http.get(url)
         .map((res: Response) => res.json())
         .map((data) => data['Обращения']);
   }

}
