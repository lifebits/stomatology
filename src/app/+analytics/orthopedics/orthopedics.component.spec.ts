import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule, MdInputModule, MdIconModule } from '@angular/material';
import { ComponentsModule } from 'app/components/components.module';

import { OrthopedicsComponent } from './orthopedics.component';
import { DateRangeService } from '../components/date-range-selection/date-range.service';

describe('OrthopedicsComponent', () => {
   let component: OrthopedicsComponent;
   let fixture: ComponentFixture<OrthopedicsComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ HttpModule, ReactiveFormsModule, BrowserAnimationsModule, ComponentsModule,
            MdCardModule, MdInputModule, MdIconModule ],
         declarations: [ OrthopedicsComponent ],
         providers: [ DateRangeService ]
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
