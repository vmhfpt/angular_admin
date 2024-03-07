import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category/category.service';
import { ProductService } from '../product.service';
import { CategoryAttributes } from '../../category/category.interface';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProductAttributes } from '../product.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent {
  public saving : boolean = false;
  public errorFile : string  | boolean = false;
  public file : any = false;
  public Editor: any = ClassicEditor;
  public selectedFileUrl: string = 'https://lordicon.com/icons/wired/flat/54-photo-picturelandscape-gallery.svg';
  public categories : CategoryAttributes[] = [];
  public loading : boolean = true;
  public editForm: FormGroup | any;
  public dataItem : {
    _id : number,
    name : string,
    image : string
  } = {
    _id : 0,
    name : '',
    image : ''
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private categoryService : CategoryService,
    private productService : ProductService,
    private toastr: ToastrService
  ) {
    
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description : ['', [Validators.required, Validators.minLength(15)]],
      //file: [null, [this.fileTypeValidator(['jpg', 'jpeg', 'png'])]],
      price : ['', [Validators.required, Validators.min(100)]],
      price_sale : ['', [Validators.required, Validators.min(100)]],
      content : ['', [Validators.required, Validators.minLength(15)]],
      category_id : ['', []],
    });
    
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
  onFileChange(event : any) {
    const file = (event.target.files[0]);
    this.file = file;
    this.readSelectedFile(file);
    if(!this.fileTypeValidator(file, ['jpg', 'jpeg', 'png'])){
      this.errorFile = '* File is invalid' ;
    }else {
      this.errorFile = false;
    }
  }

  fileTypeValidator(file : any, allowedTypes: string[]) : boolean {
    const extension = file.name.split('.').pop().toLowerCase();
    if(allowedTypes.includes(extension)){
      return true;
    }
    return false;
  }

  ngAfterViewInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.categoryService.index().subscribe((data: any) => {
      this.categories = data;
    });

    this.productService.getOne(String(id)).subscribe((data) => {
      this.dataItem  = data ;
      this.loading = false;
   
      this.selectedFileUrl = data.image;


      this.editForm.setValue({
        name: data.name,
        description : data.description,
        price : data.price,
        price_sale : data.price_sale,
        content : data.content,
        category_id : data.category_id
      });



    });
  }


  uploadProduct(payload : ProductAttributes, id : string) {
    this.productService.update(id, payload).subscribe(
       (res: any) => {
      
        this.toastr.success('Cập nhật sản phẩm thành công', 'Thành công');
         this.productService.updateListClicked();
         return this.gotoProjects();
       },
       (err: any) => {
        this.toastr.error('Lỗi cập nhật', 'Lỗi');
        return this.gotoProjects();
       }
    );
 }

  onSubmit(){
     
    if (this.editForm.valid && !this.errorFile) {
     
       this.saving = true;
       const idUpdate : string = this.route.snapshot.paramMap.get('id')!;
       if(this.file){
        

        this.productService.deleteImage(this.dataItem.image.split('/').pop() as string).subscribe(
          (res: any) => {}
        );
        this.productService.uploadImage(this.file).subscribe(
          (res: any) => {
            const response = JSON.parse(res);
            const payload = {
              ...this.editForm.value,
              image : 'https://nikba.co/hungvu/products/img/' + response.nameFile
            };
            return this.uploadProduct( payload, idUpdate);
          },
          (err: any) => {
            this.toastr.error('Lỗi cập nhật', 'Lỗi');
            return this.gotoProjects();
          }
        );
        
       }else {
        const payload = this.editForm.value;

          this.productService.update(idUpdate, payload).subscribe(
            (res: any) => {
              this.toastr.success('Cập nhật sản phẩm thành công', 'Thành công');
              this.productService.updateListClicked();
              return this.gotoProjects();
            },
            (err: any) => {
              this.toastr.error('Lỗi cập nhật', 'Lỗi');
              return this.gotoProjects();
            }
        );
       }
       
  
    }
    
  }

  cancel() {
    this.gotoProjects();
  }
  gotoProjects(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
