import { TestBed } from '@angular/core/testing';

import { VaccineDetailsTableService } from './vaccine-details-table.service';

describe('VaccineDetailsTableService', () => {
  let service: VaccineDetailsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineDetailsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
