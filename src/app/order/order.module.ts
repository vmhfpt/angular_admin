import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ListOrderComponent } from './list-order/list-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HelperModule } from '../helper/helper.module';

@NgModule({
  declarations: [
    ListOrderComponent,
    EditOrderComponent,
    OrderDetailComponent
  ],
  imports: [
    HelperModule ,
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,
   
  ]
})
export class OrderModule { }
