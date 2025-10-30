import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-modal-prod',
  imports: [FormsModule, NgIf],
  templateUrl: './modal-prod.component.html',
  styleUrl: './modal-prod.component.scss',
})
export class ModalProdComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() conferma = new EventEmitter<number>();

  qt = 1;

  open() {
    this.visible = true;
    this.visibleChange.emit(true);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  confermaQuantita() {
    if (this.qt !== null && this.qt >= 0) {
      this.conferma.emit(this.qt);
      this.close();
    }
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
