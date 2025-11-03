import { Injectable, signal } from '@angular/core';
import { ProductJson } from '../../interface/product_json';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = signal<CartItem[]>([]);
  public cartItems = this.cart.asReadonly();

  add(addEl: CartItem) {
    const prod = this.cart();

    const i = prod.findIndex(
      (item) =>
        item.id === addEl.id &&
        this.arraysHaveSameObjects(item.con, addEl.con) &&
        this.arraysHaveSameObjects(item.exclusion, addEl.exclusion),
    );

    if (i === -1) {
      prod.push(addEl);
    } else {
      prod[i].qt += addEl.qt;
    }

    this.cart.set([...prod]); // usa copia per aggiornare il signal
  }
  private arraysHaveSameObjects(
    a: { id: number; nome: string }[],
    b: { id: number; nome: string }[],
  ): boolean {
    if (a.length !== b.length) return false;

    const sortById = (arr: { id: number; nome: string }[]) =>
      [...arr].sort((x, y) => x.id - y.id);
    const sortedA = sortById(a);
    const sortedB = sortById(b);
    return sortedA.every(
      (obj, i) => obj.id === sortedB[i].id && obj.nome === sortedB[i].nome,
    );
  }

  transformToCartItem(
    product: ProductJson,
    qt: number,
    exclusion: { id: number; nome: string }[],
  ): CartItem {
    return {
      id: product.id,
      name: product.nome,
      price: product.prezzo,
      qt,
      con: product.con.filter(
        (item) =>
          !exclusion.some((ex) => ex.id === item.id || ex.nome === item.nome),
      ),
      exclusion,
    };
  }
}
export interface CartItem {
  id: number;
  name: string;
  price: number;
  qt: number;
  con: {
    id: number;
    nome: string;
  }[];
  exclusion: {
    id: number;
    nome: string;
  }[];
}
