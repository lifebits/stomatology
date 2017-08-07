import { DirectedPatientModel } from './directed-patient.schema';
import { DirectedPatient,
         DirectedPatientQueryParams,
         DirectedPatientKeyIndicator,
         PatientMovement,
         CounterByDay } from './directed-patient.interface';

export class DirectedPatientController {

   static getPatientListByField(query: DirectedPatientQueryParams, fieldName: string): Promise<DirectedPatient[]> {
      const dateRangeUTC = this.getDateRangeUTC(query);
      const searchOpts = {
         clinicName: query.clinicName,
         [fieldName]: {
            $gte: dateRangeUTC.startDate,
            $lte: dateRangeUTC.endDate
         }
      };
      return this.queryInDatabase(searchOpts);
   }

   static getKeyIndicators(query: DirectedPatientQueryParams): Promise<DirectedPatientKeyIndicator[]> {
      return Promise.all([
            this.getPatientListByField(query, 'requestDate'),
            this.getPatientListByField(query, 'initialConsultationDate'),
            this.getPatientListByField(query, 'initialTreatmentDate'),
            this.getPatientListByField(query, 'reTreatmentDate')
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

   static getPatientMovement(query: DirectedPatientQueryParams): Promise<PatientMovement> {
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
         .then((result: Array<CounterByDay[]>) => {
            const [ requestDate, initialConsultationDate, initialTreatmentDate, reTreatmentDate ] = result;
            return {
               requestDate: requestDate,
               initialConsultationDate: initialConsultationDate,
               initialTreatmentDate: initialTreatmentDate,
               reTreatmentDate: reTreatmentDate
            }
         });

   }

   private static aggregateInDatabase(matchOpts: Object, projectOpts: Object, groupOpts: Object): Promise<CounterByDay[]> {
      return new Promise((resolve, reject) => {
         DirectedPatientModel.aggregate()
            .match(matchOpts)
            .project(projectOpts)
            .group(groupOpts)
            .sort({ '_id': 1 })
            .exec((err, res: CounterByDay[]) => (err) ? reject(err) : resolve(res))
      })
   }

   static getPatient(query: {surname: string}): Promise<DirectedPatient[]> {
      return new Promise((resolve, reject) => {
         DirectedPatientModel
            .find(
               {
                  patientSurname: { $regex: query.surname }
               },
               (err, findItems: DirectedPatient[]) => {
                  (err) ? reject(err) : resolve(findItems.map(doc => this.addPatientFullName(doc)));
               }
            )
            .limit(20)
      });
   }

   static getPatientRequests(query: {surname: string, name: string, patronymic: string}): Promise<DirectedPatient[]> {
      return new Promise((resolve, reject) => {
         DirectedPatientModel
            .find(
               {
                  $and: [
                     { patientSurname: query.surname },
                     { patientName: query.name },
                     { patientPatronymic: query.patronymic }
                  ]
               },
               (err, findItems: DirectedPatient[]) => {
                  (err) ? reject(err) : resolve(findItems.map(doc => this.addPatientFullName(doc)));
               }
            )
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


   private static getDateRangeUTC(query: DirectedPatientQueryParams): {startDate: Date, endDate: Date} {
      const [startDate, endDate] = query.dateRange.split(',');
      return {
         startDate: new Date(startDate),
         endDate: new Date(endDate)
      };
   }

   private static queryInDatabase(searchOpts: DirectedPatientQueryParams): Promise<DirectedPatient[]> {
      return new Promise((resolve, reject) => {
         DirectedPatientModel.find(
            searchOpts,
            (err, findItems: DirectedPatient[]) => {
               (err) ? reject(err) : resolve(findItems.map(doc => this.addPatientFullName(doc)));
            }
         )
      });
   }

   private static addPatientFullName(document): DirectedPatient {
      const firstName = document.patientName || '';
      const surname = document.patientSurname || '';
      const patronymic = document.patientPatronymic || '';
      document.patientFullName = surname + ' ' + firstName + ' ' + patronymic;
      return document;
   }

}
