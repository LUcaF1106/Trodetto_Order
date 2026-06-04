import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-generator',
  imports: [],
  templateUrl: './pdf-generator.html',
  styleUrl: './pdf-generator.scss',
})
export class PdfGenerator {

  @Input() products: { nome: string; note: string; qt: number; price: number }[] = [];
  @Input() qrData: string = '';

  async downloadPdf() {
    if (typeof window === 'undefined') return;

    const [{ PDFDocument, rgb, StandardFonts }, QRCode] = await Promise.all([
      import('pdf-lib'),
      import('qrcode'),
    ]);

    const doc = await PDFDocument.create();
    const page = doc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();

    const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
    const font = await doc.embedFont(StandardFonts.Helvetica);

    const margin = 40;
    const colWidths = [160, 100, 60, 80, 80]; // Prodotto, Note, Qt, Prezzo, Totale
    const headers = ['Prodotto', 'Note', 'Quantità', 'Prezzo', 'Totale'];
    const rowHeight = 22;
    const headerHeight = 26;

    // ── Titolo ────────────────────────────────────────────────────────────────
    page.drawText('Riepilogo Ordine', {
      x: margin,
      y: height - 50,
      size: 20,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.1),
    });

    // ── Intestazione tabella ──────────────────────────────────────────────────
    let tableTop = height - 80;
    let x = margin;

    page.drawRectangle({
      x: margin,
      y: tableTop - headerHeight,
      width: colWidths.reduce((a, b) => a + b, 0),
      height: headerHeight,
      color: rgb(0.2, 0.4, 0.7),
    });

    headers.forEach((h, i) => {
      page.drawText(h, {
        x: x + 4,
        y: tableTop - headerHeight + 7,
        size: 10,
        font: fontBold,
        color: rgb(1, 1, 1),
      });
      x += colWidths[i];
    });

    // ── Righe prodotti ────────────────────────────────────────────────────────
    let y = tableTop - headerHeight;

    this.products.forEach((p, idx) => {
      const rowY = y - rowHeight * (idx + 1);
      const bg = idx % 2 === 0 ? rgb(0.95, 0.95, 0.95) : rgb(1, 1, 1);

      page.drawRectangle({
        x: margin,
        y: rowY,
        width: colWidths.reduce((a, b) => a + b, 0),
        height: rowHeight,
        color: bg,
      });

      const cells = [
        p.nome,
        p.note || '-',
        String(p.qt),
        `€ ${p.price.toFixed(2)}`,
        `€ ${(p.qt * p.price).toFixed(2)}`,
      ];

      let cx = margin;
      cells.forEach((cell, ci) => {
        const maxChars = Math.floor(colWidths[ci] / 6);
        const text = cell.length > maxChars ? cell.slice(0, maxChars - 1) + '…' : cell;
        page.drawText(text, {
          x: cx + 4,
          y: rowY + 6,
          size: 9,
          font,
          color: rgb(0.1, 0.1, 0.1),
        });
        cx += colWidths[ci];
      });
    });

    // ── Totale ────────────────────────────────────────────────────────────────
    const total = this.products.reduce((sum, p) => sum + p.qt * p.price, 0);
    const totalY = y - rowHeight * (this.products.length + 1) - 10;

    page.drawText(`Totale ordine: € ${total.toFixed(2)}`, {
      x: margin,
      y: totalY,
      size: 13,
      font: fontBold,
      color: rgb(0.1, 0.1, 0.1),
    });

    // ── QR Code ───────────────────────────────────────────────────────────────
    if (this.qrData) {
      const qrDataUrl: string = await (QRCode as any).toDataURL(this.qrData);
      const base64 = qrDataUrl.split(',')[1];
      const qrBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const qrImage = await doc.embedPng(qrBytes);
      const qrSize = 100;

      page.drawImage(qrImage, {
        x: margin,
        y: totalY - qrSize - 15,
        width: qrSize,
        height: qrSize,
      });
    }

    // ── Download ──────────────────────────────────────────────────────────────
    const pdfBytes = await doc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ordine.pdf';
    a.click();
    URL.revokeObjectURL(url);
  }
}
