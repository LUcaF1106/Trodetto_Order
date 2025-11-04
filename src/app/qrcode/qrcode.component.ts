import { Component, inject } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';
import { QrgenService } from '../common/service/qrgen/qrgen.service';

@Component({
  selector: 'app-qrcode',
  imports: [QRCodeComponent],
  templateUrl: './qrcode.component.html',
  styleUrl: './qrcode.component.scss',
})
export class QrcodeComponent {
  protected json: string;
  protected qrcodeService = inject(QrgenService);

  constructor() {
    const j = JSON.stringify(this.qrcodeService.jsonQrCode());
    console.log(j);
    this.json = j;
  }
}
