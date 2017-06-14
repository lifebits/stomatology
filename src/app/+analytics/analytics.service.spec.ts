import { TestBed, inject } from '@angular/core/testing';

import { AnalyticsService } from './analytics.service';
import { DateRangeService } from './components/date-range-selection/date-range.service';

describe('AnalyticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyticsService, DateRangeService]
    });
  });

  it('should be created', inject([AnalyticsService], (service: AnalyticsService) => {
    expect(service).toBeTruthy();
  }));
});
