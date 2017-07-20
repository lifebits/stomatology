import { DirectedPatientModel, DirectedPatient } from './directedPatient.model';

interface DirectedPatientQueryParams {
   clinicName: string;
   dateRange?: string;
   requestDate?: Object;
}

export interface DirectedPatientExtraOptions {
   initialConsultationDate?: { $exists: boolean, $ne: null };
   initialTreatmentDate?: { $exists: boolean, $ne: null };
   reTreatmentDate?: { $exists: boolean, $ne: null };
}

export class DirectedPatientService {

   static getRequestedPatientList(query: DirectedPatientQueryParams) {
      const dateRangeUTC = this.getDateRangeUTC(query);
      const searchOpts = {
         clinicName: query.clinicName,
         requestDate: {
            $gte: dateRangeUTC.startDate,
            $lte: dateRangeUTC.endDate
         }
      };
      return this.queryInDatabase(searchOpts);
   }

   static getInitialConsPatientList(query: DirectedPatientQueryParams) {
      const dateRangeUTC = this.getDateRangeUTC(query);
      const searchOpts = {
         clinicName: query.clinicName,
         initialConsultationDate: {
            $gte: dateRangeUTC.startDate,
            $lte: dateRangeUTC.endDate
         }
      };
      return this.queryInDatabase(searchOpts);
   }

   static getInitialTreatmentPatientList(query: DirectedPatientQueryParams) {
      const dateRangeUTC = this.getDateRangeUTC(query);
      const searchOpts = {
         clinicName: query.clinicName,
         initialTreatmentDate: {
            $gte: dateRangeUTC.startDate,
            $lte: dateRangeUTC.endDate
         }
      };
      return this.queryInDatabase(searchOpts);
   }

   static reTreatmentPatientList(query: DirectedPatientQueryParams) {
      const dateRange = this.getDateRangeUTC(query);
      const searchOpts = {
         clinicName: query.clinicName,
         reTreatmentDate: {
            $gte: dateRange.startDate,
            $lte: dateRange.endDate
         }
      };
      return this.queryInDatabase(searchOpts);
   }

   /*static getPatientList(query: DirectedPatientQueryParams, opts?: DirectedPatientExtraOptions) {
      const dateRange = query.dateRange.split(',');
      const searchOpts = {
         clinicName: query.clinicName,
         requestDate: {
            $gte: dateRange[0],
            $lt: dateRange[1]
         }
      };
      if (opts) {
         Object.assign(searchOpts, opts);
      }
      return new Promise((resolve, reject) => {
         DirectedPatientModel.find(
            searchOpts,
            (err, findItems: DirectedPatient[]) => {
               (err) ? reject(err) : resolve(findItems.map(doc => this.addPatientFullName(doc)));
            }
         )
      });
   }*/


   private static getDateRangeUTC(query: DirectedPatientQueryParams) {
      const dateRange = query.dateRange.split(',');
      return {
         startDate: dateRange[0],
         endDate: dateRange[1]
      };
   }

   private static queryInDatabase(searchOpts: DirectedPatientQueryParams) {
      return new Promise((resolve, reject) => {
         DirectedPatientModel.find(
            searchOpts,
            (err, findItems: DirectedPatient[]) => {
               (err) ? reject(err) : resolve(findItems.map(doc => this.addPatientFullName(doc)));
            }
         )
      });
   }

   private static addPatientFullName(document) {
      const firstName = document.patientName || '';
      const surname = document.patientSurname || '';
      const patronymic = document.patientPatronymic || '';
      document.patientFullName = surname + ' ' + firstName + ' ' + patronymic;
      return document;
   }

}
