import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { QrgenService } from '../service/qrgen/qrgen.service';

export const qrActivationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const genQr = inject(QrgenService);
  if (!genQr.canGen()) {
    router.navigate(['/carrello']);
  }
  return true;
};
