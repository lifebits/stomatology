import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ChartsService, ChartsOptions } from 'app/services/chart/charts.service';
import { DateRangeService } from 'app/+analytics/components/date-range-selection/date-range.service';

import { Observable } from 'rxjs/Observable';

const API_URL = environment.api;

export interface ChartIndicatorsList {
   requestDate?: any[],
   initialConsultationDate?: any[],
   initialTreatmentDate?: any[],
   reTreatmentDate?: any[]
}

@Component({
   selector: 'app-patient-movement',
   templateUrl: './patient-movement.component.html',
   styleUrls: ['./patient-movement.component.scss']
})
export class PatientMovementComponent implements OnInit {

   private chartOptions: ChartsOptions = {
      chart: {
         type: 'spline'
      },
      title: {
         text: 'Движение пациентов'
      },
      yAxis: {
         title: {
            text: 'Количество пациентов'
         }
      },
      xAxis: {
         type: 'datetime',
         dateTimeLabelFormats: {
            month: '%e. %b',
            year: '%b'
         },
         title: {
            text: 'Дата'
         }
      },
      series: []
   };

   constructor(
      private http: Http,
      private dateRange: DateRangeService,
      private chart: ChartsService) {
   }

   ngOnInit() {

      this.dateRange.currentDateRange$
         .switchMap(() => this.getData())
         .subscribe(result => {
            console.log(result);
            this.chartOptions.series = [
               {
                  name: 'Первичные обращения',
                  data: result.requestDate
               }, {
                  name: 'Первичные консультации',
                  data: result.initialConsultationDate
               }, {
                  name: 'Первичные лечения',
                  data: result.initialTreatmentDate
               }, {
                  name: 'Вторичные лечения',
                  data: result.reTreatmentDate
               }
            ];
            this.chart.draw('container', this.chartOptions);
         });

      /*this.dateRange.currentDateRange$.subscribe(
         dateRange => {
            this.getData()
               .map(data => this.dataGrouping(data, 'Дата обращения'))
               .map(data => this.calcDaysIndicators(data))
               .map(data => this.prepareDataForChart(data))
               .subscribe(
                  (result: ChartIndicatorsList) => {
                     this.chartOptions.series = [
                        {
                           name: 'Первичные обращения',
                           data: result.referralNumbers
                        }, {
                           name: 'Первичные консультации',
                           data: result.consultationsNumber
                        }, {
                           name: 'Первичные лечения',
                           data: result.primaryTreatmentNumber
                        }, {
                           name: 'Вторичные лечения',
                           data: result.reTreatmentNumber
                        }
                     ];
                     console.log(999, result);
                     // this.chart.draw('container', this.chartOptions);
                  }
               );
         }
      );*/
   }

   private getData(): Observable<ChartIndicatorsList> {
      const query = {
         clinicName: 'krsk-lenina',
         dateRange: this.dateRange.getCurrentDateRangeForQuery()
      };
      const url = API_URL + '/directed_patient/patient_movement?clinicName=' + query.clinicName + '&dateRange=' + query.dateRange;
      return this.http.get(url)
         .map((res: Response) => res.json())
         .map((data: ChartIndicatorsList) => this.prepareDataForChart(data));
   }

   private prepareDataForChart(data: ChartIndicatorsList) {
      const normalizeData = {};
      for (const fieldName in data) {
         if (data.hasOwnProperty(fieldName)) {
            normalizeData[fieldName] = data[fieldName].map(p => [+new Date(p['_id']), p.count]);
         }
      }
      return normalizeData;
   }

   /*private getData() {
      const url = 'assets/mocks/analytics/data.json';
      return this.http.get(url)
         .map((res: Response) => res.json())
         .map((data) => data['Обращения'])
         .map((data) => this.dateRange.dataFilteringByDate(data, 'Дата ПК'));
   }

   private dataGrouping(data: Object[], fieldGrouping: string): Object {
      const obj = {};
      data.forEach(item => {
         if (!obj[item[fieldGrouping]]) {
            obj[item[fieldGrouping]] = [];
         }
         obj[item[fieldGrouping]].push(item);
      });
      return obj;
   }

   private calcDaysIndicators(data: Object) {
      const obj = {};
      for (const field in data) {
         if (data.hasOwnProperty(field)) {
            const indicators = {
               referralNumbers: 0,
               consultationsNumber: 0,
               primaryTreatmentNumber: 0,
               reTreatmentNumber: 0
            };
            data[field].forEach(item => {
               if (item['Дата обращения']) {
                  indicators.referralNumbers++;
               }
               if (item['Дата ПК']) {
                  indicators.consultationsNumber++;
               }
               if (item['Дата ПЛ']) {
                  indicators.primaryTreatmentNumber++;
               }
               if (item['Дата Второго лечения']) {
                  indicators.reTreatmentNumber++;
               }
            });
            obj[field] = indicators;
         }
      }
      return obj;
   }

   private prepareDataForChart(data: Object) {
      const indicatorsList = ['referralNumbers', 'consultationsNumber', 'primaryTreatmentNumber', 'reTreatmentNumber'];
      const obj = {};
      for (const fieldName in data) {
         if (data.hasOwnProperty(fieldName)) {

            indicatorsList.forEach(indicatorName => {
               const pushData = [+new Date(fieldName), data[fieldName][indicatorName]];
               if (!obj[indicatorName]) {
                  obj[indicatorName] = [];
               }
               obj[indicatorName].push(pushData);
            });

         }
      }
      return obj;
   }*/

}
