import { Component, OnInit } from '@angular/core';
import { ReferralService } from './referral.service';

@Component({
   selector: 'app-referral',
   templateUrl: './referral.component.html',
   styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

   referralList;
   tableFields = [
      {
         name: 'Дата обращения',
         title: 'Дата обращения',
         svg: 'analytics:sort-ascending',
         active: false,
         ascSort: true
      }, {
         name: 'Администратор',
         title: 'Администратор',
         svg: 'analytics:sort',
         active: false,
         ascSort: true
      }, {
         name: 'Источник обращения',
         title: 'Источник обращения',
         svg: 'analytics:sort',
         active: false,
         ascSort: true
      }, {
         name: 'Фамилия',
         title: 'Пациент',
         svg: 'analytics:sort',
         active: false,
         ascSort: true
      }, {
         name: 'Записан на первичную консультацию',
         title: 'Запись на консультацию',
         svg: 'analytics:sort',
         active: false,
         ascSort: true
      }, {
         name: 'Фамилия врача',
         title: 'Фамилия врача',
         svg: 'analytics:sort',
         active: false,
         ascSort: true
      }
   ];

   constructor(
      private referral: ReferralService) {

   }

   ngOnInit() {
      this.referral.getDirectedPatients().subscribe(
         result => {
            this.referralList = result.sort(this.ascSort('Дата обращения'));
         }
      );
   }

   setActiveSortField(tableFieldIndex) {
      const tableField = this.tableFields[tableFieldIndex];

      if (!tableField.active) {
         this.tableFields.map(item => resetActiveStatus(item));
         tableField.active = true;
      } else {
         tableField.ascSort = !tableField.ascSort;
      }

      tableField.svg = getSVG(tableField.active, tableField.ascSort);

      this.tableFields.splice(tableFieldIndex, 1, tableField);

      (tableField.ascSort) ? this.referralList.sort(this.ascSort(tableField.name)) : this.referralList.sort(this.descSort(tableField.name));


      function resetActiveStatus(item) {
         item.active = false;
         item.svg = getSVG(item.active, item.ascSort);
         return item;
      }

      function getSVG(activeStatus, ascSortStatus): string {
         if (!activeStatus) {
            return 'analytics:sort';
         }
         if (activeStatus && ascSortStatus) {
            return 'analytics:sort-ascending';
         }
         if (activeStatus && !ascSortStatus) {
            return 'analytics:sort-descending';
         }
      }
   }

   private ascSort(fieldName: string): Function {
      console.log('run ascSort', fieldName);
      return function(a, b) {
         if (a[fieldName] > b[fieldName]) {
            return 1;
         }
         if (a[fieldName] < b[fieldName]) {
            return -1;
         }
         return 0;
      };
   }

   private descSort(fieldName: string): Function {
      console.log('run descSort', fieldName);
      return function(a, b) {
         if (a[fieldName] > b[fieldName]) {
            return -1;
         }
         if (a[fieldName] < b[fieldName]) {
            return 1;
         }
         return 0;
      };
   }
}
