import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MdIconModule, MdInputModule } from '@angular/material';

import { DataTableComponent } from './data-table.component';
import { CellFormatPipe } from './cell-format.pipe';
import { SortingService } from 'app/services/sorting/sorting.service';

describe('DataTableComponent', () => {
   let component: DataTableComponent;
   let fixture: ComponentFixture<DataTableComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ ReactiveFormsModule, MdIconModule, MdInputModule, BrowserAnimationsModule ],
         declarations: [ DataTableComponent, CellFormatPipe ],
         providers: [ SortingService, DatePipe, DecimalPipe ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(DataTableComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
