import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule, MdInputModule, MdIconModule } from '@angular/material';

import { OrthopedicsComponent } from './orthopedics.component';
import { DataTableComponent } from '../components/data-table/data-table.component';
import { CellFormatPipe } from '../components/data-table/cell-format.pipe';
import { SortingService } from '../../services/sorting/sorting.service';

describe('OrthopedicsComponent', () => {
   let component: OrthopedicsComponent;
   let fixture: ComponentFixture<OrthopedicsComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ HttpModule, ReactiveFormsModule, MdCardModule, MdInputModule, MdIconModule, BrowserAnimationsModule ],
         declarations: [ OrthopedicsComponent, DataTableComponent, CellFormatPipe ],
         providers: [ SortingService, DatePipe, DecimalPipe ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(OrthopedicsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
