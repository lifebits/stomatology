import { DirectedPatientModel } from '../directed-patient/directed-patient.schema';
import { DirectedPatient } from '../directed-patient/directed-patient.interface';
import { TherapistReceptionModel } from '../therapist-reception/therapist-reception.schema';
import { TherapistReception } from '../therapist-reception/therapist-reception.interface';
import { OrthopedistReceptionModel } from '../orthopedist-reception/orthopedist-reception.schema';
import { OrthopedistReception } from '../orthopedist-reception/orthopedist-reception.interface';

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
