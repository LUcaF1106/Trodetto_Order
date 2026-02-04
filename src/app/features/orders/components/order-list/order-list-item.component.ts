import {
  Component,
  EventEmitter,
  Input,
  numberAttribute,
  Output,
} from '@angular/core';

import { Product_save } from '../../../../common/interface/product_save';


@Component({
  selector: 'app-order-list-item',
  imports: [
  ],
  templateUrl: './order-list-item.component.html',
  styleUrl: './order-list-item.component.scss',
})
export class OrderListItemComponent {
  /**
   * Id product
   * @required
   */
  @Input() id = 0;
  /**
   * product name
   * @required
   */
  @Input() label = 'Product';
  /**
   * url img
   * @required
   */
  @Input() urlImg = 'placeholder.jpg';

  /**
   * price product
   * @required
   */
  @Input({ transform: numberAttribute }) price = 0;

  @Output() clicked = new EventEmitter<Product_save>();

  click() {
    this.clicked.emit({ id: this.id, nome: this.label, prezzo: this.price });
  }
}
