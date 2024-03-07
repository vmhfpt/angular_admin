import { Component } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryAttributes } from '../category.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent {
  public addForm: FormGroup | any;
  public categories : CategoryAttributes[] = [];
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private categoryService : CategoryService,
  ) {}

  ngOnInit(): void {
    this.categoryService.index().subscribe((data: any) => {
      this.categories = data;
    });

    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      parent_id: ['', []],
    });
  }


  




  async onSubmit(){

    if (this.addForm.valid) {
      const payload =  {
         name : this.addForm.value.name,
         parent_id : this.addForm.value.parent_id ? this.addForm.value.parent_id : null
      };
     
      this.categoryService.create(payload as CategoryAttributes).subscribe(
        (res: any) => {
          this.toastr.success('Thêm danh mục thành công', 'Thành công');
          this.categoryService.updateListClicked();
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
