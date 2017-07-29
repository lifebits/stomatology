import { Router } from 'express';
import { DirectedPatientController } from './directed-patient.controller';

export const directedPatientRouter: Router = Router();

directedPatientRouter.use(function timeLog(req, res, next) {
   console.log('Time directed_patient: ', Date.now());
   console.log('QUERY: ', req.query);
   next();
});

// api/directed_patient/main?clinicName=krsk-lenina&requestDate=2017-01-16T17:00:00.000Z,2017-01-17T17:00:00.000Z
directedPatientRouter
   .get('/request', (req, res) => {
      DirectedPatientController.getRequestedPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err));
   });

directedPatientRouter
   .get('/consultation', (req, res) => {
      DirectedPatientController.getInitialConsPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });

directedPatientRouter
   .get('/primary_treatment', (req, res) => {
      DirectedPatientController.getInitialTreatmentPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });

directedPatientRouter
   .get('/re_treatment', (req, res) => {
      DirectedPatientController.getReTreatmentPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });

directedPatientRouter
   .get('/contacts', (req, res) => {
      DirectedPatientController.getInitialConsPatientList(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });

directedPatientRouter
   .get('/key_indicators', (req, res) => {
      DirectedPatientController.getKeyIndicators(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });

directedPatientRouter
   .get('/patient_movement', (req, res) => {
      DirectedPatientController.getPatientMovement(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });

directedPatientRouter
   .get('/search_patient', (req, res) => {
      DirectedPatientController.getPatient(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err));

   });

directedPatientRouter
   .get('/test', (req, res) => {
      DirectedPatientController.test(req.query)
         .then(result => res.send(result))
         .catch(err => res.send(err))
   });
