import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyIndicatorWidgetComponent } from './key-indicator-widget.component';

describe('KeyIndicatorWidgetComponent', () => {
  let component: KeyIndicatorWidgetComponent;
  let fixture: ComponentFixture<KeyIndicatorWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
