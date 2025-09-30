import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderListComponent } from './features/orders/components/order-list/order-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrderListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Trodetto_Order';
  f() {
    return 0;
  }
}
