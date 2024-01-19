import { AfterViewInit, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../area.service';
import { AreaAttributes } from '../area.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements AfterViewInit {
  public loading : boolean = true;
  public editForm: FormGroup | any;
  public dataItem : {
    id : number,
    name : string
  } = {
    id : 0,
    name : ''
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private areaService : AreaService,
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]]
    });
  }




  ngAfterViewInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.areaService.getOne(Number(id)).subscribe((data: AreaAttributes) => {
      this.dataItem  = data ;
      this.loading = false;
      this.editForm.setValue({
        name: data.name,
      });
    });
  }

  async onSubmit(){
    
    if (this.editForm.valid) {
    
      const id = this.route.snapshot.paramMap.get('id')!;
      const payload  = {
         name : String(this.editForm.value.name)
      }

      this.areaService.update(Number(id), payload as AreaAttributes).subscribe(() => {
        this.areaService.updateListClicked();
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
