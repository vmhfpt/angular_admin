import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';

import { ListComponent } from './list-area/list.component';
import { AddComponent } from './add-area/add.component';
import { EditComponent } from './edit-area/edit.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HelperModule } from '../helper/helper.module';
@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    //LoadingComponent,
    //ModalComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    ReactiveFormsModule,
    HelperModule
  ]
})
export class AreaModule { }
