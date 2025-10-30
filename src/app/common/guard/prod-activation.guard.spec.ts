import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { prodActivationGuard } from './prod-activation.guard';

describe('prodActivationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      prodActivationGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
