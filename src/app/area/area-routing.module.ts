import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../auth/auth.guard';
import { ListComponent } from './list-area/list.component';
import { EditComponent } from './edit-area/edit.component';
import { AddComponent } from './add-area/add.component';
const routes: Routes = [
  {
    path: 'area',
    component: ListComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'add',
        canActivateChild: [authGuard],
        component: AddComponent
      },
      {
        path: ':id',
        canActivateChild: [authGuard],
        component: EditComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule { }
