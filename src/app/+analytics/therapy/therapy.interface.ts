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

export interface TherapistReceptionMoneyTurnover {
   totalAmountAccrued: number;
   totalAmountPaid: number;
   totalDiagnosesNumber: number;
   initConsultNumber: number;
}
