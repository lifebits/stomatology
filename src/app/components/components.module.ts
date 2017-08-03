import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MdInputModule, MdIconModule } from '@angular/material';

import { DataTableComponent } from './data-table/data-table.component';

import { CellFormatPipe } from './data-table/cell-format.pipe';

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
   ]
})
export class ComponentsModule {
}
