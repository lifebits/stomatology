import * as express from 'express';
import { Router } from 'express';

import { User } from '../user/user.schema';
import { Referral, ReferralModel } from './referral.model';

import { GenerateTestCollection } from '../../generateTestCollection';

export const referralRouter: Router = express.Router();

referralRouter.use(function timeLog(req, res, next) {
   console.log('Time: ', Date.now());
   next();
});

referralRouter.get('/', function(req, res) {
   const referral = new ReferralModel({
      clinicName: 'bobik'
   });
   referral.getCustomData();
   // console.log(ReferralModel);
   ReferralModel.find({patientName: 'Алиев'}, (err, findItem) => {
      res.send(findItem);
   });
   // res.send('Основной список');
});

referralRouter.post('/', function (req, res) {
   console.log('POST: ', req.body);
   console.log('QUERY: ', req.query);
   res.send('Hello');
});

referralRouter.get('/consultation', function(req, res) {
   const user = new User({
      userName: 'Вася',
      password: 'secret'
   });
   user.save(function(error, currentModel, affected) {
      if (error) {
         throw error;
      }
      console.log('affected: ', affected);
      User.findOne({userName: 'Вася'}, function(err, resp) {
         console.log('find: ', resp);
      });
   });
   res.send('Доведеные до ПК');
});

referralRouter.post('/consultation', function(req, res) {
   GenerateTestCollection.generate()
      .then(result => {
         res.json(result);
      })
      .catch(err => res.json(err));
});

referralRouter.get('/primary_treatment', function(req, res) {
   res.send('Доведены до ПЛ');
});
