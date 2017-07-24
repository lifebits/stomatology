import * as multer from 'multer';

import { Router } from 'express';
import { ParseLogbook, ParseLogbookOptions } from '../../../utils/parse-xlsx-to-json/parse';
import { LogbookController } from './logbook.controller';

const DIR = './uploads/';
const upload = multer({dest: DIR});

export const logbookRouter: Router = Router();

logbookRouter.use(function timeLog(req, res, next) {
   console.log('Time: ', Date.now());
   next();
});

logbookRouter.get('/', (req, res) => {
   res.send('GET журнал регистрации');
});

logbookRouter.post('/', upload.any(), (req, res) => {
   const opts: ParseLogbookOptions = {
      xlsxPath: DIR,
      xlsxName: req.files[0].filename,
      jsonPath: DIR,
      jsonName: 'test'
   };
   ParseLogbook.parse(opts)
      .then(parsedLogbook => LogbookController.saveLogbook(parsedLogbook))
      .then(result => res.json(result))
      .catch(err => res.json(err))

   // res.send('POST журнал регистрации');
   // res.status(204).end();
});

logbookRouter.get('/test', (req, res) => {
   res.send('Test request backend');
});
