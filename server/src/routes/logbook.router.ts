import * as express from 'express';
import * as multer from 'multer';

import { Router } from 'express';
import { ParseLogbook, ParseLogbookOptions } from '../../../utils/parse-xlsx-to-json/parse';

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
   // console.log(req.files);
   const opts: ParseLogbookOptions = {
      xlsxPath: DIR,
      xlsxName: req.files[0].filename,
      jsonPath: DIR,
      jsonName: 'test'
   };
   ParseLogbook.parse(opts)
      .then(result => {
         // console.log(222, result);
         res.json(req.files);
      });

   // res.send('POST журнал регистрации');
   // res.status(204).end();
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
