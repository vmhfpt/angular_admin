import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';


@NgModule({
  declarations: [
    ListTaskComponent,
    EditTaskComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
