import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',

})
export class AddTaskComponent {
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
