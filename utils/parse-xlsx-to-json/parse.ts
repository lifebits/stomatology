const XLSX = require('xlsx');
const FS = require('fs');

export interface ParseLogbookOptions {
   xlsxPath: string;
   xlsxName: string;
   jsonPath?: string;
   jsonName?: string;
}

export class ParseLogbook {

   static parse(opts: ParseLogbookOptions) {
      return Promise.resolve()
         .then(() => XLSX.readFile(opts.xlsxPath + opts.xlsxName))
         .then(workbook => this.parseToObject(workbook))
         .then(rawData => this.checkFieldsOfDoc(rawData))
         .then(rawData => this.normalizeLogbook(rawData))
         .then(resultData => this.saveJSONonDisk(resultData, opts.jsonPath, opts.jsonName))
         .catch(err => {
            console.log('PARSE ERROR!: ', err);
            return err;
         })
   }

   private static parseToObject(workbook) {
      const result = {};
      workbook.SheetNames.forEach(function(sheetName) {
         const roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
         if (roa.length > 0) {
            result[sheetName] = roa;
         }
      });
      return result;
   }

   private static checkFieldsOfDoc(rawData) {
      const checkedFields = {};
      const requiredFields = {
         'Обращения': [
            'Дата обращения', 'Администратор', 'ФИО напра.  адм. call-центр', 'Фамилия', 'Имя', 'Отчество', 'Категории',
            'Источник обращения', 'Записан на первичную консультацию', 'Где лечился ранее', 'Фамилия врача',
            'Дата ПК', 'Время ПК', 'Дата ПЛ', 'Дата Второго лечения', 'Дата конс. на полную санацию', 'Телефон', 'Почта', 'Примечание'
         ],
         'Терапевты': [
            'Администратор', 'Дата', 'Фамилия пациента', 'Фамилия врача', 'Сумма за визит начисленная',
            'Сумма за визит оплаченная', 'Тип Визита', 'Кол-во', 'Дата задолжности', 'Фио направ. врача', 'Примечание'
         ],
         'Ортопеды': [
            'Администратор', 'Дата', 'Фамилия пациента', 'Фамилия врача', 'Ортопед сумма за визит начисленная',
            'Ортопед сумма за визит оплаченая', 'Техническая Сумма начисленная', 'Техническая Сумма оплаченая',
            'Золото Сумма начисленная', 'Золото Сумма оплаченая', 'Тип визита', 'Номер наряда',
            'Дата задолженности', 'ФИО направившего врача', 'Начало приема', 'Конец приема', 'Примечание'
         ],
         /*'Хирурги': [
            'Администратор', 'Дата', 'Фамилия пациента', 'Фамилия врача', 'Сумма за визит начисленная',
            'Сумма за визит оплаченная', 'Тип Визита', 'Кол-во постав. имплантов', 'Направившая клиника',
            'ФИО направившего врача', 'Примечания'
         ],
         'Ортодонтия': [
            'Администратор', 'Дата', 'Фамилия пациента', 'Фамилия врача', 'Сумма за визит начисленная',
            'Сумма за визит оплаченная', 'Тип Визита', 'Фио направ. врача', 'Примечание'
         ]*/
      };

      for (const key in requiredFields) {
         if (requiredFields.hasOwnProperty(key)) {
            checkedFields[key] = [];
            requiredFields[key].forEach(requiredField => {
               const a = rawData[key].some(item => Object.keys(item).find(p => p === requiredField));
               if (!a) {
                  checkedFields[key].push(requiredField);
               }
            });
         }
      }

      for (const key in checkedFields) {
         if (checkedFields.hasOwnProperty(key)) {
            if (checkedFields[key].length > 0) {
               throw checkedFields;
            }
         }
      }

      return rawData;
   }

   private static normalizeLogbook(object): Object {
      const clinicName = 'krsk-lenina';

      const referralsList = [];
      const therapists = [];
      const orthopedists = [];

      const surgeons = object['Хирурги'];
      const orthodontics = object['Ортодонтия'];

      object['Обращения'].forEach(item => {
         const newItem = {};
         newItem['clinicName'] = clinicName;
         newItem['requestDate'] = stringToDate(item['Дата обращения']);
         newItem['administratorName'] = item['Администратор'];
         newItem['whoSent'] = item['ФИО напра.  адм. call-центр'];
         newItem['patientName'] = (item['Имя']) ? String(item['Имя']).trim() : null;
         newItem['patientSurname'] = (item['Фамилия']) ? String(item['Фамилия']).trim() : null;
         newItem['patientPatronymic'] = (item['Отчество']) ? String(item['Отчество']).trim() : null;
         newItem['patientCategory'] = item['Категории'];
         newItem['referenceSource'] = (item['Источник обращения']) ? item['Источник обращения'] : null;
         newItem['recordPrimaryConsultation'] = stringToDate(item['Записан на первичную консультацию']);
         newItem['wasTreatedEarlier'] = (item['Где лечился ранее']) ? item['Где лечился ранее'] : null;
         newItem['doctorSurname'] = (item['Фамилия врача']) ? item['Фамилия врача'] : null;
         if (item['Дата ПК']) {
            const date = new Date(item['Дата ПК']);
            if (item['Время ПК']) {
               const timeArray = item['Время ПК'].split(':');
               date.setHours(timeArray[0], timeArray[1]);
            }
            newItem['initialConsultationDate'] = date;
         }
         newItem['initialTreatmentDate'] = (item['Дата ПЛ']) ? new Date(item['Дата ПЛ']) : null;
         newItem['reTreatmentDate'] = (item['Дата Второго лечения']) ? new Date(item['Дата Второго лечения']) : null;
         newItem['completeSanationConsultDate'] = (item['Дата конс. на полную санацию'])
            ? new Date(item['Дата конс. на полную санацию']) : null;
         newItem['patientPhone'] = (item['Телефон']) ? item['Телефон'] : null;
         newItem['patientEmail'] = (item['Почта']) ? item['Почта'] : null;
         newItem['note'] = (item['Примечание']) ? item['Примечание'] : null;

         referralsList.push(newItem);
      });

      object['Терапевты'].map(item => {
         const newItem = {};
         const patientFullName = getPatientSurnameAndInitials(item['Фамилия пациента']);

         newItem['clinicName'] = clinicName;
         newItem['administratorName'] = item['Администратор'];
         newItem['admissionDate'] = new Date(item['Дата']);
         newItem['patientFullName'] = item['Фамилия пациента'];
         newItem['patientSurname'] = patientFullName.surname;
         newItem['patientInitials'] = patientFullName.initials;
         newItem['doctorSurname'] = item['Фамилия врача'];
         newItem['amountAccrued'] = (item['Сумма за визит начисленная']) ? item['Сумма за визит начисленная'] : 0;
         newItem['amountPaid'] = (item['Сумма за визит оплаченная']) ? item['Сумма за визит оплаченная'] : 0;
         newItem['visitType'] = item['Тип Визита'];
         newItem['diagnosesNumber'] = (item['Кол-во']) ? item['Кол-во'] : 0;
         newItem['payableDate'] = (item['Дата задолжности']) ? new Date(item['Дата задолжности']) : null;
         newItem['surnameReferringDoctor'] = item['Фио направ. врача'];
         newItem['note'] = item['Примечание'];

         therapists.push(newItem);
      });

      object['Ортопеды'].map(item => {
         const newItem = {};
         const patientFullName = getPatientSurnameAndInitials(item['Фамилия пациента']);

         newItem['clinicName'] = clinicName;
         newItem['administratorName'] = item['Администратор'];
         newItem['admissionDate'] = new Date(item['Дата']);
         newItem['patientFullName'] = item['Фамилия пациента'];
         newItem['patientSurname'] = patientFullName.surname;
         newItem['patientInitials'] = patientFullName.initials;
         newItem['doctorSurname'] = item['Фамилия врача'];
         newItem['amountAccrued'] = (item['Ортопед сумма за визит начисленная']) ? item['Ортопед сумма за визит начисленная'] : 0;
         newItem['amountPaid'] = (item['Ортопед сумма за визит оплаченая']) ? item['Ортопед сумма за визит оплаченая'] : 0;
         newItem['technicalPartAmountAccrued'] = (item['Техническая Сумма начисленная']) ? item['Техническая Сумма начисленная'] : 0;
         newItem['technicalPartAmountPaid'] = (item['Техническая Сумма оплаченая']) ? item['Техническая Сумма оплаченая'] : 0;
         newItem['goldAmountAccrued'] = (item['Золото Сумма начисленная']) ? item['Золото Сумма начисленная'] : 0;
         newItem['goldAmountPaid'] = (item['Золото Сумма оплаченая']) ? item['Золото Сумма оплаченая'] : 0;
         newItem['visitType'] = item['Тип Визита'];
         newItem['orderNumber'] = item['Номер наряда'];
         newItem['payableDate'] = (item['Дата задолжности']) ? new Date(item['Дата задолжности']) : null;
         newItem['surnameReferringDoctor'] = item['ФИО направившего врача'];
         newItem['beginningAdmission'] = item['Начало приема'];
         newItem['endAdmission'] = item['Конец приема'];
         newItem['note'] = item['Примечание'];

         orthopedists.push(newItem);
      });

      surgeons.map(item => {
         item['Дата'] = new Date(item['Дата']);
         if (!item['Сумма за визит начисленная']) {
            item['Сумма за визит начисленная'] = 0;
         }
         if (!item['Сумма за визит оплаченная']) {
            item['Сумма за визит оплаченная'] = 0;
         }
         if (!item['ФИО направившего врача']) {
            item['ФИО направившего врача'] = 'Не назначен';
         }
      });

      orthodontics.map(item => {
         item['Дата'] = new Date(item['Дата']);
         if (!item['Сумма за визит начисленная']) {
            item['Сумма за визит начисленная'] = 0;
         }
         if (!item['Сумма за визит оплаченная']) {
            item['Сумма за визит оплаченная'] = 0;
         }
         if (!item['Фио направ. врача']) {
            item['Фио направ. врача'] = 'Не назначен';
         }
      });

      return {
         referrals: referralsList,
         therapistReception: therapists,
         orthopedistReception: orthopedists,
         /*'Хирурги': surgeons,
         'Ортодонтия': orthodontics*/
      };

      function getPatientSurnameAndInitials(shortName: string): {surname: string, initials: string} {
         const shortNameArray = shortName.split(' ');
         const initials = shortNameArray[1];
         const initialsArray = (initials) ? initials.split('.') : null;
         return {
            surname: shortNameArray[0],
            initials: (initialsArray) ? initialsArray[0] + initialsArray[1] : null
         }
      }

      function stringToDate(string) {
         // format xx/xx/xx xx:xx
         if (string) {
            const date = string.split(' ');
            const dateArray = date[0].split('/');
            const timeArray = date[1].split(':');

            const day = dateArray[0];
            const month = dateArray[1] - 1;
            const year = 20 + dateArray[2];
            const hour = timeArray[0];
            const minutes = timeArray[1];

            return new Date(year, month, day, hour, minutes);
         }
      }
   }

   private static saveJSONonDisk(object, path, fileName): Object {
      if (path && fileName) {
         console.log('saveJSONonDisk: ', path + fileName + '.json');
         FS.writeFile(path + fileName + '.json', JSON.stringify(object, null, 2));
      }
      return object;
   }

}
