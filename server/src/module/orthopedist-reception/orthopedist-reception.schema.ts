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
   technicalPartAmountAccrued: Number,
   technicalPartAmountPaid: Number,
   goldAmountAccrued: Number,
   goldAmountPaid: Number,
   visitType: String,
   orderNumber: String,
   payableDate: Date,
   surnameReferringDoctor: String,
   beginningAdmission: String,
   endAdmission: String,
   note: String
});

export const OrthopedistReceptionModel = mongoose.model('OrthopedistReception', schema);
