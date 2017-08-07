export interface DirectedPatient {
   clinicName: string; // название клиники
   requestDate: string; // дата обращение
   administratorName: string; // администратор
   whoSent?: string; // кто направил пациента
   patientName: string;  // имя пациента
   patientSurname: string; // фамилия пациента
   patientPatronymic: string; // отчество пациента
   patientFullName?: string; // полное имя пациента
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
}

export interface DirectedPatientQueryParams {
   clinicName: string;
   dateRange?: string;
}

export interface CounterByDay {
   _id: Date;
   count: number;
}

export interface PatientMovement {
   requestDate: CounterByDay[];
   initialConsultationDate: CounterByDay[];
   initialTreatmentDate: CounterByDay[];
   reTreatmentDate: CounterByDay[];
}

export interface DirectedPatientKeyIndicator {
   title: string;
   value: number;
   percentage: number;
}
