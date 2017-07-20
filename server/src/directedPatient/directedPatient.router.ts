import { Router } from 'express';
import { DirectedPatientService } from './directedPatient.service';

export const directedPatientRouter: Router = Router();

directedPatientRouter.use(function timeLog(req, res, next) {
   console.log('Time directed_patient: ', Date.now());
   console.log('QUERY: ', req.query);
   next();
});

// http://localhost:3000/api/directed_patient/main?requestDate=2017-01-16T17:00:00.000Z,2017-01-17T17:00:00.000Z&clinicName=krsk-lenina
directedPatientRouter
   .get('/request', (req, res) => {
      DirectedPatientService.getRequestedPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err));
   });

directedPatientRouter
   .get('/consultation', (req, res) => {
      DirectedPatientService.getInitialConsPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });

directedPatientRouter
   .get('/primary_treatment', (req, res) => {
      DirectedPatientService.getInitialTreatmentPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });

directedPatientRouter
   .get('/re_treatment', (req, res) => {
      DirectedPatientService.reTreatmentPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });

directedPatientRouter
   .get('/contacts', (req, res) => {
      DirectedPatientService.getInitialConsPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });
