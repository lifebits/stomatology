import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';

import { DateRangeService } from '../../components/date-range-selection/date-range.service';

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
   }, {
      name: 'Телефон',
      title: 'Телефон',
      dataType: 'string',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'Почта',
      title: 'Почта',
      dataType: 'string',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'Примечание',
      title: 'Примечание',
      dataType: 'string',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: true
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
         'Дата обращения', 'Пациент', 'Записан на первичную консультацию', 'Фамилия врача', 'Дата ПК', 'Дата ПЛ'
      ],
      'contacts': [
         'Дата обращения', 'Источник обращения', 'Фамилия врача', 'Пациент', 'Телефон', 'Почта', 'Примечание'
      ]
   };

   // private initData: Object[];
   data: Object[];
   tableFields: TableField[];

   constructor(
      private route: ActivatedRoute,
      private http: Http,
      private dateRange: DateRangeService) {
   }

   ngOnInit() {
      let tableName: string;
      this.route.params
         .switchMap(params => {
            tableName = params.listType || 'main';
            this.tableFields = this.getTableFields(tableName);
            return this.dateRange.currentDateRange$
         })
         .switchMap(() => this.getData(tableName))
         .subscribe((data) => this.data = data);
   }

   private getTableFields(tableName: string): TableField[] {
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

   private getFilteredData(data: Object[], fieldName: string) {
      switch (fieldName) {
         case 'consultation':
            return data.filter(p => p['Дата ПК']);
         case 'primary-treatment':
            return data.filter(p => p['Дата ПЛ']);
         case 're-treatment':
            return data.filter(p => p['Дата Второго лечения']);
         default:
            return data;
      }
   }

   private getData(tableName: string) {
      const url = 'assets/mocks/analytics/data.json';
      return this.http.get(url)
         .map((res: Response) => res.json())
         .map((data) => data['Обращения'])
         .map((data) => this.getFilteredData(data, tableName))
         .map((data) => this.dateRange.dataFilteringByDate(data, 'Дата ПК'));
   }

}
