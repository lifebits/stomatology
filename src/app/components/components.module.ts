import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule, MdIconModule } from '@angular/material';

import { DataTableComponent } from './data-table/data-table.component';
import { CellFormatPipe } from './data-table/cell-format.pipe';

import { SortingService } from '../services/sorting/sorting.service';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      MdInputModule, MdIconModule
   ],
   declarations: [
      DataTableComponent,
      CellFormatPipe
   ],
   exports: [
      DataTableComponent
   ],
   providers: [
      DatePipe,
      DecimalPipe,
      SortingService
   ]
})
export class ComponentsModule {
}
