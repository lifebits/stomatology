import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCardModule, MdInputModule, MdIconModule } from '@angular/material';

import { SurgeryComponent } from './surgery.component';
import { DataTableComponent } from '../components/data-table/data-table.component';

describe('SurgeryComponent', () => {
   let component: SurgeryComponent;
   let fixture: ComponentFixture<SurgeryComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ ReactiveFormsModule, MdCardModule, MdInputModule, MdIconModule ],
         declarations: [ SurgeryComponent, DataTableComponent ],
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
