import { TestBed } from '@angular/core/testing';

import { LeaderserviceService } from './leaderservice.service';

describe('LeaderserviceService', () => {
  let service: LeaderserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
