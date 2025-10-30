import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductJson } from '../../interface/product_json';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http: HttpClient = inject(HttpClient);

  getProdotti(): Observable<ProductJson[]> {
    return this.http.get<ProductJson[]>('/product.json');
  }
}
