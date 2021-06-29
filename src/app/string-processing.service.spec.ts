import { TestBed } from '@angular/core/testing';

import { StringProcessingService } from './string-processing.service';

describe('StringProcessingService', () => {
  let service: StringProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
