import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-pers',
  imports: [FormsModule],
  templateUrl: './product-pers.component.html',
  styleUrl: './product-pers.component.scss',
})
export class ProductPersComponent {
  prezzo = 66;
  check = true;

  click() {
    console.log(this.check);
  }
}
