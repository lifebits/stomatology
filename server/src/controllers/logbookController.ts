import { mongoose } from '../mongoose';
import { DirectedPatient, DirectedPatientModel } from '../directed-patient/directed-patient.model';

export interface Logbook {
   referrals: DirectedPatient[]
}

export class LogbookController {

   static saveLogbook(logbook: Logbook) {
      return Promise.all([
         this.createDocuments(DirectedPatientModel, logbook.referrals)
      ]);
   }

   private static dropDatabase() {
      const db = mongoose.connection.db;
      return db.dropDatabase();
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
