import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ListOrderComponent } from './list-order/list-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { authGuard } from '../auth/auth.guard';
const routes: Routes = [
  {
    path: 'order',
    component: ListOrderComponent,
    canActivate: [authGuard],
    children: [
      {
        path: ':id',
        canActivateChild: [authGuard],
        component: EditOrderComponent
      },
    ]
  },
  { path : 'order-detail/:id', component : OrderDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
