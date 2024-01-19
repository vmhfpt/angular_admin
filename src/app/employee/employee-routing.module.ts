import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { authGuard } from '../auth/auth.guard';
const routes: Routes = [
  { path: 'employee',   redirectTo: '/employee/task', pathMatch: 'full' },
  {
    path: 'employee/task',
    component: ListTaskComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'add',
        canActivateChild: [authGuard],
        component: AddTaskComponent
      },
      {
        path: ':id',
        canActivateChild: [authGuard],
        component: EditTaskComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
