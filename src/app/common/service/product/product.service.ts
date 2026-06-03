import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductJson } from '../../interface/product_json';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  getProdotti(): Observable<ProductJson[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return of([]); // lato server restituisce array vuoto
    }
    return this.http.get<ProductJson[]>('/product.json');
  }
}
