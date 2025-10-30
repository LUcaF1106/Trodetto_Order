import { Injectable, signal } from '@angular/core';
import { ProductJson } from '../../interface/product_json';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private productData = signal<ProductJson | null>(null);
  product = this.productData.asReadonly();

  setProduct(data: ProductJson) {
    this.productData.set(data);
  }

  clearProduct() {
    this.productData.set(null);
  }

  hasProduct(): boolean {
    return this.productData() !== null;
  }
}
