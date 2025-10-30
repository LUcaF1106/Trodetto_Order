import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataTransferService } from '../service/dataTransfer/data-transfer.service';

export const productGuard: CanActivateFn = () => {
  const dataService: DataTransferService = inject(DataTransferService);
  const router = inject(Router);

  if (!dataService.hasProduct()) {
    router.navigate(['/lista-prodotti']);
  }
  return true;
};
