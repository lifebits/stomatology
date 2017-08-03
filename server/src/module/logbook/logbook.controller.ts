import { DirectedPatient, DirectedPatientModel } from '../directed-patient/directed-patient.model';
import { TherapistReception, TherapistReceptionModel } from '../therapist-reception/therapist-reception.model';
import { OrthopedistReception, OrthopedistReceptionModel } from '../orthopedist-reception/orthopedist-reception.model';

export interface Logbook {
   referrals: DirectedPatient[],
   therapistReception: TherapistReception[],
   orthopedistReception: OrthopedistReception[]
}

export class LogbookController {

   static saveLogbook(logbook: Logbook) {
      return Promise.all([
         this.createDocuments(DirectedPatientModel, logbook.referrals),
         this.createDocuments(TherapistReceptionModel, logbook.therapistReception),
         this.createDocuments(OrthopedistReceptionModel, logbook.orthopedistReception)
      ]);
   }

   private static buildIndex(model) {
      return model.ensureIndexes();
   }

   private static createDocuments(model, docsList) {
      console.log('created documents');
      this.buildIndex(model)
         .then(() => {
            console.log('Build Index Completed');
            const arrayOfPromises = docsList.map(doc => {
               const document = new model(doc);
               return document.save();
            });
            return Promise.all(arrayOfPromises);
         });
   }

}
