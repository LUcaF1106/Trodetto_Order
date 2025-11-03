import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CartService } from '../../common/service/shop/cart.service';
import { DataTransferService } from '../../common/service/dataTransfer/data-transfer.service';

@Component({
  selector: 'app-modal-prod',
  imports: [FormsModule, NgIf],
  templateUrl: './modal-prod.component.html',
  styleUrl: './modal-prod.component.scss',
})
export class ModalProdComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  private cartService = inject(CartService);
  private dataService = inject(DataTransferService);
  @Output() conferma = new EventEmitter<number>();

  qt = 1;

  open() {
    this.visible = true;
    this.visibleChange.emit(true);
  }

  close() {
    this.qt = 1;
    this.dataService.clearProduct();
    this.visible = false;
    this.visibleChange.emit(false);
  }

  confermaQuantita() {
    const prod = this.dataService.product();

    if (this.qt !== null && this.qt >= 0 && prod) {
      this.cartService.add(
        this.cartService.transformToCartItem(prod, this.qt, []),
      );
    }
    this.close();
  }
  add() {
    this.qt++;
  }
  remove() {
    if (this.qt > 1) this.qt--;
  }

  correggiQuantita(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value === '' || +value < 1) {
      this.qt = 1;
      input.value = '1';
    } else {
      this.qt = +value;
    }
  }
}
