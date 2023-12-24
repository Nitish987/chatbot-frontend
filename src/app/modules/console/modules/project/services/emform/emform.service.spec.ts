import { TestBed } from '@angular/core/testing';

import { EmformService } from '../emform.service';

describe('EmformService', () => {
  let service: EmformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
