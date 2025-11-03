import { Component } from '@angular/core';
import { ShopItemComponent } from '../shop-item/shop-item.component';

@Component({
  selector: 'app-shop-card',
  imports: [ShopItemComponent],
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.scss',
})
export class ShopCardComponent {}
