import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitePagesComponent } from './site-pages.component';

describe('SitePagesComponent', () => {
  let component: SitePagesComponent;
  let fixture: ComponentFixture<SitePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
