import { DirectedPatientModel, DirectedPatient } from './directed-patient.model';

interface DirectedPatientQueryParams {
   clinicName: string;
   dateRange?: string;
   requestDate?: Object;
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

   static getReTreatmentPatientList(query: DirectedPatientQueryParams) {
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

   static getKeyIndicators(query: DirectedPatientQueryParams) {
      return Promise.all([
            this.getRequestedPatientList(query),
            this.getInitialConsPatientList(query),
            this.getInitialTreatmentPatientList(query),
            this.getReTreatmentPatientList(query)
         ])
         .then((result: Array<DirectedPatient>[]) => {
            const [requested, initialConsult, initialTreatment, reTreatment] = result;
            return [
               {
                  title: 'Обращений',
                  value: requested.length,
                  percentage: 100
               },
               {
                  title: 'Первичных консультаций',
                  value: initialConsult.length,
                  percentage: Math.round(initialConsult.length * 100 / requested.length)
               },
               {
                  title: 'Первичных лечений',
                  value: initialTreatment.length,
                  percentage: Math.round(initialTreatment.length * 100 / initialConsult.length)
               },
               {
                  title: 'Вторых лечений',
                  value: reTreatment.length,
                  percentage: Math.round(reTreatment.length * 100 / initialTreatment.length)
               }
            ];
         })
   }

   private static getDateRangeUTC(query: DirectedPatientQueryParams) {
      const [startDate, endDate] = query.dateRange.split(',');
      return {
         startDate: startDate,
         endDate: endDate
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
