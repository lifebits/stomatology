import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { tableFields } from './table-fields';

import { DirectedPatient, TherapistReception, OrthopedistReception } from '../crm.interface';

const API_URL = environment.api;

@Component({
   selector: 'app-patient-detail',
   templateUrl: './patient-detail.component.html',
   styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

   fields = tableFields;

   contactInfo: DirectedPatient;
   patientInitials: string;

   patientRequest: DirectedPatient[];
   therapyTreatment: TherapistReception[];
   orthopedicsTreatment: OrthopedistReception[];

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
      this.route.queryParams.subscribe((queryParam: {surname: string, name: string, patronymic: string}) => {
         console.log(queryParam);
         this.getPatient(queryParam)
            .do(data => this.contactInfo = data[0])
            .do(data => this.patientInitials = PatientDetailComponent.getPatientInitials(this.contactInfo))
            .switchMap(data => {
               this.patientRequest = data;
               return this.getTherapistTreatment({surname: data[0].patientSurname, initials: this.patientInitials});
            })
            .switchMap(data => {
               this.therapyTreatment = data;
               return this.getOrthopedistTreatment({surname: this.contactInfo.patientSurname, initials: this.patientInitials})
            })
            .subscribe(result => {
               this.orthopedicsTreatment = result;
            })
      })
   }

   private getPatient(patient: {surname: string, name: string, patronymic: string}): Observable<DirectedPatient[]> {
      const params = new URLSearchParams();
      params.set('surname', patient.surname);
      params.set('name', patient.name);
      params.set('patronymic', patient.patronymic);
      const url = API_URL + '/directed_patient/patient_detail?' + params;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

   private getTherapistTreatment(patient: {surname: string, initials: string}): Observable<TherapistReception[]> {
      const params = new URLSearchParams();
      params.set('surname', patient.surname);
      params.set('initials', patient.initials);
      const url = API_URL + '/therapist_reception/patient_treatment?' + params;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

   private getOrthopedistTreatment(patient: {surname: string, initials: string}): Observable<OrthopedistReception[]> {
      const params = new URLSearchParams();
      params.set('surname', patient.surname);
      params.set('initials', patient.initials);
      const url = API_URL + '/orthopedist_reception/patient_treatment?' + params;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }

}
