import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';

import { DateRangeService } from '../../components/date-range-selection/date-range.service';

import { TableField } from '../../components/data-table/data-table.interface';

const API_URL = environment.api;
const TABLE_FIELDS: TableField[] = [
   {
      name: 'requestDate',
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
      name: 'referenceSource',
      title: 'Источник обращения',
      dataType: 'string',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: true
   }, {
      name: 'patientFullName',
      title: 'Пациент',
      dataType: 'string',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: true
   }, {
      name: 'recordPrimaryConsultation',
      title: 'Запись на консультацию',
      dataType: 'date',
      pattern: 'dd/MM/yyyy HH:mm',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'doctorSurname',
      title: 'Фамилия врача',
      dataType: 'string',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: true
   }, {
      name: 'initialConsultationDate',
      title: 'Дата ПК',
      dataType: 'date',
      pattern: 'dd/MM/yyyy HH:mm',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'initialTreatmentDate',
      title: 'Дата ПЛ',
      dataType: 'date',
      pattern: 'dd/MM/yyyy',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'reTreatmentDate',
      title: 'Дата ВЛ',
      dataType: 'date',
      pattern: 'dd/MM/yyyy',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'patientPhone',
      title: 'Телефон',
      dataType: 'string',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'patientEmail',
      title: 'Почта',
      dataType: 'string',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'note',
      title: 'Примечание',
      dataType: 'string',
      svg: 'analytics:sort',
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

   data: Object[];
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
         .switchMap(params => {
            tableName = params.listType || 'main';
            this.tableFields = this.getTableFields(tableName);
            return this.dateRange.currentDateRange$
         })
         .switchMap(() => this.getData(tableName))
         .subscribe((data) => this.data = data);
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

   private getData(tableName) {
      this.isLoading = true;
      const query = {
         clinicName: 'krsk-lenina',
         dateRange: this.dateRange.getCurrentDateRangeForQuery()
      };
      const url = API_URL + '/directed_patient/' + tableName + '?clinicName=' + query.clinicName + '&dateRange=' + query.dateRange;
      return this.http.get(url)
         .map((res: Response) => {
            this.isLoading = false;
            return res.json();
         });
   }

}
