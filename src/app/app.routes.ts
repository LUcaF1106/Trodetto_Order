import { Routes } from '@angular/router';
import { ProductPersComponent } from './product-pers/product-pers.component';
import { productGuard } from './common/guard/prod-activation.guard';
import { OrderListComponent } from './order/order-list.component';

export const routes: Routes = [
  {
    path: 'prodotto',
    component: ProductPersComponent,
    pathMatch: 'full',
    canActivate: [productGuard],
  },
  { path: 'lista-prodotti', component: OrderListComponent, pathMatch: 'full' },
];
