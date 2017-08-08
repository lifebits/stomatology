import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DateRangeService } from '../components/date-range-selection/date-range.service';

import { OrthopedistReception, OrthopedistMoneyTurnover } from './orthopedics.interface';
import { TableField } from 'app/components/data-table/data-table.interface';

const API_URL = environment.api;

@Component({
   selector: 'app-orthopedics',
   templateUrl: './orthopedics.component.html',
   styleUrls: ['./orthopedics.component.scss']
})
export class OrthopedicsComponent implements OnInit {

   tableFields: TableField[] = [
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

   moneyTurnover: OrthopedistMoneyTurnover = {
      totalAmountAccrued: 0,
      totalAmountPaid: 0,
      totalTechnicalPartAmountAccrued: 0,
      totalTechnicalPartAmountPaid: 0,
      initialConsultCount: 0
   };

   data: OrthopedistReception[];
   isLoading: boolean;

   constructor(
      private http: Http,
      private dateRange: DateRangeService) {
   }

   ngOnInit() {
      this.dateRange.currentDateRange$
         .do(() => this.isLoading = true)
         .switchMap(() => Observable.forkJoin(this.getData(), this.getMoneyTurnover()))
         .do(() => this.isLoading = false)
         .subscribe(
            result => [ this.data, this.moneyTurnover ] = result,
            error => console.log(error)
         );
   }

   private getData(): Observable<OrthopedistReception[]> {
      const params = new URLSearchParams();
      params.set('clinicName', 'krsk-lenina');
      params.set('dateRange', this.dateRange.getCurrentDateRangeForQuery());
      const url = API_URL + '/orthopedist_reception?' + params;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

   private getMoneyTurnover(): Observable<OrthopedistMoneyTurnover> {
      const params = new URLSearchParams();
      params.set('clinicName', 'krsk-lenina');
      params.set('dateRange', this.dateRange.getCurrentDateRangeForQuery());
      const url = API_URL + '/orthopedist_reception/money_turnover?' + params;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

}
