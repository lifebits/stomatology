import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

@Injectable()
export class ChartsService {

  constructor() {}

  draw(container: string, opts: Object) {
     Highcharts.chart('container', opts);
  }

}
