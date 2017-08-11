import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule, MdInputModule, MdIconModule } from '@angular/material';
import { ComponentsModule } from 'app/components/components.module';

import { OrthodonticsComponent } from './orthodontics.component';

describe('OrthodonticsComponent', () => {
   let component: OrthodonticsComponent;
   let fixture: ComponentFixture<OrthodonticsComponent>;

   beforeEach(async(() => {
      TestBed.configureTestingModule({
         imports: [ HttpModule, ReactiveFormsModule, BrowserAnimationsModule, ComponentsModule,
            MdCardModule, MdInputModule, MdIconModule ],
         declarations: [ OrthodonticsComponent ],
         providers: [  ]
      })
         .compileComponents();
   }));

   beforeEach(() => {
      fixture = TestBed.createComponent(OrthodonticsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should be created', () => {
      expect(component).toBeTruthy();
   });
});
