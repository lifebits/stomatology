import { Schema } from 'mongoose';
import { mongoose } from '../../mongoose';

export interface TherapistReception {
   clinicName: string; // название клиники
   administratorName: string; // администратор
   admissionDate: string; // дата поступления
   patientSurname: string; // фамилия пациента
   doctorSurname: string; // фамилия врача
   amountAccrued?: number; // сумма за визит начисленная
   amountPaid?: number; // сумма за визит оплаченная
   visitType: string; // тип визита
   diagnosesNumber?: number; // количество диагнозов
   payableDate?: string; // дата задолженности
   surnameReferringDoctor?: string; // фамилия направившего врача
   note?: string; // примечание
}

const schema: Schema = new Schema({
   clinicName: String,
   administratorName: String,
   admissionDate: Date,
   patientSurname: String,
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
