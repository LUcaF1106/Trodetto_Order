import { inject, Injectable } from '@angular/core';
import { CartItem, CartService } from '../shop/cart.service';

@Injectable({
  providedIn: 'root',
})
export class QrgenService {
  private canGenerate = false;
  private cartService = inject(CartService);

  canGen() {
    return this.canGenerate;
  }

  confirmGen() {
    this.canGenerate = true;
  }

  jsonQrCode(): JsonQr[] {
    const prod = this.cartService.cartItems();
    const output: JsonQr[] = [];
    for (const cartItem of prod) {
      output.push(this.convertToJsonQr(cartItem));
    }
    return output;
  }

  convertToJsonQr(i: CartItem): JsonQr {
    const out: JsonQr = {
      id: i.id,
      qt: i.qt,
    };
    if (i.exclusion.length > 0) {
      out.e = i.exclusion.map((a) => a.id);
    }

    return out;
  }
}
export class JsonQr {
  id?: number;
  qt?: number;
  e?: number[];
}
