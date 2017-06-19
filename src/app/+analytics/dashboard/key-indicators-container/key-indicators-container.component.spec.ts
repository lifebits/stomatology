import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyIndicatorsComponent } from './key-indicators-container.component';

describe('KeyIndicatorsComponent', () => {
  let component: KeyIndicatorsComponent;
  let fixture: ComponentFixture<KeyIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
