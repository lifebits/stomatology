import { OrthopedistReceptionModel } from './orthopedist-reception.schema';
import { OrthopedistReception,
         QueryParams, InitialConsultCount, OrthopedistReceptionMoneyTurnover } from './orthopedist-reception.interface';

export class OrthopedistReceptionController {

   static getTherapistReceptionsList(query: QueryParams): Promise<OrthopedistReception[]> {
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

   static getPatientTreatment(query: {surname: string, initials: string}): Promise<OrthopedistReception[]> {
      return new Promise((resolve, reject) => {
         OrthopedistReceptionModel.aggregate()
            .match({
               $and: [
                  { patientSurname: query.surname },
                  { patientInitials: query.initials }
               ]
            })
            .exec((err, res: OrthopedistReception[]) => (err) ? reject(err) : resolve(res));
      });
   }

   static getMoneyTurnover(query: QueryParams): Promise<OrthopedistReceptionMoneyTurnover> {
      return Promise
         .all([
            this.getTotalAmountByField(query, 'amountAccrued'),
            this.getTotalAmountByField(query, 'amountPaid'),
            this.getTotalAmountByField(query, 'technicalPartAmountAccrued'),
            this.getTotalAmountByField(query, 'technicalPartAmountPaid'),
            this.getInitialConsultations(query)
         ])
         .then((result: Array<Object>) => {
            const [amountAccrued, amountPaid, technicalPartAmountAccrued, technicalPartAmountPaid, initConsult] = result;
            return Object.assign({}, amountAccrued, amountPaid, technicalPartAmountAccrued, technicalPartAmountPaid, initConsult);
         });
   }

   static getInitialConsultations(query: QueryParams): Promise<InitialConsultCount> {
      const dateRangeUTC = this.getDateRangeUTC(query);
      return new Promise((resolve, reject) => {
         OrthopedistReceptionModel.aggregate()
            .match({
               clinicName: query.clinicName,
               admissionDate: { $gte: dateRangeUTC.startDate, $lte: dateRangeUTC.endDate },
               visitType: 'Первичная консультация'
            })
            .group({
               _id: null,
               initialConsultCount: { $sum: 1 }
            })
            .project({
               _id: 0,
               initialConsultCount: 1
            })
            .exec((err, res: Array<InitialConsultCount>) => (err) ? reject(err) : resolve(res[0]));
      });
   }

   static getTotalAmountByField(query: QueryParams, fieldName: string): Promise<Object> {
      const dateRangeUTC = this.getDateRangeUTC(query);
      const field = ucFirst(fieldName);
      return new Promise((resolve, reject) => {
         OrthopedistReceptionModel.aggregate()
            .match({
               clinicName: query.clinicName,
               admissionDate: { $gte: dateRangeUTC.startDate, $lte: dateRangeUTC.endDate }
            })
            .group({
               _id: null,
               ['total' + field]: { $sum: '$' + fieldName }
            })
            .project({
               _id: 0,
               ['total' + field]: 1
            })
            .exec((err, res: Object[]) => (err) ? reject(err) : resolve(res[0]));
      });

      function ucFirst(str: string): string {
         if (!str) { return str; }
         return str[0].toUpperCase() + str.slice(1);
      }
   }


   private static getDateRangeUTC(query: QueryParams): {startDate: Date, endDate: Date} {
      const [startDate, endDate] = query.dateRange.split(',');
      return {
         startDate: new Date(startDate),
         endDate: new Date(endDate)
      };
   }

   private static queryInDatabase(searchOpts): Promise<OrthopedistReception[]> {
      return new Promise((resolve, reject) => {
         OrthopedistReceptionModel.find(
            searchOpts,
            (err, findItems: OrthopedistReception[]) => {
               (err) ? reject(err) : resolve(findItems);
            }
         )
      });
   }

}
