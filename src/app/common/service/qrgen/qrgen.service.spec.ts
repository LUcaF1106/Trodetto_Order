import { TestBed } from '@angular/core/testing';

import { QrgenService } from './qrgen.service';

describe('QrgenService', () => {
  let service: QrgenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrgenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
