import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { SortingService } from 'app/services/sorting/sorting.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/operator/debounceTime';

import { TableField } from './data-table.interface';

@Component({
   selector: 'app-data-table',
   templateUrl: './data-table.component.html',
   styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

   private dataSource$ = new BehaviorSubject([]);

   @Input()
   set data(value) {
      if (value) {
         if (this.fields) {
            console.log('SetData!');
            value = this.sortDataByField(this.normalizeDate(value), this.fields[0]);
         } else {
            console.warn('У таблицы нет полей');
         }
      }
      this.dataSource$.next(value);
   }

   get data() {
      return this.dataSource$.getValue();
   }

   @Input()
   title: string;

   @Input()
   fields: TableField[];

   rowCounter: number;
   tableRows: Object[];

   filterForm: FormGroup = new FormGroup({
      query: new FormControl('')
   });

   constructor(
      private sort: SortingService) {
   }

   ngOnInit() {
      this.dataSource$
         .filter(p => !!p)
         .subscribe(data => {
            this.tableRows = data;
            this.rowCounter = data.length;
         });
      this.filterForm.valueChanges
         .debounceTime(200)
         .subscribe(value => {
            this.tableRows = this.dataFilter(this.data, value.query);
            this.rowCounter = this.tableRows.length;
         });
   }

   private dataFilter(data: Object[], query: string): Object[] {
      const filteredData = data.map(i => Object.assign({}, i));
      const isFilteredFields = this.fields.filter(p => p.isFiltered);

      return filteredData.filter(item => {
         return isFilteredFields.some(field => {
            if (item[field.name]) {
               const str = item[field.name].toLowerCase();
               return (str.indexOf(query.toLowerCase()) + 1);
            }
         });
      });
   }

   setSortByFieldIndex(fieldIndex: number): void {
      this.data = this.sortDataByField(this.tableRows, this.fields[fieldIndex]);
   }

   private sortDataByField(sortData: Object[], tableField: TableField): Object[] {
      console.log('SortData GO!', tableField);
      if (!tableField.active) {
         this.fields.map(item => this.resetActiveStatus(item));
         tableField.active = true;
      } else {
         tableField.ascSort = !tableField.ascSort;
      }

      tableField.svg = this.getSVG(tableField.active, tableField.ascSort);

      this.fields.splice(this.fields.indexOf(tableField), 1, tableField);

      (tableField.ascSort) ? sortData.sort(this.sort.asc(tableField.name)) : sortData.sort(this.sort.desc(tableField.name));

      return sortData;
   }

   private resetActiveStatus(item: TableField): TableField {
      item.active = false;
      item.svg = this.getSVG(item.active, item.ascSort);
      return item;
   }

   private getSVG(activeStatus: boolean, ascSortStatus: boolean): string {
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

   private normalizeDate(data): Object[] {
      const dateFields = this.fields.filter(p => p.dataType === 'date');
      const numberFields = this.fields.filter(p => p.dataType === 'number');
      return data.map(item => {
         dateFields.forEach(dateField => {
            if (item[dateField.name]) {
               item[dateField.name] = new Date(item[dateField.name]);
            }
         });
         numberFields.forEach(numberField => {
            if (item[numberField.name]) {
               item[numberField.name] = +item[numberField.name];
            }
         });
         return item;
      });
   }

}
