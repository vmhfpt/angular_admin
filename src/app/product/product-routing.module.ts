import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { authGuard } from '../auth/auth.guard';
const routes: Routes = [
  {
    path: 'product',
    component: ListProductComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'add',
        canActivateChild: [authGuard],
        component: AddProductComponent
      },
      {
        path: ':id',
        canActivateChild: [authGuard],
        component: EditProductComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
