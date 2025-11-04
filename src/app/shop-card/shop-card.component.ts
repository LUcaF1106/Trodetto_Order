import { Component, computed, inject } from '@angular/core';
import { ShopItemComponent } from '../shop-item/shop-item.component';
import { CartService } from '../common/service/shop/cart.service';
import { Router } from '@angular/router';

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

  deleteProduct($event: number) {
    console.log($event);
    this.cartService.delete($event);
  }

  updateQt(event: { index: number; quntity: number }) {
    console.log(event);
    this.cartService.updateQtProduct(event.quntity, event.index);
  }
  comeBack() {
    this.router.navigate(['/']);
  }
}
