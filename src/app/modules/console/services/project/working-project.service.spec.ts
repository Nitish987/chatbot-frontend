import { TestBed } from '@angular/core/testing';

import { WorkingProjectService } from './working-project.service';

describe('WorkingProjectService', () => {
  let service: WorkingProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkingProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
