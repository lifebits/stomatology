import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

export interface ChartsOptions {
   chart?: {
      type: string;
   };
   title: {
      text: string;
   };
   yAxis: {
      title: {
         text: string;
      }
   };
   xAxis: {
      type?: string;
      dateTimeLabelFormats?: {
         month: string;
         year: string;
      },
      title: {
         text: string;
      }
   };
   series: any[];
}

@Injectable()
export class ChartsService {

  constructor() {}

  draw(container: string, opts: ChartsOptions) {
     Highcharts.chart('container', opts);
  }

}
