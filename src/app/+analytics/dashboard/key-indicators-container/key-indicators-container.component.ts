import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { DateRangeService } from '../../components/date-range-selection/date-range.service';

const API_URL = environment.api;

export interface KeyIndicator {
   name: string;
   title: string;
   value: number;
   percentage: number;
}

@Component({
   selector: 'app-key-indicators-container',
   templateUrl: './key-indicators-container.component.html'
})
export class KeyIndicatorsContainerComponent implements OnInit {

   keyIndicatorsList: KeyIndicator[];

   constructor(
      private http: Http,
      private dateRange: DateRangeService) {
   }

   ngOnInit() {
      this.dateRange.currentDateRange$
         .subscribe(() => {
            this.getData().subscribe(data => this.keyIndicatorsList = data);
         });
   }

   private getData() {
      const query = {
         clinicName: 'krsk-lenina',
         dateRange: this.dateRange.getCurrentDateRangeForQuery()
      };
      const url = API_URL + '/directed_patient/key_indicators?clinicName=' + query.clinicName + '&dateRange=' + query.dateRange;
      return this.http.get(url)
         .map((res: Response) => res.json());
   }

   /*private getData2() {
      const url = 'assets/mocks/analytics/data.json';
      return this.http.get(url)
         .map((res: Response) => res.json())
         .map((data) => data['Обращения'])
         .map((data) => this.dateRange.dataFilteringByDate(data, 'Дата ПК'));
   }

   private getKeyIndicators(data: Object[], keyIndicators: KeyIndicator[]): KeyIndicator[] {
      let keyIndicatorsList = keyIndicators.map(a => Object.assign({}, a));
      data.forEach(item => {
         keyIndicatorsList.forEach((indicator, i) => {
            if (item[indicator.name]) {
               keyIndicatorsList[i].value++;
            }
         });
      });
      keyIndicatorsList = this.calcPercentageOfCompletion(keyIndicatorsList);
      return keyIndicatorsList;
   }

   private calcPercentageOfCompletion(keyIndicators: KeyIndicator[]): KeyIndicator[] {
      const keyIndicatorsList = keyIndicators.map(a => Object.assign({}, a));
      keyIndicatorsList.map(indicator => {
         if (indicator.name === 'Дата обращения') {
            indicator.percentage = 100;
         }
         if (indicator.name === 'Дата ПК') {
            const circulationDate = keyIndicatorsList[0];
            indicator.percentage = Math.round(indicator.value * 100 / circulationDate.value);
         }
         if (indicator.name === 'Дата ПЛ') {
            const initConsultations = keyIndicatorsList[1];
            indicator.percentage = Math.round(indicator.value * 100 / initConsultations.value);
         }
         if (indicator.name === 'Дата Второго лечения') {
            const firstTreatment = keyIndicatorsList[2];
            indicator.percentage = Math.round(indicator.value * 100 / firstTreatment.value);
         }
         return indicator;
      });
      return keyIndicatorsList;
   }*/
}
