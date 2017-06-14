import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';

import { TableField } from '../../components/data-table/data-table.interface';

const TABLE_FIELDS: TableField[] = [
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

@Component({
   selector: 'app-referral-inc',
   templateUrl: './referral-inc.component.html'
})
export class ReferralIncComponent implements OnInit {

   private tablesList = {
      'main': [
         'Дата обращения', 'Администратор', 'Источник обращения', 'Пациент', 'Записан на первичную консультацию', 'Фамилия врача',
         'Дата ПК', 'Дата ПЛ'
      ],
      'consultation': [
         'Дата обращения', 'Пациент', 'Записан на первичную консультацию', 'Фамилия врача', 'Дата ПК', 'Дата ПЛ'
      ],
      'primary-treatment': [
         'Дата обращения', 'Пациент', 'Записан на первичную консультацию', 'Фамилия врача', 'Дата ПК', 'Дата ПЛ'
      ],
      're-treatment': [

      ],
      'contacts': [
         'Дата обращения'
      ]
   };

   tableFields: TableField[];
   data: Object[];

   constructor(
      private route: ActivatedRoute,
      private http: Http) {
   }

   ngOnInit() {
      this.route.params.subscribe(
         params => {
            console.log(params);
            const tableName = params.listType || 'main';
            this.tableFields = this.getTableFields(tableName);
         }
      );
      this.getData().subscribe(
         result => this.data = result
      );
   }

   private getTableFields(tableName: string): TableField[] {
      console.log(this.tablesList[tableName]);
      if (this.tablesList[tableName]) {
         const tableFields = [];
         TABLE_FIELDS.forEach(item => {
            if (item.name) {
               const findField = this.tablesList[tableName].find(p => p === item.name);
               if (findField) {
                  tableFields.push(item);
               }
            }
         });
         return tableFields;
      }
   }

   private filteredData() {

   }

   private getData() {
      const url = 'assets/mocks/analytics/data.json';
      return this.http.get(url)
         .map((res: Response) => res.json())
         .map((data) => data['Обращения']);
   }

}
