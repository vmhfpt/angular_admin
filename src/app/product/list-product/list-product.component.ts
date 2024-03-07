import { Component } from '@angular/core';
import { ProductAttributes } from '../product.interface';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryAttributes } from '../../category/category.interface';
import { CategoryService } from '../../category/category.service';
declare var $: any;
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html'
})
export class ListProductComponent {
  public categoryId : string = '';
  public categories : CategoryAttributes[] = [];
  public products : ProductAttributes[] = [];
  public loading : boolean = true;
  public imageDelete : string = '';
  public idDelete : string = '';
  public nameDelete : string = '';
  public textInput: string = "";
  constructor(private categoryService : CategoryService,private toastr: ToastrService, private router: Router, public productService: ProductService) {
  }
  ngOnInit(): void {
    this.productService.updateListObservable().subscribe(() => {
      this.reloadData();
    });
    this.categoryService.index().subscribe((data : any) => {
      this.categories = this.convertData(data);
      
    })
  }
  ngAfterViewInit(): void {
    this.reloadData();
  }



  private reloadData() {
    this.productService.index().subscribe((data: any) => {
      
      this.products = data;
      this.loading = false;
     // console.log(this.products)
    });
  }

  public onDelete(id : string, name : string, image : string){
    this.idDelete = id;
    this.nameDelete = name;
    this.imageDelete = image;
    $('#myModal').modal('toggle');
  }
  public formatVNDCurrency(price : Number){
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price as any);
  }
  public onConfirmDelete(){
    this.productService.deleteImage(this.imageDelete.split('/').pop() as string).subscribe(() => {});
    this.productService.delete(this.idDelete).subscribe(() => {
      this.products = this.products.filter((item) => item._id != this.idDelete);
      this.toastr.success('Xóa sản phẩm thành công', 'Thành công');
      $('#myModal').modal('toggle');
    });
  }

  

  onChanges(event: any) {
   
    const queryUrl = `?_key=${this.textInput}&&_page=100`;
    this.productService.filter(queryUrl).subscribe((data : any) => {
      this.products = data.dataItem;
    })


  }

  convertData(data : CategoryAttributes[]){
    
    let newArr : CategoryAttributes[] = [];
    data.map((item, key) => {
      
      if(item.parent_id == null){
         newArr.push({...item, lever : 0});
         data.map((i, k) => {
             if(i.parent_id != null && i.parent_id._id == item._id){
               newArr.push({...i, lever : 1});
             }
         })
      }
    })
    return newArr;
  }




  public filter(){
    
    if(this.categoryId != ''){
       const queryUrl = `?category_id=${this.categoryId}&&_page=100`;
        this.productService.filter(queryUrl).subscribe((data : any) => {
          this.products = data.dataItem;
        })
    }
  }
  
}
