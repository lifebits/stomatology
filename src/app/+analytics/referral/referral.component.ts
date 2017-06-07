import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ReferralService } from './referral.service';
import { SortingService } from 'app/services/sorting/sorting.service';

import 'rxjs/operator/debounceTime';

const FIELDS = [
   {
      name: 'Дата обращения',
      title: 'Дата обращения',
      svg: 'analytics:sort-ascending',
      active: true,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'Администратор',
      title: 'Администратор',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: true
   }, {
      name: 'Источник обращения',
      title: 'Источник обращения',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: true
   }, {
      name: 'Фамилия',
      title: 'Пациент',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: true
   }, {
      name: 'Записан на первичную консультацию',
      title: 'Запись на консультацию',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: false
   }, {
      name: 'Фамилия врача',
      title: 'Фамилия врача',
      svg: 'analytics:sort',
      active: false,
      ascSort: true,
      isFiltered: true
   }
];

@Component({
   selector: 'app-referral',
   templateUrl: './referral.component.html',
   styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

   private referralInitList;

   tableFields = FIELDS;
   referralList;
   referralCounter: number;

   filterForm: FormGroup = new FormGroup({
      query: new FormControl('')
   });

   constructor(
      private referral: ReferralService,
      private sort: SortingService) {

      this.filterForm.valueChanges
         .debounceTime(300)
         .subscribe(
            value => {
               console.log(value);
               this.filterTable(value.query);
            }
         );
   }

   ngOnInit() {
      this.referral.getDirectedPatients().subscribe(
         result => {
            this.referralInitList = result;
            this.referralList = result.sort(this.sort.asc('Дата обращения'));
            this.referralCounter = result.length;
         }
      );
   }

   private filterTable(query) {
      const isFilteredFields = this.tableFields.filter(p => p.isFiltered);
      this.referralList = this.referralInitList.filter(item => {
         return isFilteredFields.some(field => {
            if (item[field.name]) {
               const str = item[field.name].toLowerCase();
               return (str.indexOf(query.toLowerCase()) + 1);
            }
         });
      });
      this.referralCounter = this.referralList.length;
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

      if (tableField.ascSort) {
         this.referralList.sort(this.sort.asc(tableField.name));
      } else {
         this.referralList.sort(this.sort.desc(tableField.name));
      }


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

}
