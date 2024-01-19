import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HelperModule } from '../helper/helper.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular'; 

@NgModule({
  declarations: [
    AddProductComponent,
    ListProductComponent,
    EditProductComponent
  ],
  imports: [

    
    CommonModule,
    ProductRoutingModule,
    HelperModule,
    ReactiveFormsModule,
    CKEditorModule

  ]
})
export class ProductModule { }
