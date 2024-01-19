import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}
   cancel() {
     this.gotoProjects();
   }
   gotoProjects(){
    this.router.navigate(['../'], { relativeTo: this.route });
   }
}
