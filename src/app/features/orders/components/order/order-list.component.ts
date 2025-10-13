import { Component } from '@angular/core';
import { OrderListItemComponent } from '../order-list/order-list-item.component';
import { Product_save } from '../../../../common/interface/product_save';
import { ShoppingCartOutlineIconComponent } from '@dimaslz/ng-heroicons';

@Component({
  selector: 'app-order-list',
  imports: [OrderListItemComponent, ShoppingCartOutlineIconComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  productList: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  clickProduct($event: Product_save) {
    console.log($event);
  }
}
