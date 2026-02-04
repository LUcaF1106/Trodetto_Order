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
  pdfProduct(): PDFProd[] {
    const prod = this.cartService.cartItems();
    let output: PDFProd[] = [];
    for(let item of prod) {
      let note=''
      if (!(item.con.length === 0 && item.exclusion.length === 0)) {
        if (item.exclusion.length === 0) {
         note= 'Completo'
        } else if (item.con.length === 0) {
         note=' Senza aggiunte'
        } else {
          note = 'Con '
          let index = 0;
          for (let i of item.con) {
            note+= i.nome
            if (!(item.con.length - 1 === index)) {
              note+=', '
            }
            index++
          }
        }
      }
      output.push({ nome: item.name,
        note: note,
        qt: item.qt,
        price:item.price });
    }

    return output
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
export interface PDFProd{
  nome: string;
  note: string;
  qt:number;
  price:number;
}
export class JsonQr {
  id?: number;
  qt?: number;
  e?: number[];
}
