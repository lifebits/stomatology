import { TherapistReceptionModel, TherapistReception } from './therapist-reception.model';
import { DirectedPatientController } from '../directed-patient/directed-patient.controller';

interface QueryParams {
   clinicName: string;
   dateRange: string;
}

interface MoneyTurnover {
   totalAmountAccrued: number;
   totalAmountPaid: number;
   totalDiagnosesNumber: number;
   initConsultNumber: number;
}

export class TherapistReceptionController {

   static getTherapistReceptionsList(query: QueryParams) {
      const dateRangeUTC = this.getDateRangeUTC(query);
      const searchOpts = {
         clinicName: query.clinicName,
         admissionDate: {
            $gte: dateRangeUTC.startDate,
            $lte: dateRangeUTC.endDate
         }
      };
      return this.queryInDatabase(searchOpts);
   }

   static getMoneyTurnover(query: QueryParams) {
      return Promise
         .all([
            this.getTotalAmountAccrued(query),
            this.getTotalAmountPaid(query),
            this.getTotalDiagnosesNumber(query),
            DirectedPatientController.getInitialConsPatientList(query)
         ])
         .then((result: Array<Object>) => {
            const [totalAmountAccrued, totalAmountPaid, totalDiagnosesNumber, initialConsult] = result;
            const initConsNumber = {
               initConsultNumber: initialConsult['length']
            };
            return Object.assign({}, totalAmountAccrued, totalAmountPaid, totalDiagnosesNumber, initConsNumber);
         });
   }

   static getTotalAmountAccrued(query: QueryParams) {
      const dateRangeUTC = this.getDateRangeUTC(query);
      return new Promise((resolve, reject) => {
         TherapistReceptionModel.aggregate()
            .match({
               clinicName: query.clinicName,
               admissionDate: { $gte: dateRangeUTC.startDate, $lte: dateRangeUTC.endDate }
            })
            .group({
               _id: null,
               totalAmountAccrued: { $sum: '$amountAccrued' }
            })
            .project({
               _id: 0,
               totalAmountAccrued: 1
            })
            .exec((err, res) => (err) ? reject(err) : resolve(res[0]));
      })
   }

   static getTotalAmountPaid(query: QueryParams) {
      const dateRangeUTC = this.getDateRangeUTC(query);
      return new Promise((resolve, reject) => {
         TherapistReceptionModel.aggregate()
            .match({
               clinicName: query.clinicName,
               admissionDate: { $gte: dateRangeUTC.startDate, $lte: dateRangeUTC.endDate }
            })
            .group({
               _id: null,
               totalAmountPaid: { $sum: '$amountPaid' }
            })
            .project({
               _id: 0,
               totalAmountPaid: 1
            })
            .exec((err, res) => (err) ? reject(err) : resolve(res[0]));
      })
   }

   static getTotalDiagnosesNumber(query: QueryParams) {
      const dateRangeUTC = this.getDateRangeUTC(query);
      return new Promise((resolve, reject) => {
         TherapistReceptionModel.aggregate()
            .match({
               clinicName: query.clinicName,
               admissionDate: { $gte: dateRangeUTC.startDate, $lte: dateRangeUTC.endDate }
            })
            .group({
               _id: null,
               totalDiagnosesNumber: { $sum: '$diagnosesNumber' }
            })
            .project({
               _id: 0,
               totalDiagnosesNumber: 1
            })
            .exec((err, res) => (err) ? reject(err) : resolve(res[0]));
      })
   }

   private static getDateRangeUTC(query: QueryParams) {
      const [startDate, endDate] = query.dateRange.split(',');
      return {
         startDate: new Date(startDate),
         endDate: new Date(endDate)
      };
   }

   private static queryInDatabase(searchOpts) {
      return new Promise((resolve, reject) => {
         TherapistReceptionModel.find(
            searchOpts,
            (err, findItems: TherapistReception[]) => {
               (err) ? reject(err) : resolve(findItems);
            }
         )
      });
   }

}
