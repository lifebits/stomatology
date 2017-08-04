export const tableFields = {
   directedPatient: [
      {
         name: 'requestDate',
         title: 'Дата обращения',
         dataType: 'date',
         pattern: 'dd/MM/yyyy',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'administratorName',
         title: 'Администратор',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'recordPrimaryConsultation',
         title: 'Запись на консультацию',
         dataType: 'date',
         pattern: 'dd/MM/yyyy HH:mm',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'doctorSurname',
         title: 'Фамилия врача',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'initialConsultationDate',
         title: 'Дата ПК',
         dataType: 'date',
         pattern: 'dd/MM/yyyy HH:mm',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'initialTreatmentDate',
         title: 'Дата ПЛ',
         dataType: 'date',
         pattern: 'dd/MM/yyyy',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'reTreatmentDate',
         title: 'Дата ВЛ',
         dataType: 'date',
         pattern: 'dd/MM/yyyy',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'note',
         title: 'Примечание',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }
   ],
   therapyTreatment: [
      {
         name: 'admissionDate',
         title: 'Дата обращения',
         dataType: 'date',
         pattern: 'dd/MM/yyyy',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'administratorName',
         title: 'Администратор',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'doctorSurname',
         title: 'Врач',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'amountAccrued',
         title: 'Начисленно за визит',
         dataType: 'number',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'amountPaid',
         title: 'Оплачено',
         dataType: 'number',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'visitType',
         title: 'Тип Визита',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'diagnosesNumber',
         title: 'Кол-во',
         dataType: 'number',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }
   ],
   orthopedicsTreatment: [
      {
         name: 'admissionDate',
         title: 'Дата обращения',
         dataType: 'date',
         pattern: 'dd/MM/yyyy',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'administratorName',
         title: 'Администратор',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'doctorSurname',
         title: 'Врач',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'amountAccrued',
         title: 'Начисленно',
         dataType: 'number',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'amountPaid',
         title: 'Оплачено',
         dataType: 'number',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'visitType',
         title: 'Тип Визита',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: true
      }, {
         name: 'beginningAdmission',
         title: 'Начало приема',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }, {
         name: 'endAdmission',
         title: 'Конец приема',
         dataType: 'string',
         svg: 'main:sort',
         active: false,
         ascSort: true,
         isFiltered: false
      }
   ]
};
