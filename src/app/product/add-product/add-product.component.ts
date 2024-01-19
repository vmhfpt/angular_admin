import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAttributes } from '../product.interface';
import { ProductService } from '../product.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryAttributes } from '../../category/category.interface';
import { CategoryService } from '../../category/category.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {
  public categories : CategoryAttributes[] = [];
  public Editor: any = ClassicEditor;
  public addForm: FormGroup | any;
  public selectedFileUrl: string = 'https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService : ProductService,
    private categoryService : CategoryService,
  ) {}

  ngOnInit(): void {


    this.categoryService.index().subscribe((data: any) => {
      this.categories = data;
    });

    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description : ['', [Validators.required, Validators.minLength(15)]],
      file: [null, [Validators.required, this.fileTypeValidator(['jpg', 'jpeg', 'png'])]],
      price : ['', [Validators.required, Validators.minLength(6)]],
      price_sale : ['', [Validators.required, Validators.minLength(6)]],
      content : ['', [Validators.required, Validators.minLength(15)]],
      category_id : ['659e83d5129790a1eb8684e9', []],
    });
  }

  fileTypeValidator(allowedTypes: string[]){
    return (control : AbstractControl) => {
      const file = control.value;
      if (file) {
        const extension = file.name.split('.').pop().toLowerCase();
        return allowedTypes.includes(extension) ? null : { invalidFileType: true };
      }
      return null;
    };
  }
  onFileChange(event : any) {
    const file = (event.target.files[0]);
    this.addForm.get('file').setValue(file);
    this.readSelectedFile(file);
  }

  readSelectedFile(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadProduct(payload : ProductAttributes) {
     this.productService.create(payload).subscribe(
        (res: any) => {
          this.productService.updateListClicked();
          return this.gotoProjects();
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
  onSubmit(){

    if (this.addForm.valid) {


      this.productService.uploadImage(this.addForm.value.file).subscribe(
        (res: any) => {
          const response = JSON.parse(res);
          const payload = {
            ...this.addForm.value,
            image : 'http://localhost:5000/files/' + response.nameFile
          };
          delete payload.file;
          return this.uploadProduct(payload);
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
