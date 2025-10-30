import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderListComponent } from './order/order-list.component';
import { ProductPersComponent } from './product-pers/product-pers.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OrderListComponent, ProductPersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Trodetto_Order';
  f() {
    return 0;
  }
}
