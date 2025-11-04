import { Routes } from '@angular/router';
import { ProductPersComponent } from './product-pers/product-pers.component';
import { productGuard } from './common/guard/prod-activation.guard';
import { OrderListComponent } from './order/order-list.component';
import { ShopCardComponent } from './shop-card/shop-card.component';
import { QrcodeComponent } from './qrcode/qrcode.component';

export const routes: Routes = [
  {
    path: 'prodotto',
    component: ProductPersComponent,
    pathMatch: 'full',
    canActivate: [productGuard],
  },
  { path: 'lista-prodotti', component: OrderListComponent, pathMatch: 'full' },
  { path: 'carrello', component: ShopCardComponent, pathMatch: 'full' },
  { path: 'qrcode', component: QrcodeComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'lista-prodotti' },
];
