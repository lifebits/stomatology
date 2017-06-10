import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
   selector: 'app-surgery',
   templateUrl: './surgery.component.html',
   styleUrls: ['./surgery.component.scss']
})
export class SurgeryComponent implements OnInit {

   tableFields = [
      {
         name: 'Дата',
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
         name: 'Фамилия пациента',
         title: 'Пациент',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'Фамилия врача',
         title: 'Врач',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'Сумма за визит начисленная',
         title: 'Начисленно за визит',
         dataType: 'number',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'Сумма за визит оплаченная',
         title: 'Оплачено',
         dataType: 'number',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'Тип Визита',
         title: 'Тип визита',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
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
         .map((data) => data['Хирурги']);
   }

}
