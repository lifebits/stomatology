import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbookUploadComponent } from './logbook-upload.component';

describe('LogbookUploadComponent', () => {
  let component: LogbookUploadComponent;
  let fixture: ComponentFixture<LogbookUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogbookUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
