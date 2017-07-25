import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Application } from 'express';

import { logbookRouter } from './logbook/logbook.router';
import { directedPatientRouter } from './directed-patient/directed-patient.router';
import { therapistReceptionRouter } from './therapist-reception/therapist-reception.router';
import { referralRouter } from './routes/referral.router';

export class Server {

   app: Application = express();

   constructor() {
      this.setConfig();
      this.routesApiInit();
   }

   private setConfig(): void {
      // create a cors middleware
      this.app.use(function(req, res, next) {
         res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
         res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
         res.header('Access-Control-Allow-Credentials', 'true');
         next();
      });
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({extended: true}));
   }

   private routesApiInit(): void {
      this.app.use('/api/logbook', logbookRouter);
      /*this.app.use('/api/directed_patient', directedPatientRouter);
      this.app.use('/api/therapist_reception', therapistReceptionRouter);
      this.app.use('/api/referral', referralRouter);*/
   }
}
