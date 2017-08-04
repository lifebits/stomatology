import { OrthopedistReception, OrthopedistReceptionModel } from './orthopedist-reception.model';

export interface QueryParams {
   clinicName: string;
   dateRange: string;
}

export interface InitConsultNumber {
   initConsultNumber: number;
}

export interface TherapistReceptionMoneyTurnover {
   /*totalAmountAccrued: TotalAmountAccrued;
   totalAmountPaid: TotalAmountPaid;
   totalDiagnosesNumber: TotalDiagnosesNumber;*/
   initConsultNumber: InitConsultNumber;
}

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

   static getPatientTreatment(query: {surname: string, initials: string}) {
      return new Promise((resolve, reject) => {
         OrthopedistReceptionModel.aggregate()
            .match({
               $and: [
                  { patientSurname: query.surname },
                  { patientInitials: query.initials }
               ]
            })
            .exec((err, res) => (err) ? reject(err) : resolve(res));
      });
   }

   static getMoneyTurnover(query: QueryParams): Promise<TherapistReceptionMoneyTurnover> {
      return Promise
         .all([
            /*this.getTotalAmountAccrued(query),
            this.getTotalAmountPaid(query),
            this.getTotalDiagnosesNumber(query),
            DirectedPatientController.getInitialConsPatientList(query)*/
         ])
         .then((result: Array<Object>) => {
            const [totalAmountAccrued, totalAmountPaid, totalDiagnosesNumber, initialConsult] = result;
            const initConsNumber: InitConsultNumber = {
               initConsultNumber: initialConsult['length']
            };
            return Object.assign({}, totalAmountAccrued, totalAmountPaid, totalDiagnosesNumber, initConsNumber);
         });
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
