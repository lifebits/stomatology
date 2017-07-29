import { Schema, Document } from 'mongoose';
import { mongoose } from '../../mongoose';

export interface Referral extends Document {
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
   completeSanationConsultDate: string; // дата консультации на оплную санацию
   patientPhone: string; // телефон пациента
   patientEmail: string; // электронная почта пациента
   note?: string; // примечание
   getCustomData: () => void;
}

/*export interface ReferralModel extends Document {
   getCustomData: () => void;
}*/

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
   completeSanationConsultDate: Date,
   patientPhone: String,
   patientEmail: String,
   note: String
});

schema.methods.getCustomData = function() {
   console.log('Get Custom Data: ', this.get('clinicName'));
   // return 1;
};

/*schema.static('getCustomData', (): void => {
   console.log('Get Custom Data: ', this.get('clinicName'));
});*/

export const ReferralModel = mongoose.model<Referral>('Referral', schema);
