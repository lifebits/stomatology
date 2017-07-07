import * as express from 'express';
import * as bodyParser from 'body-parser';

import { Application } from 'express';

import { referralRouter } from './routes/referral';

export class Server {

   app: Application;

   constructor() {
      this.app = express();
      this.setConfig();
      this.routesApiInit();
   }

   private setConfig(): void {
      this.app.use(bodyParser.urlencoded({extended: true}));
   }

   private routesApiInit(): void {
      this.app.use('/api/referral', referralRouter);
   }
}
