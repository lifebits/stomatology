import { Router } from 'express';
import { TherapistReceptionController } from './therapist-reception.controller';

export const therapistReceptionRouter: Router = Router();

therapistReceptionRouter.use(function timeLog(req, res, next) {
   console.log('Time therapist_reception: ', Date.now());
   console.log('QUERY: ', req.query);
   next();
});

therapistReceptionRouter
   .get('/', (req, res) => {
      TherapistReceptionController.getTherapistReceptionsList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err));
   });

therapistReceptionRouter
   .get('/money_turnover', (req, res) => {
      TherapistReceptionController.getMoneyTurnover(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err));
   });
