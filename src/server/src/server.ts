import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Application } from 'express';

import { referralRouter } from './routes/referral.router';

export class Server {

   app: Application = express();

   constructor() {
      this.setConfig();
      this.routesApiInit();
   }

   private setConfig(): void {
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({extended: true}));
   }

   private routesApiInit(): void {
      this.app.use('/api/referral', referralRouter);
   }
}
