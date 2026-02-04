import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop-item',
  imports: [ FormsModule],
  templateUrl: './shop-item.component.html',
  styleUrl: './shop-item.component.scss',
})
export class ShopItemComponent {
  @Input() id = 0;
  @Input() index = 0;
  @Input() name = 'Nome Prodotto';
  @Input() price = 0;
  @Input() quantity = 1;
  @Input() con: { id: number; nome: string }[] = [];
  @Input() esx: { id: number; nome: string }[] = [];

  @Output() delete = new EventEmitter<number>();
  @Output() qtUpdate = new EventEmitter<{ index: number; quntity: number }>();

  add() {
    this.quantity++;
    this.updateQt();
  }
  reduce() {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateQt();
    }
  }

  updateQt() {
    this.qtUpdate.emit({ index: this.index, quntity: this.quantity });
  }
  correctQt(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value === '' || +value < 1) {
      this.quantity = 1;
      input.value = '1';
    } else {
      this.quantity = +value;
    }
  }
  onclickdelete() {
    this.delete.emit(this.index);
  }
}
