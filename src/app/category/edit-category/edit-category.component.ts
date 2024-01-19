import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { CategoryAttributes } from '../category.interface';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent {
  public categories : CategoryAttributes[] = [];
  public loading : boolean = true;
  public editForm: FormGroup | any;
  public dataItem : {
    _id : number,
    name : string
  } = {
    _id : 0,
    name : ''
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private categoryService : CategoryService,
  ) {
    
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      parent_id : []
    });
    
  }



 

  ngAfterViewInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.categoryService.index().subscribe((data: any) => {
      this.categories = data;
    });

    this.categoryService.getOne(String(id)).subscribe((data) => {
      this.dataItem  = data ;
      this.loading = false;
      this.editForm.setValue({
        name: data.name,
        parent_id : data.parent_id ? data.parent_id : ""
      });
    });
  }

  async onSubmit(){
    
    if (this.editForm.valid) {
       
      const id = this.route.snapshot.paramMap.get('id')!;
      const payload  = {
        name : this.editForm.value.name,
        parent_id : this.editForm.value.parent_id ? this.editForm.value.parent_id : null
     };

      this.categoryService.update(id, payload as CategoryAttributes).subscribe(() => {
        this.categoryService.updateListClicked();
        this.gotoProjects();

      }, (err) => {
        console.log(err);
      });
    }
    
  }

  cancel() {
    this.gotoProjects();
  }
  gotoProjects(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
