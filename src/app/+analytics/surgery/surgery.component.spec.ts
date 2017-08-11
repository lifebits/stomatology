import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule, MdInputModule, MdIconModule } from '@angular/material';

import { ComponentsModule } from 'app/components/components.module';

import { SurgeryComponent } from './surgery.component';
import { SortingService } from 'app/services/sorting/sorting.service';

describe('SurgeryComponent', () => {
   let component: SurgeryComponent;
   let fixture: ComponentFixture<SurgeryComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ HttpModule, ReactiveFormsModule, BrowserAnimationsModule, MdCardModule, MdInputModule, MdIconModule,
            ComponentsModule ],
         declarations: [ SurgeryComponent ],
         providers: [ SortingService, DatePipe, DecimalPipe ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(SurgeryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
