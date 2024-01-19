import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../order.service';
import { ProductService } from '../../product/product.service';
import { OrderDetailAttributes } from '../order-detail.interface';
import { ProductAttributes } from '../../product/product.interface';
declare var $: any;
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html'
})
export class OrderDetailComponent implements OnInit{
  public idDelete = '';
  public nameDelete = '';
  public products : ProductAttributes[] = [];
  public dataItem : OrderDetailAttributes[] = [];
  public item : any = {
    name : '',
    email : '',
    status : 1
  };
  public addForm: FormGroup | any;
  constructor( private productService : ProductService, private toastr: ToastrService, private fb: FormBuilder, private route: ActivatedRoute, private orderService : OrderService ){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.addForm = this.fb.group({
      product: ['65a0acb69384cec59db4aaae-250000', []],
      quantity: ['', [Validators.required]],
    });
    this.renderData();
    this.orderService.getOne(id).subscribe((data : any) => {
      this.item = data;
    })
    this.productService.index().subscribe((data : any) => {
      this.products = data;
    })
  }
  public renderData(){
    const id = this.route.snapshot.paramMap.get('id')!;
    this.orderService.getOrderDetailByOrderId(id).subscribe((data : any) => {
      this.dataItem = data;
    })
  }
  public formatVNDCurrency(price : Number){
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price as any);
  }
  public getSubTotalCart() : string{
   
    let total =  0;
    for(let item of this.dataItem){
      total = total + (item.price * item.quantity);
    }
    return this.formatVNDCurrency(total);
  }
  onSubmit(){
    if (this.addForm.valid) {
      const id = this.route.snapshot.paramMap.get('id')!;
     
      let parts = this.addForm.value.product.split('-');
      //console.log(this.addForm.value.product)
      let productId = parts[0];
      let price = Number(parts[1]);

      let payload  = {
          product_id : productId ,
          price,
          quantity : this.addForm.value.quantity,
          order_id : id
      }
      this.orderService.createOrderDetail(payload as OrderDetailAttributes).subscribe((data : any) => {
         this.renderData();
         this.toastr.success('Added product success', 'Success !');
      })
    }
  }

  onDelete(id : string, name : string){
    this.idDelete = id;
    this.nameDelete = name;
    $('#myModal').modal('toggle');
    
    
  }
  onConfirmDelete(){
    if(this.dataItem.length == 1){
      this.toastr.error('This order must be at least one item', 'Error !');
      
    }else {
      this.orderService.deleteOrderDetail(this.idDelete).subscribe((data : any) => {
        this.renderData();
        this.toastr.success('Delete item success', 'Success !');
        
      })
    }
    $('#myModal').modal('toggle');
  }
}
