import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { cartActivationGuard } from './cart-activation.guard';

describe('cartActivationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      cartActivationGuard(...guardParameters),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
