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

export interface QueryParams {
   clinicName: string;
   dateRange: string;
}

export interface TherapistReceptionMoneyTurnover {
   totalAmountAccrued: TotalAmountAccrued;
   totalAmountPaid: TotalAmountPaid;
   totalDiagnosesNumber: TotalDiagnosesNumber;
   initConsultNumber: InitConsultNumber;
}

export interface TotalAmountAccrued {
   totalAmountAccrued: number;
}

export interface TotalAmountPaid {
   totalAmountPaid: number;
}

export interface TotalDiagnosesNumber {
   totalDiagnosesNumber: number;
}

export interface InitConsultNumber {
   initConsultNumber: number;
}
