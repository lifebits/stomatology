export interface PatientPreview {
   patientName: string;  // имя пациента
   patientSurname: string; // фамилия пациента
   patientPatronymic: string; // отчество пациента
   patientFullName?: string; // полное имя пациента
}

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

export interface TherapistReception {
   clinicName: string; // название клиники
   administratorName: string; // администратор
   admissionDate: string; // дата поступления
   patientFullName: string; // фамилия + инициалы пациента
   patientSurname: string; // фамилия пациента
   patientInitials: string; // инициалы пациента
   doctorSurname: string; // фамилия врача
   amountAccrued?: number; // сумма за визит начисленная
   amountPaid?: number; // сумма за визит оплаченная
   visitType: string; // тип визита
   diagnosesNumber?: number; // количество диагнозов
   payableDate?: string; // дата задолженности
   surnameReferringDoctor?: string; // фамилия направившего врача
   note?: string; // примечание
}

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


