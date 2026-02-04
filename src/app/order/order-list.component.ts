import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { OrderListItemComponent } from '../features/orders/components/order-list/order-list-item.component';
import { Product_save } from '../common/interface/product_save';
import { ProductService } from '../common/service/product/product.service';
import { ProductJson } from '../common/interface/product_json';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTransferService } from '../common/service/dataTransfer/data-transfer.service';
import { ModalProdComponent } from '../features/modal-prod/modal-prod.component';
import { CartService } from '../common/service/shop/cart.service';

@Component({
  selector: 'app-order-list',
  imports: [
    OrderListItemComponent,
    FormsModule,
    ModalProdComponent,
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  private productservice = inject(ProductService);
  private isBrowser = true;
  private router = inject(Router);
  private dataTransfer: DataTransferService = inject(DataTransferService);
  productList = signal<ProductJson[]>([]);
  private shopService = inject(CartService);

  filterText = signal('');

  @ViewChild(ModalProdComponent, { static: false })
  bottomModal!: ModalProdComponent;

  productFiltered = computed(() => {
    const filtro = this.filterText().toLowerCase();
    return this.productList().filter((p) =>
      p.nome.toLowerCase().includes(filtro),
    );
  });
  cartCount: Signal<number> = computed(() => {
    let total = 0;
    for (const cartItem of this.shopService.cartItems()) {
      total += cartItem.qt;
    }
    console.log(total);
    return total;
  });

  constructor() {
    this.caricaProdotti();
  }

  apriModal() {
    if (this.isBrowser && this.bottomModal) {
      this.bottomModal.open();
    }
  }

  async caricaProdotti() {
    const data = await firstValueFrom(this.productservice.getProdotti());

    this.productList.set(data);
  }

  clickProduct($event: Product_save) {
    const prodotto = this.productList().find((p) => p.id === $event.id);
    if (prodotto) {
      this.dataTransfer.setProduct(prodotto);
      if (prodotto.con.length != 0) {
        this.router.navigate(['prodotto']);
      } else {
        this.apriModal();
      }
    }
  }
  openCart() {
    this.router.navigate(['carrello']);
  }
}
