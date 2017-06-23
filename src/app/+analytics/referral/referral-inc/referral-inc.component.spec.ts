import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdIconModule } from '@angular/material';

import { ReferralIncComponent } from './referral-inc.component';
import { DataTableComponent } from '../../components/data-table/data-table.component';

import { CellFormatPipe } from '../../components/data-table/cell-format.pipe';
import { SortingService } from 'app/services/sorting/sorting.service';

describe('ReferralIncComponent', () => {
   let component: ReferralIncComponent;
   let fixture: ComponentFixture<ReferralIncComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ RouterTestingModule, ReactiveFormsModule, HttpModule, BrowserAnimationsModule, MdInputModule, MdIconModule ],
         declarations: [ ReferralIncComponent, DataTableComponent, CellFormatPipe ],
         providers: [ SortingService, DatePipe, DecimalPipe ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(ReferralIncComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
