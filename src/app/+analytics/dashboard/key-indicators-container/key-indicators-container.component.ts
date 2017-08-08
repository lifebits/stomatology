import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DateRangeService } from '../../components/date-range-selection/date-range.service';

const API_URL = environment.api;

interface KeyIndicator {
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

   private getData(): Observable<KeyIndicator[]> {
      const params = new URLSearchParams();
      params.set('clinicName', 'krsk-lenina');
      params.set('dateRange', this.dateRange.getCurrentDateRangeForQuery());
      const url = API_URL + '/directed_patient/key_indicators?' + params;
      return this.http.get(url)
         .map((res: Response) => res.json());
   }

}
