import { environment } from 'environments/environment';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Http, Response } from '@angular/http';

const API_URL = environment.api;

@Component({
   selector: 'app-crm',
   templateUrl: './crm.component.html',
   styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements OnInit {

   isLoading: boolean;
   foundPatients;
   currentPatient;

   searchForm: FormGroup = new FormGroup({
      query: new FormControl('Ка')
   });

   constructor(
      private http: Http) {
   }

   ngOnInit() {
      this.findPatient('Ка')
         .subscribe(value => this.foundPatients = value);

      this.searchForm.valueChanges
         .debounceTime(200)
         .do(() => this.isLoading = true)
         .switchMap(search => this.findPatient(search.query))
         .do(() => this.isLoading = false)
         .subscribe(value => {
            this.foundPatients = value;
         })
   }

   selectPatient(patient: Object) {
      this.currentPatient = patient;
      /*this.searchForm.patchValue({
         query: null
      });*/
   }

   reset() {
      console.log('reset search');
   }

   private findPatient(surname: string) {
      const url = API_URL + '/directed_patient/search_patient?surname=' + surname;
      return this.http.get(url)
         .map((res: Response) => res.json())
   }
}
