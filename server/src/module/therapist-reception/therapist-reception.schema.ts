import { Schema } from 'mongoose';
import { mongoose } from '../../mongoose';

const schema: Schema = new Schema({
   clinicName: String,
   administratorName: String,
   admissionDate: Date,
   patientFullName: String,
   patientSurname: String,
   patientInitials: String,
   doctorSurname: String,
   amountAccrued: Number,
   amountPaid: Number,
   visitType: String,
   diagnosesNumber: Number,
   payableDate: Date,
   surnameReferringDoctor: String,
   note: String
});

export const TherapistReceptionModel = mongoose.model('TherapistReception', schema);
