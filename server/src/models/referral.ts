import { Schema } from 'mongoose';
import { mongoose } from '../mongoose';

export interface ReferralConfig {
   clinicName: string; // название клиники
   requestDate: string; // дата обращение
   administratorName: string; // администратор
   whoSent?: string; // кто направил пациента
   patientName: string;  // имя пациента
   patientSurname: string; // фамилия пациента
   patientPatronymic: string; // отчество пациента
   patientCategory: string; // категория пациента
   referenceSource: string; // источник обращения
   recordPrimaryConsultation: string; // записан на первичную консультацию
   wasTreatedEarlier: string; // где лечился ранее
   doctorSurname: string; // фамилия врача
   initialConsultationDate?: string; // дата ПК
   // initialConsultationTime?: string; // время ПК
   initialTreatmentDate?: string; // дата ПЛ
   reTreatmentDate?: string; // дата второго лечения
   completeSanationConsultationDate: string; // дата консультации на оплную санацию
   patientPhone: string; // телефон пациента
   patientEmail: string; // электронная почта пациента
   note: string; // примечание
}

const schema: Schema = new Schema({
   clinicName: String,
   requestDate: Date,
   administratorName: String,
   whoSent: String,
   patientName: String,
   patientSurname: String,
   patientPatronymic: String,
   patientCategory: String,
   referenceSource: String,
   recordPrimaryConsultation: Date,
   wasTreatedEarlier: String,
   doctorSurname: String,
   initialConsultationDate: Date,
   initialTreatmentDate: Date,
   reTreatmentDate: Date,
   completeSanationConsultationDate: Date,
   patientPhone: String,
   patientEmail: String,
   note: String
});

export const Referral = mongoose.model('Referral', schema);
