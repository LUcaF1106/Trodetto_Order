import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-list',
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  /**
   * product name
   * @required
   */
  @Input() label = 'Product';

  /**
   * price product
   * @required
   */
  @Input() price = 0;

  @Output() clicked = new EventEmitter<Event>();
}
