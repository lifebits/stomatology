import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParseXlsComponent } from './parse-xls.component';

describe('ParseXlsComponent', () => {
  let component: ParseXlsComponent;
  let fixture: ComponentFixture<ParseXlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParseXlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParseXlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
