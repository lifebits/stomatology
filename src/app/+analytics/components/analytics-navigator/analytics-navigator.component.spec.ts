import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsNavigatorComponent } from './analytics-navigator.component';

describe('AnalyticsNavigatorComponent', () => {
  let component: AnalyticsNavigatorComponent;
  let fixture: ComponentFixture<AnalyticsNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
