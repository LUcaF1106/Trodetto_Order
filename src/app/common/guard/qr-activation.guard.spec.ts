import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { qrActivationGuard } from './qr-activation.guard';

describe('qrActivationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => qrActivationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
