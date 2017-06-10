import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
   selector: 'app-orthopedics',
   templateUrl: './orthopedics.component.html',
   styleUrls: ['./orthopedics.component.scss']
})
export class OrthopedicsComponent implements OnInit {

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
         name: 'Ортопед сумма за визит начисленная',
         title: 'Начисленно за визит',
         dataType: 'number',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'Ортопед сумма за визит оплаченая',
         title: 'Оплачено',
         dataType: 'number',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'Тип визита',
         title: 'Тип Визита',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'Начало приема',
         title: 'Начало приема',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'Конец приема',
         title: 'Конец приема',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }
   ];
   data: [{}];

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
         .map((data) => data['Ортопеды']);
   }

}
