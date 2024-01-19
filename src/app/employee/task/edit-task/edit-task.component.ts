import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
})
export class EditTaskComponent {
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
