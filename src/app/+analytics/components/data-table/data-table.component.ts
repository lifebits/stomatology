import { Component, Input, OnInit } from '@angular/core';
import { TableField } from './data-table.interface';
import { SortingService } from 'app/services/sorting/sorting.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
   selector: 'app-data-table',
   templateUrl: './data-table.component.html',
   styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

   private dataSource = new BehaviorSubject([]);

   @Input()
   set data(value) {
      this.dataSource.next(value);
   }

   get data() {
      return this.dataSource.getValue();
   }

   @Input()
   fields: TableField[];

   tableRows;

   constructor(
      private sort: SortingService) {

   }

   ngOnInit() {
      this.dataSource
         .filter(p => !!p)
         .subscribe(value => this.setActiveSortField(0));
   }

   setActiveSortField(tableFieldIndex) {
      // const sortData = JSON.parse(JSON.stringify(this.data));
      const sortData = this.data.map(i => Object.assign({}, i));
      const tableField = this.fields[tableFieldIndex];

      if (!tableField.active) {
         this.fields.map(item => resetActiveStatus(item));
         tableField.active = true;
      } else {
         tableField.ascSort = !tableField.ascSort;
      }

      tableField.svg = getSVG(tableField.active, tableField.ascSort);

      this.fields.splice(tableFieldIndex, 1, tableField);

      (tableField.ascSort) ? sortData.sort(this.sort.asc(tableField.name)) : sortData.sort(this.sort.desc(tableField.name));

      this.tableRows = this.normalizeDate(sortData);


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

   private normalizeDate(data) {
      const dateFields = this.fields.filter(p => p.dataType === 'date');
      return data.map(item => {
         dateFields.forEach(dateField => {
            if (item[dateField.name]) {
               item[dateField.name] = new Intl.DateTimeFormat().format(new Date(item[dateField.name]));
            }
         });
         return item;
      });
   }

}
