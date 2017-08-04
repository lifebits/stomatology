import { Router } from 'express';
import { OrthopedistReceptionController } from './orthopedist-reception.controller';

export const orthopedistReceptionRouter: Router = Router();

orthopedistReceptionRouter.use(function timeLog(req, res, next) {
   console.log('Time orthopedist_reception: ', Date.now());
   console.log('QUERY: ', req.query);
   next();
});

orthopedistReceptionRouter
   .get('/', (req, res) => {
      OrthopedistReceptionController.getTherapistReceptionsList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err));
   });

orthopedistReceptionRouter
   .get('/money_turnover', (req, res) => {
      OrthopedistReceptionController.getMoneyTurnover(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err));
   });

orthopedistReceptionRouter
   .get('/patient_treatment', (req, res) => {
      OrthopedistReceptionController.getPatientTreatment(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err));
   });
