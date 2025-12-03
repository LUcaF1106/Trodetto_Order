import { Component, computed, inject, Signal } from '@angular/core';
import { ShopItemComponent } from '../shop-item/shop-item.component';
import { CartService } from '../common/service/shop/cart.service';
import { Router } from '@angular/router';
import { QrgenService } from '../common/service/qrgen/qrgen.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop-card',
  imports: [ShopItemComponent, ReactiveFormsModule],
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss',
})
export class ShopCardComponent {
  private router: Router = inject(Router);
  protected cartService: CartService = inject(CartService);
  protected card = computed(() => this.cartService.cartItems());

  protected totale: Signal<number> = computed(() => {
    let p = 0;
    for (const i of this.cartService.cartItems()) {
      p += i.qt * i.price;
    }
    return p;
  });

  private qrgen = inject(QrgenService);
  deleteProduct($event: number) {
    this.cartService.delete($event);
  }

  updateQt(event: { index: number; quntity: number }) {
    this.cartService.updateQtProduct(event.quntity, event.index);
  }
  confirm() {
    if (this.cartService.cartItems().length > 0) {
      this.qrgen.confirmGen();
      this.router.navigate(['/qrcode']);
    }
  }

  comeBack() {
    this.router.navigate(['/']);
  }
}
