import { Component, inject } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { QrgenService } from '../common/service/qrgen/qrgen.service';
import { PdfGenerator } from '../features/pdf-generator/pdf-generator';

@Component({
  selector: 'app-qrcode',
  imports: [QRCodeComponent, PdfGenerator],
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.scss',
})
export class QrcodeComponent {
  protected json: string;
  protected qrcodeService = inject(QrgenService);
  protected prod: { nome: string; note: string; qt: number; price: number }[];

  constructor() {
    const j = JSON.stringify(this.qrcodeService.jsonQrCode());
    console.log(j);
    this.json = j;
    this.prod=this.qrcodeService.pdfProduct()
  }
}
