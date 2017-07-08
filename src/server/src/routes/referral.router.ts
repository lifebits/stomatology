import * as express from 'express';
import { Router } from 'express';

export const referralRouter: Router = express.Router();

referralRouter.use(function timeLog(req, res, next) {
   console.log('Time: ', Date.now());
   next();
});

referralRouter.get('/', function(req, res) {
   res.send('Основной список');
});

referralRouter.post('/', function (req, res) {
   console.log('POST: ', req.body);
   console.log('QUERY: ', req.query);
   res.send('Hello');
});

referralRouter.get('/consultation', function(req, res) {
   res.send('Доведеные до ПК');
});

referralRouter.get('/primary_treatment', function(req, res) {
   res.send('Доведены до ПЛ');
});
