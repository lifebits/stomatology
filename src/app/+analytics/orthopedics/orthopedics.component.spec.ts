import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrthopedicsComponent } from './orthopedics.component';

describe('OrthopedicsComponent', () => {
  let component: OrthopedicsComponent;
  let fixture: ComponentFixture<OrthopedicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthopedicsComponent ]
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
