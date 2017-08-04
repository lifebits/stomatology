import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { tableFields } from './table-fields'

const API_URL = environment.api;

@Component({
   selector: 'app-patient-detail',
   templateUrl: './patient-detail.component.html',
   styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

   fields = tableFields;

   contactInfo;
   patientInitials: string;
   patientRequest;
   therapyTreatment;
   orthopedicsTreatment;

   private static getPatientInitials(patientInfo): string {
      const name = patientInfo.patientName.split('')[0];
      const patronymic = patientInfo.patientPatronymic.split('')[0];
      return name + patronymic;
   }

   constructor(
      private route: ActivatedRoute,
      private http: Http) {
   }

   ngOnInit() {
      this.route.queryParams.subscribe(queryParam => {
         console.log(queryParam);
         this.findPatient(queryParam)
            .do(data => this.contactInfo = data[0])
            .do(data => this.patientInitials = PatientDetailComponent.getPatientInitials(this.contactInfo))
            .switchMap(data => {
               this.patientRequest = data;
               return this.getTherapistTreatment({surname: data[0].patientSurname, initials: this.patientInitials});
            })
            .switchMap(data => {
               this.therapyTreatment = data;
               return this.getOrtopedistTreatment({surname: this.contactInfo.patientSurname, initials: this.patientInitials})
            })
            .subscribe(result => {
               this.orthopedicsTreatment = result;
               console.log('GET DATA DONE!');
               console.log(999, this.therapyTreatment);
            })
      })
   }

   private findPatient(p) {
      const url = API_URL + '/directed_patient/patient_detail?surname=' + p.surname + '&name=' + p.name + '&patronymic=' + p.patronymic;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

   private getTherapistTreatment(params: {surname: string, initials: string}) {
      const url = API_URL + '/therapist_reception/patient_treatment?surname=' + params.surname + '&initials=' + params.initials;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

   private getOrtopedistTreatment(params: {surname: string, initials: string}) {
      const url = API_URL + '/orthopedist_reception/patient_treatment?surname=' + params.surname + '&initials=' + params.initials;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

}
