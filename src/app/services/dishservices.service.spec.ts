import { TestBed } from '@angular/core/testing';

import { DishservicesService } from './dishservices.service';

describe('DishservicesService', () => {
  let service: DishservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
