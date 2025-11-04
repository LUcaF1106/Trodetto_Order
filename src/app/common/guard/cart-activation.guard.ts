import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CartService } from '../service/shop/cart.service';

export const cartActivationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const shop = inject(CartService);
  if (shop.cartItems().length == 0) {
    router.navigate(['/']);
  }

  return true;
};
