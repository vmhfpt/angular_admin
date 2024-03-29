import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAttributes } from '../product.interface';
import { ProductService } from '../product.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryAttributes } from '../../category/category.interface';
import { CategoryService } from '../../category/category.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {
  public adding : boolean = false;
  public loading : boolean = true;
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
    private toastr: ToastrService
  ) {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description : ['', [Validators.required, Validators.minLength(15)]],
      file: [null, [Validators.required, this.fileTypeValidator(['jpg', 'jpeg', 'png'])]],
      price : ['', [Validators.required, Validators.min(100)]],
      price_sale : ['', [Validators.required, Validators.min(100)]],
      content : ['', [Validators.required, Validators.minLength(15)]],
      category_id : ['6521fa086206c146921ef6a9', []],
    });
  }

  ngAfterViewInit(): void {

    
    this.categoryService.index().subscribe((data: any) => {
      this.categories = data;
      this.loading = false;
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
          this.toastr.success('Thêm sản phẩm thành công', 'Thành công');
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
      this.adding = true;

      this.productService.uploadImage(this.addForm.value.file).subscribe(
        (res: any) => {
          const response = JSON.parse(res);
          const payload = {
            ...this.addForm.value,
            image : 'https://nikba.co/hungvu/products/img/' + response.nameFile
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
