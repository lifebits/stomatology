import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralIncComponent } from './referral-inc.component';

describe('ReferralIncComponent', () => {
  let component: ReferralIncComponent;
  let fixture: ComponentFixture<ReferralIncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferralIncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralIncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
