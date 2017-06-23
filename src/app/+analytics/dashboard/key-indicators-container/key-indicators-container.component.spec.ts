import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MdProgressBarModule } from '@angular/material';

import { KeyIndicatorsContainerComponent } from './key-indicators-container.component';
import { KeyIndicatorWidgetComponent } from './key-indicator-widget/key-indicator-widget.component';

import { DateRangeService } from '../../components/date-range-selection/date-range.service';

describe('KeyIndicatorsComponent', () => {
   let component: KeyIndicatorsContainerComponent;
   let fixture: ComponentFixture<KeyIndicatorsContainerComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ HttpModule, MdProgressBarModule ],
         declarations: [ KeyIndicatorsContainerComponent, KeyIndicatorWidgetComponent ],
         providers: [ DateRangeService ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(KeyIndicatorsContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
