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
            'Дата обращения', 'Администратор', 'ФИО напра.  адм. call-центр',
            'Фамилия', 'Имя', 'Отчество', 'Категории', 'Источник обращения',
            'Записан на первичную консультацию', 'Где лечился ранее', 'Фамилия врача',
            'Дата ПК', 'Время ПК', 'Дата ПЛ', 'Дата Второго лечения', 'Дата конс. на полную санацию',
            'Телефон', 'Почта', 'Примечание'
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
         'Хирурги': [
            'Администратор', 'Дата', 'Фамилия пациента', 'Фамилия врача', 'Сумма за визит начисленная',
            'Сумма за визит оплаченная', 'Тип Визита', 'Кол-во постав. имплантов', 'Направившая клиника',
            'ФИО направившего врача', 'Примечания'
         ],
         'Ортодонтия': [
            'Администратор', 'Дата', 'Фамилия пациента', 'Фамилия врача', 'Сумма за визит начисленная',
            'Сумма за визит оплаченная', 'Тип Визита', 'Фио направ. врача', 'Примечание'
         ]
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

   private static normalizeLogbook(object) {
      const referral = object['Обращения'];
      const therapists = object['Терапевты'];
      const orthopedists = object['Ортопеды'];
      const surgeons = object['Хирурги'];
      const orthodontics = object['Ортодонтия'];

      referral.map(item => {
         item['Дата обращения'] = stringToDate(item['Дата обращения']);
         item['Записан на первичную консультацию'] = stringToDate(item['Записан на первичную консультацию']);
         item['Пациент'] = item['Фамилия'] + ' ' + item['Имя'] + ' ' + item['Отчество'];
         if (!item['Фамилия врача']) {
            item['Фамилия врача'] = 'Только обращение';
         }
         if (!item['Источник обращения']) {
            item['Источник обращения'] = 'Не указан';
         }
         if (item['Дата ПК']) {
            const date = new Date(item['Дата ПК']);
            if (item['Время ПК']) {
               const timeArray = item['Время ПК'].split(':');
               date.setHours(timeArray[0], timeArray[1]);
            }
            item['Дата ПК'] = date;
         }
         if (!item['Дата ПК']) {
            item['Дата ПК'] = null;
         }
         if (item['Дата ПЛ']) {
            item['Дата ПЛ'] = new Date(item['Дата ПЛ']);
         }
         if (!item['Дата ПЛ']) {
            item['Дата ПЛ'] = null;
         }
         if (item['Телефон']) {
            item['Телефон'] = 'скрыт';
         }
         if (!item['Телефон']) {
            item['Телефон'] = 'не указан';
         }
         if (item['Почта']) {
            item['Почта'] = 'скрыто';
         }
         if (!item['Почта']) {
            item['Почта'] = 'не указан';
         }
         return item;
      });

      therapists.map(item => {
         item['Дата'] = new Date(item['Дата']);
         if (!item['Сумма за визит начисленная']) {
            item['Сумма за визит начисленная'] = 0;
         }
         if (!item['Сумма за визит оплаченная']) {
            item['Сумма за визит оплаченная'] = 0;
         }
         if (!item['Тип Визита']) {
            item['Тип Визита'] = 'Не указан';
         }
         return item;
      });

      orthopedists.map(item => {
         item['Дата'] = new Date(item['Дата']);
         if (!item['Ортопед сумма за визит начисленная']) {
            item['Ортопед сумма за визит начисленная'] = 0;
         }
         if (!item['Ортопед сумма за визит оплаченая']) {
            item['Ортопед сумма за визит оплаченая'] = 0;
         }
         if (!item['Тип визита']) {
            item['Тип визита'] = 'Не указан';
         }
         if (!item['Дата задолженности']) {
            item['Дата задолженности'] = new Date(item['Дата задолженности']);
         }
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
         'Обращения': referral,
         'Терапевты': therapists,
         'Ортопеды': orthopedists,
         'Хирурги': surgeons,
         'Ортодонтия': orthodontics
      };


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
