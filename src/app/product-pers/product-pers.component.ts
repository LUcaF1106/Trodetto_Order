import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTransferService } from '../common/service/dataTransfer/data-transfer.service';
import { ProductJson } from '../common/interface/product_json';
import { ModalProdComponent } from '../features/modal-prod/modal-prod.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-pers',
  imports: [FormsModule, ModalProdComponent],
  templateUrl: './product-pers.component.html',
  styleUrl: './product-pers.component.scss',
})
export class ProductPersComponent {
  private dataTransfer: DataTransferService = inject(DataTransferService);
  private router: Router = inject(Router);
  protected product: ProductJson;

  protected ingredients: boolean[] = [];

  protected qt = 1;

  constructor() {
    this.product = this.dataTransfer.product() || {
      id: -1,
      nome: 'Nome Prodotto',
      prezzo: 0,
      con: [],
      categoria: 'NN',
    };
    if (this.product) {
      for (let i = 0; i < this.product?.con.length; i++) {
        this.ingredients.push(true);
      }
    }
  }
  close() {
    this.dataTransfer.clearProduct();
    console.log('ciaoo');
    this.router.navigate(['/lista-prodotti']);
  }
  add() {
    this.qt++;
  }
  remove() {
    if (this.qt > 1) this.qt--;
  }
  click() {
    //TODO: implementare logica carrello
    console.log('click');
  }

  changeQt() {
    if (this.qt < 1 || this.qt == null) {
      this.qt = 1;
    }
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
