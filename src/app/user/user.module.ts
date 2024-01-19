import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

import { HelperModule } from '../helper/helper.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AddUserComponent,
    ListUserComponent,
    EditUserComponent,
   
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    HelperModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
