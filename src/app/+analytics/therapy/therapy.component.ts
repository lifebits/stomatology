import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DateRangeService } from '../components/date-range-selection/date-range.service';
import { TherapistReception, TherapistReceptionMoneyTurnover } from './therapy.interface';

const API_URL = environment.api;

@Component({
   selector: 'app-therapy',
   templateUrl: './therapy.component.html',
   styleUrls: ['./therapy.component.scss']
})
export class TherapyComponent implements OnInit {

   tableFields = [
      {
         name: 'admissionDate',
         title: 'Дата обращения',
         dataType: 'date',
         pattern: 'dd/MM/yyyy',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'administratorName',
         title: 'Администратор',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'patientSurname',
         title: 'Пациент',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'doctorSurname',
         title: 'Врач',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'amountAccrued',
         title: 'Начисленно за визит',
         dataType: 'number',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'amountPaid',
         title: 'Оплачено',
         dataType: 'number',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'visitType',
         title: 'Тип Визита',
         dataType: 'string',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'diagnosesNumber',
         title: 'Кол-во',
         dataType: 'number',
         svg: 'analytics:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }
   ];

   moneyTurnover: TherapistReceptionMoneyTurnover = {
      totalAmountAccrued: 0,
      totalAmountPaid: 0,
      totalDiagnosesNumber: 0,
      initConsultNumber: 0
   };

   data: TherapistReception[];
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
         )
   }

   private getData(): Observable<TherapistReception[]> {
      const params = new URLSearchParams();
      params.set('clinicName', 'krsk-lenina');
      params.set('dateRange', this.dateRange.getCurrentDateRangeForQuery());
      const url = API_URL + '/therapist_reception?' + params;
      return this.http.get(url)
         .map((res: Response) => res.json());
   }

   private getMoneyTurnover(): Observable<TherapistReceptionMoneyTurnover> {
      const params = new URLSearchParams();
      params.set('clinicName', 'krsk-lenina');
      params.set('dateRange', this.dateRange.getCurrentDateRangeForQuery());
      const url = API_URL + '/therapist_reception/money_turnover?' + params;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

}
