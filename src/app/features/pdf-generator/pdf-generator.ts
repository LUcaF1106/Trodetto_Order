import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';

@Component({
  selector: 'app-pdf-generator',
  imports: [],
  templateUrl: './pdf-generator.html',
  styleUrl: './pdf-generator.scss',
})
export class PdfGenerator {

  @Input() products: {nome:string, note:string, qt:number, price:number}[]=[];
  @Input() qrData:string='';

  async downloadPdf() {
    if (typeof window === 'undefined') return;

    const doc = new jsPDF();

    // Titolo
    doc.setFontSize(18);
    doc.text('Riepilogo Ordine', 14, 20);

    // Tabella prodotti
    autoTable(doc, {
      startY: 30,
      head: [['Prodotto','Note', 'Quantità', 'Prezzo', 'Totale']],
      body: this.products.map(p => [
        p.nome,
        p.note,
        p.qt,
        `  € ${p.price.toFixed(2)}`,
        `  € ${(p.qt * p.price).toFixed(2)}`
      ])
    });

    // Totale ordine
    const total = this.products.reduce(
      (sum, p) => sum + p.qt * p.price,
      0
    );

    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.setFontSize(14);
    doc.text(`Totale ordine:   € ${total.toFixed(2)}`, 14, finalY);


    const qrImage = await QRCode.toDataURL(this.qrData);

    doc.addImage(qrImage, 'PNG',14, finalY+10, 40, 40);

    // Download
    doc.save('ordine.pdf');
  }
}
