import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MdIconModule } from '@angular/material';

import {AnalyticsNavigatorComponent} from './analytics-navigator.component';

describe('AnalyticsNavigatorComponent', () => {
   let component: AnalyticsNavigatorComponent;
   let fixture: ComponentFixture<AnalyticsNavigatorComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ RouterTestingModule, MdIconModule ],
         declarations: [ AnalyticsNavigatorComponent ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(AnalyticsNavigatorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
