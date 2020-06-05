import { TestBed } from '@angular/core/testing';

import { LoggingServiceService } from './logging-service.service';

describe('LoggingServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggingServiceService = TestBed.get(LoggingServiceService);
    expect(service).toBeTruthy();
  });
});
