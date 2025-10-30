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

  quantita: number | null = null;

  open() {
    this.visible = true;
    this.visibleChange.emit(true);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  confermaQuantita() {
    if (this.quantita !== null && this.quantita >= 0) {
      this.conferma.emit(this.quantita);
      this.close();
    }
  }
}
