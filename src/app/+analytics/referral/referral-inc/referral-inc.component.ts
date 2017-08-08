import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DateRangeService } from '../../components/date-range-selection/date-range.service';

import { DirectedPatient } from '../referral.interface';
import { TableField } from 'app/components/data-table/data-table.interface';

const API_URL = environment.api;
const TABLE_FIELDS: TableField[] = [
   {
      name: 'requestDate',
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
      name: 'referenceSource',
      title: 'Источник обращения',
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
      name: 'recordPrimaryConsultation',
      title: 'Запись на консультацию',
      dataType: 'date',
      pattern: 'dd/MM/yyyy HH:mm',
      svg: 'main:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'doctorSurname',
      title: 'Фамилия врача',
      dataType: 'string',
      svg: 'main:sort',
      active: false,
      ascSort: true,
      isFiltered: true
   }, {
      name: 'initialConsultationDate',
      title: 'Дата ПК',
      dataType: 'date',
      pattern: 'dd/MM/yyyy HH:mm',
      svg: 'main:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'initialTreatmentDate',
      title: 'Дата ПЛ',
      dataType: 'date',
      pattern: 'dd/MM/yyyy',
      svg: 'main:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'reTreatmentDate',
      title: 'Дата ВЛ',
      dataType: 'date',
      pattern: 'dd/MM/yyyy',
      svg: 'main:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'patientPhone',
      title: 'Телефон',
      dataType: 'string',
      svg: 'main:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'patientEmail',
      title: 'Почта',
      dataType: 'string',
      svg: 'main:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'note',
      title: 'Примечание',
      dataType: 'string',
      svg: 'main:sort',
      active: false,
      ascSort: true,
      isFiltered: true
   }
];

@Component({
   selector: 'app-referral-inc',
   templateUrl: './referral-inc.component.html'
})
export class ReferralIncComponent implements OnInit {

   private tablesList = {
      'request': [
         'requestDate', 'administratorName', 'referenceSource', 'patientFullName', 'recordPrimaryConsultation', 'doctorSurname',
         'initialConsultationDate', 'initialTreatmentDate'
      ],
      'consultation': [
         'requestDate', 'patientFullName', 'recordPrimaryConsultation', 'doctorSurname', 'initialConsultationDate', 'initialTreatmentDate'
      ],
      'primary_treatment': [
         'requestDate', 'patientFullName', 'recordPrimaryConsultation', 'doctorSurname', 'initialConsultationDate', 'initialTreatmentDate'
      ],
      're_treatment': [
         'requestDate', 'patientFullName', 'recordPrimaryConsultation', 'doctorSurname', 'initialConsultationDate', 'initialTreatmentDate',
         'reTreatmentDate'
      ],
      'contacts': [
         'requestDate', 'referenceSource', 'doctorSurname', 'patientFullName', 'patientPhone', 'patientEmail', 'note'
      ]
   };

   data: DirectedPatient[];
   tableFields: TableField[];
   isLoading: boolean;

   constructor(
      private route: ActivatedRoute,
      private http: Http,
      private dateRange: DateRangeService) {
   }

   ngOnInit() {
      let tableName: string;
      this.route.params
         .do(params => tableName = params.listType)
         .do(() => this.tableFields = this.getTableFields(tableName))
         .switchMap(params => this.dateRange.currentDateRange$)
         .do(() => this.isLoading = true)
         .switchMap(() => this.getData(tableName))
         .do(() => this.isLoading = false)
         .subscribe(data => this.data = data);
   }

   private getTableFields(tableName: string): TableField[] {
      if (this.tablesList[tableName]) {
         const tableFields = [];
         TABLE_FIELDS.forEach(item => {
            if (item.name) {
               const findField = this.tablesList[tableName].find(p => p === item.name);
               if (findField) {
                  tableFields.push(item);
               }
            }
         });
         return tableFields;
      }
   }

   private getData(tableName: string): Observable<DirectedPatient[]> {
      const params = new URLSearchParams();
      params.set('clinicName', 'krsk-lenina');
      params.set('dateRange', this.dateRange.getCurrentDateRangeForQuery());
      const url = API_URL + '/directed_patient/' + tableName + '?' + params;
      return this.http.get(url)
         .map((res: Response) => res.json());
   }

}
