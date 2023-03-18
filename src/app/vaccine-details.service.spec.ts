import { TestBed } from '@angular/core/testing';

import { VaccineDetailsService } from './vaccine-details.service';

describe('VaccineDetailsService', () => {
  let service: VaccineDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
