export interface QueryParams {
   clinicName: string;
   dateRange: string;
}

export interface InitialConsultCount {
   initialConsultCount: number;
}

export interface OrthopedistReceptionMoneyTurnover {
   totalAmountAccrued: number;
   totalAmountPaid: number;
   totalTechnicalPartAmountAccrued: number;
   totalTechnicalPartAmountPaid: number;
   initialConsultCount: number;
}
