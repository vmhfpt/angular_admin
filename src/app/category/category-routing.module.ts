import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { authGuard } from '../auth/auth.guard';
const routes: Routes = [
  {
    path: 'category',
    component: ListCategoryComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'add',
        canActivateChild: [authGuard],
        component:  AddCategoryComponent
      },
      {
        path: ':id',
        canActivateChild: [authGuard],
        component: EditCategoryComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
