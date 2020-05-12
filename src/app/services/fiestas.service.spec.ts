import { TestBed } from '@angular/core/testing';

import { FiestasService } from './fiestas.service';

describe('FiestasService', () => {
  let service: FiestasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiestasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
