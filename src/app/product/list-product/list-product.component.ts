import { Component } from '@angular/core';
import { ProductAttributes } from '../product.interface';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
declare var $: any;
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html'
})
export class ListProductComponent {
  public products : ProductAttributes[] = [];
  public loading : boolean = true;
  public imageDelete : string = '';
  public idDelete : string = '';
  public nameDelete : string = '';
  constructor(private router: Router, public productService: ProductService) {
  }
  ngOnInit(): void {
    this.productService.updateListObservable().subscribe(() => {
      this.reloadData();
    });
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
      $('#myModal').modal('toggle');
    });
  }
}
