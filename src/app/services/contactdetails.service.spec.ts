import { TestBed } from '@angular/core/testing';

import { ContactdetailsService } from './contactdetails.service';

describe('ContactdetailsService', () => {
  let service: ContactdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
