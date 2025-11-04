import { Component, computed, inject } from '@angular/core';
import { ShopItemComponent } from '../shop-item/shop-item.component';
import { CartService } from '../common/service/shop/cart.service';
import { Router } from '@angular/router';
import { QrgenService } from '../common/service/qrgen/qrgen.service';

@Component({
  selector: 'app-shop-card',
  imports: [ShopItemComponent],
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss',
})
export class ShopCardComponent {
  private router: Router = inject(Router);
  protected cartService: CartService = inject(CartService);
  protected card = computed(() => this.cartService.cartItems());
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
