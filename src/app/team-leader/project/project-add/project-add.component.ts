import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
})
export class ProjectAddComponent {
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
