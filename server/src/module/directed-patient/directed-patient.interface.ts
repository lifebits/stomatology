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