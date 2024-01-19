import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamLeaderRoutingModule } from './team-leader-routing.module';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';



@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectAddComponent
  ],
  imports: [
    CommonModule,
    TeamLeaderRoutingModule
  ]
})
export class TeamLeaderModule { }
