import * as express from 'express';
import { Router } from 'express';

import * as multer from 'multer';

const DIR = './uploads/';
const upload = multer({dest: DIR});

export const logbookRouter: Router = express.Router();

logbookRouter.use(function timeLog(req, res, next) {
   console.log('Time: ', Date.now());
   next();
});

logbookRouter.get('/', (req, res) => {
   res.send('GET журнал регистрации');
});

logbookRouter.post('/', upload.any(), (req, res) => {
   console.log(req.files);
   res.end('POST журнал регистрации');
});

/*logbookRouter.post('/', (req, res) => {
   upload(req, res, function(err) {
      if (err) {
         console.log(err);
         return res.status(422).send('an Error occurred');
      }
      console.log(req.files);
      res.end('Upload Completed');
   });
   // res.send('POST журнал регистрации');
});*/
