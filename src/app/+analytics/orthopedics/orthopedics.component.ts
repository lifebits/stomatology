import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { DateRangeService } from '../components/date-range-selection/date-range.service';

const API_URL = environment.api;

@Component({
   selector: 'app-orthopedics',
   templateUrl: './orthopedics.component.html',
   styleUrls: ['./orthopedics.component.scss']
})
export class OrthopedicsComponent implements OnInit {

   tableFields = [
      {
         name: 'admissionDate',
         title: 'Дата обращения',
         dataType: 'date',
         pattern: 'dd/MM/yyyy',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'administratorName',
         title: 'Администратор',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'patientFullName',
         title: 'Пациент',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'doctorSurname',
         title: 'Врач',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'amountAccrued',
         title: 'Начисленно',
         dataType: 'number',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'amountPaid',
         title: 'Оплачено',
         dataType: 'number',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'visitType',
         title: 'Тип Визита',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'beginningAdmission',
         title: 'Начало приема',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'endAdmission',
         title: 'Конец приема',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }
   ];
   data: [{}];

   constructor(
      private http: Http,
      private dateRange: DateRangeService) {
   }

   ngOnInit() {
      this.getData().subscribe(
         result => this.data = result
      );
   }

   private getData() {
      const params = {
         clinicName: 'krsk-lenina',
         dateRange: this.dateRange.getCurrentDateRangeForQuery()
      };
      const url = API_URL + '/orthopedist_reception?clinicName=' + params.clinicName + '&dateRange=' + params.dateRange;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

}
