import { TherapistReceptionModel } from './therapist-reception.schema';
import { DirectedPatientController } from '../directed-patient/directed-patient.controller';
import { TherapistReception, QueryParams, TherapistReceptionMoneyTurnover,
   InitConsultNumber, TotalAmountAccrued, TotalAmountPaid, TotalDiagnosesNumber } from './therapist-reception.interface';

export class TherapistReceptionController {

   static getTherapistReceptionsList(query: QueryParams): Promise<TherapistReception[]> {
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

   static getPatientTreatment(query: {surname: string, initials: string}): Promise<TherapistReception[]> {
      return new Promise((resolve, reject) => {
         TherapistReceptionModel.aggregate()
            .match({
               $and: [
                  { patientSurname: query.surname },
                  { patientInitials: query.initials }
               ]
            })
            .exec((err, res: TherapistReception[]) => (err) ? reject(err) : resolve(res));
      });
   }

   static getMoneyTurnover(query: QueryParams): Promise<TherapistReceptionMoneyTurnover> {
      return Promise
         .all([
            this.getTotalAmountAccrued(query),
            this.getTotalAmountPaid(query),
            this.getTotalDiagnosesNumber(query),
            // DirectedPatientController.getInitialConsPatientList(query)
            DirectedPatientController.getPatientListByField(query, 'initialConsultationDate')
         ])
         .then((result: Array<Object>) => {
            const [totalAmountAccrued, totalAmountPaid, totalDiagnosesNumber, initialConsult] = result;
            const initConsNumber: InitConsultNumber = {
               initConsultNumber: initialConsult['length']
            };
            return Object.assign({}, totalAmountAccrued, totalAmountPaid, totalDiagnosesNumber, initConsNumber);
         });
   }

   static getTotalAmountAccrued(query: QueryParams): Promise<TotalAmountAccrued> {
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
            .exec((err, res: TotalAmountAccrued[]) => (err) ? reject(err) : resolve(res[0]));
      })
   }

   static getTotalAmountPaid(query: QueryParams): Promise<TotalAmountPaid> {
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
            .exec((err, res: TotalAmountPaid[]) => (err) ? reject(err) : resolve(res[0]));
      })
   }

   static getTotalDiagnosesNumber(query: QueryParams): Promise<TotalDiagnosesNumber> {
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
            .exec((err, res: TotalDiagnosesNumber[]) => (err) ? reject(err) : resolve(res[0]));
      })
   }

   private static getDateRangeUTC(query: QueryParams): {startDate: Date, endDate: Date} {
      const [startDate, endDate] = query.dateRange.split(',');
      return {
         startDate: new Date(startDate),
         endDate: new Date(endDate)
      };
   }

   private static queryInDatabase(searchOpts): Promise<TherapistReception[]> {
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
