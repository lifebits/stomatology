import { DirectedPatientModel, DirectedPatient } from './directedPatient.model';
import {reject} from 'q';

export class DirectedPatientService {

   static getPatientList(query) {
      const dateRange = query.requestDate.split(',');
      return new Promise((resolve, reject) => {
         DirectedPatientModel.find(
            {
               clinicName: query.clinicName,
               requestDate: {
                  $gte: dateRange[0],
                  $lt: dateRange[1]
               }
            },
            (err, findItems: DirectedPatient[]) => {
               (err) ? reject(err) : resolve(findItems.map(a => {
                  a.patientFullName = a.patientSurname + ' ' + a.patientName + ' ' + a.patientPatronymic;
                  return a;
               }));
            }
         );
      });
   }

   static getPatientListBroughtToConsultation(query) {
      const dateRange = query.requestDate.split(',');
      return new Promise((resolve, reject) => {
         DirectedPatientModel.find(
            {
               clinicName: query.clinicName,
               requestDate: {
                  $gte: dateRange[0],
                  $lt: dateRange[1]
               },
               initialConsultationDate: {
                  $exists: true, $ne: null
               }
            },
            (err, findItems: DirectedPatient[]) => {
               (err) ? reject(err) : resolve(findItems.map(a => {
                  a.patientFullName = a.patientSurname + ' ' + a.patientName + ' ' + a.patientPatronymic;
                  return a;
               }));
            }
         )
      })
   }

   static getPatientListBrougthToPrimaryTreatment(query) {
      const dateRange = query.requestDate.split(',');
      return new Promise((resolve, reject) => {
         DirectedPatientModel.find(
            {
               clinicName: query.clinicName,
               requestDate: {
                  $gte: dateRange[0],
                  $lt: dateRange[1]
               },
               initialTreatmentDate: {
                  $exists: true, $ne: null
               }
            },
            (err, findItems: DirectedPatient[]) => {
               (err) ? reject(err) : resolve(findItems.map(a => {
                  a.patientFullName = a.patientSurname + ' ' + a.patientName + ' ' + a.patientPatronymic;
                  return a;
               }));
            }
         )
      })
   }

}
