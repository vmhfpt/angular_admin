import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../area.service';
import { AreaAttributes } from '../area.interface';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit  {
  public addForm: FormGroup | any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private areaService : AreaService,
  ) {}

 
  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  async onSubmit(){
    
    if (this.addForm.valid) {
      const payload = {
        name : this.addForm.value.name as string
      }
      this.areaService.create(payload as AreaAttributes).subscribe(
        (res: any) => {
          this.areaService.updateListClicked();
          return this.gotoProjects();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    
  }
  cancel() {
    this.gotoProjects();
  }
  gotoProjects(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
