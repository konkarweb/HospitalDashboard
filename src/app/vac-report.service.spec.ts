import { TestBed } from '@angular/core/testing';

import { VacReportService } from './vac-report.service';

describe('VacReportService', () => {
  let service: VacReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
