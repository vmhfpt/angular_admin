import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { authGuard } from '../auth/auth.guard';
const routes: Routes = [
  { path: 'team-leader',   redirectTo: '/team-leader/project', pathMatch: 'full' },
  {
    path: 'team-leader/project',
    component: ProjectListComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'add',
        canActivateChild: [authGuard],
        component: ProjectAddComponent
      },
      {
        path: ':id',
        canActivateChild: [authGuard],
        component: ProjectDetailComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamLeaderRoutingModule { }
