import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { TableField } from '../components/data-table/data-table.interface';

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
         active: true
      }, {
         name: 'contacts',
         title: 'Контакты текущих пациентов',
         active: false
      }, {
         name: 'pk',
         title: 'Доведены до ПК',
         active: false
      }, {
         name: 'pl',
         title: 'Доведены до ПЛ',
         active: false
      }, {
         name: 'vl',
         title: 'Доведены до ВЛ',
         active: false
      }
   ];

   tableFields: TableField[] = [
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
