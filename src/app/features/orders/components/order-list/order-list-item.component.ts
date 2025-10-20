import {
  Component,
  EventEmitter,
  Input,
  numberAttribute,
  Output,
} from '@angular/core';

import { Product_save } from '../../../../common/interface/product_save';
import {
  InformationCircleOutlineIconComponent,
  PlusCircleSolidIconComponent,
} from '@dimaslz/ng-heroicons';

@Component({
  selector: 'app-order-list-item',
  imports: [
    PlusCircleSolidIconComponent,
    InformationCircleOutlineIconComponent,
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
    this.clicked.emit({ id: 0, nome: this.label, prezzo: this.price });
  }
}
