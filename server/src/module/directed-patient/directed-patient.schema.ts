import { Schema } from 'mongoose';
import { mongoose } from '../../mongoose';

const schema: Schema = new Schema({
   clinicName: String,
   requestDate: Date,
   administratorName: String,
   whoSent: String,
   patientName: String,
   patientSurname: String,
   patientPatronymic: String,
   patientFullName: String,
   patientCategory: String,
   referenceSource: String,
   recordPrimaryConsultation: Date,
   wasTreatedEarlier: String,
   doctorSurname: String,
   initialConsultationDate: Date,
   initialTreatmentDate: Date,
   reTreatmentDate: Date,
   completeSanationConsultDate: Date,
   patientPhone: String,
   patientEmail: String,
   note: String
});

schema.index(
   { requestDate: 1, patientSurname: 1, patientName: 1, recordPrimaryConsultation: 1, initialConsultationDate: 1 },
   { unique: true }
);

export const DirectedPatientModel = mongoose.model('DirectedPatient', schema);
