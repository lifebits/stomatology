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