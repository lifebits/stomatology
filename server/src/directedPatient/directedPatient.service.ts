import { DirectedPatientModel, DirectedPatient } from './directedPatient.model';

interface DirectedPatientQueryParams {
   requestDate: string;
   clinicName: string;
}

export interface DirectedPatientExtraOptions {
   initialConsultationDate?: { $exists: boolean, $ne: null };
   initialTreatmentDate?: { $exists: boolean, $ne: null };
   reTreatmentDate?: { $exists: boolean, $ne: null };
}

export class DirectedPatientService {

   static getPatientList(query: DirectedPatientQueryParams, opts?: DirectedPatientExtraOptions) {
      const dateRange = query.requestDate.split(',');
      const searchOpts = {
         clinicName: query.clinicName,
         requestDate: {
            $gte: dateRange[0],
            $lt: dateRange[1]
         }
      };
      if (opts) {
         Object.assign(searchOpts, opts)
      }
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
