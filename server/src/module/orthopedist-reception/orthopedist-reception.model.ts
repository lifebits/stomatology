import { Schema } from 'mongoose';
import { mongoose } from '../../mongoose';

export interface OrthopedistReception {
   clinicName: string; // название клиники
   administratorName: string; // администратор
   admissionDate: string; // дата поступления
   patientFullName: string; // полное имя пациента
   patientSurname: string; // фамилия пациента
   patientInitials: string; // инициалы пациента
   doctorSurname: string; // фамилия врача
   amountAccrued?: number; // сумма за визит начисленная
   amountPaid?: number; // сумма за визит оплаченная
   technicalPartAmountAccrued?: number; // техническая часть сумма начисленна
   technicalPartAmountPaid?: number; // техническая часть сумма оплачена
   goldAmountAccrued?: number; // золто сумма начислена
   goldAmountPaid?: number; // золто сумма оплачена
   visitType?: string; // тип визита
   orderNumber?: string; // номер наряда
   payableDate?: string; // дата задолженности
   surnameReferringDoctor?: string; // фамилия направившего врача
   beginningAdmission?: string; // начало приема
   endAdmission?: string; // конец приема
   note?: string; // примечание
}

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
