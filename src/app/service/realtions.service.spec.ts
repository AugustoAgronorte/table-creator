import { TestBed } from '@angular/core/testing';

import { RealtionsService } from './realtions.service';

describe('RealtionsService', () => {
  let service: RealtionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


