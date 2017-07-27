import { DirectedPatientModel, DirectedPatient } from './directed-patient.model';

interface DirectedPatientQueryParams {
   clinicName: string;
   dateRange?: string;
}

export class DirectedPatientController {

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
      const dateRangeUTC = this.getDateRangeUTC(query);
      const searchOpts = {
         clinicName: query.clinicName,
         reTreatmentDate: {
            $gte: dateRangeUTC.startDate,
            $lte: dateRangeUTC.endDate
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
               }, {
                  title: 'Первичных консультаций',
                  value: initialConsult.length,
                  percentage: Math.round(initialConsult.length * 100 / requested.length)
               }, {
                  title: 'Первичных лечений',
                  value: initialTreatment.length,
                  percentage: Math.round(initialTreatment.length * 100 / initialConsult.length)
               }, {
                  title: 'Вторых лечений',
                  value: reTreatment.length,
                  percentage: Math.round(reTreatment.length * 100 / initialTreatment.length)
               }
            ];
         })
   }

   static getPatientMovement(query: DirectedPatientQueryParams) {
      const dateRangeUTC = this.getDateRangeUTC(query);
      const fieldsList = ['requestDate', 'initialConsultationDate', 'initialTreatmentDate', 'reTreatmentDate'];
      const millisecondsFromUTC = -7 * 60 * 60 * 1000; // погрещность для GMT +7
      const arrayOfPromises = fieldsList.map(fieldName => {
         const matchOpts = {
            [fieldName]: { $gte: dateRangeUTC.startDate, $lte: dateRangeUTC.endDate }
         };
         const projectOpts = {
            [fieldName]: 1,
            consumeDateLocal: {
               $subtract: [ '$' + fieldName, millisecondsFromUTC ]
            }
         };
         const groupOpts = {
            '_id': {
               /*'year': { '$year': '$date' },'month': { '$month': '$date' },'day': { '$dayOfMonth': '$date' }*/
               $dateToString: { format: '%Y-%m-%d', date: '$consumeDateLocal' }
            },
            'count': { $sum: 1 }
         };
         return this.aggregateInDatabase(matchOpts, projectOpts, groupOpts);
      });

      return Promise.all(arrayOfPromises)
         .then(result => {
            const [ requestDate, initialConsultationDate, initialTreatmentDate, reTreatmentDate ] = result;
            return {
               requestDate: requestDate,
               initialConsultationDate: initialConsultationDate,
               initialTreatmentDate: initialTreatmentDate,
               reTreatmentDate: reTreatmentDate
            }
         });

   }

   private static aggregateInDatabase(matchOpts: Object, projectOpts: Object, groupOpts: Object) {
      return new Promise((resolve, reject) => {
         DirectedPatientModel.aggregate()
            .match(matchOpts)
            .project(projectOpts)
            .group(groupOpts)
            .sort({ '_id': 1 })
            .exec((err, res) => (err) ? reject(err) : resolve(res))
      })
   }

   static getPatient(query) {
      return new Promise((resolve, reject) => {
         DirectedPatientModel
            .find(
               {
                  patientSurname: {
                     $regex: query.patient
                  }
               },
               (err, findItems: DirectedPatient[]) => {
                  (err) ? reject(err) : resolve(findItems.map(doc => this.addPatientFullName(doc)));
               }
            )
            .limit(14)
      });
   }


   static test(query: DirectedPatientQueryParams) {
      const dateRangeUTC = this.getDateRangeUTC(query);
      return new Promise((resolve, reject) => {
         const millisecondsFromUTC = -7 * 60 * 60 * 1000; // погрещность для GMT +7
         DirectedPatientModel.aggregate()
            .match({
               requestDate: {
                  $gte: dateRangeUTC.startDate,
                  $lte: dateRangeUTC.endDate
               }
            })
            .project({
               patientSurname: 1,
               requestDate: 1,
               consumeDateLocal: {
                  $subtract: [ '$requestDate', millisecondsFromUTC ]
               }
            })
            /*.group({
               '_id': {
                  $dateToString: { format: '%Y-%m-%d', date: '$consumeDateLocal' }
               },
               count: {$sum: 1}
            })*/
            /*.project({
               count: 1,
               specs: '$_id' + 2
            })*/
            .sort({ 'requestDate': 1 })
            .exec((err, res) => (err) ? reject(err) : resolve(res))
      });
   }


   private static getDateRangeUTC(query: DirectedPatientQueryParams) {
      const [startDate, endDate] = query.dateRange.split(',');
      return {
         startDate: new Date(startDate),
         endDate: new Date(endDate)
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
