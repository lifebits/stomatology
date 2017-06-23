import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdProgressBarModule } from '@angular/material';

import { KeyIndicatorWidgetComponent } from './key-indicator-widget.component';

describe('KeyIndicatorWidgetComponent', () => {
   let component: KeyIndicatorWidgetComponent;
   let fixture: ComponentFixture<KeyIndicatorWidgetComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ MdProgressBarModule ],
         declarations: [ KeyIndicatorWidgetComponent ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(KeyIndicatorWidgetComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
