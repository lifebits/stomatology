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

export interface OrthopedistMoneyTurnover {
   totalAmountAccrued: number;
   totalAmountPaid: number;
   totalTechnicalPartAmountAccrued: number;
   totalTechnicalPartAmountPaid: number;
   initialConsultCount: number;
}
