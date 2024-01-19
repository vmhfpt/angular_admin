import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderAttributes } from '../order.interface';
@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
})
export class ListOrderComponent implements OnInit{
   constructor(private orderService : OrderService){}
   public dataItem : OrderAttributes[] = [];
   ngOnInit(): void {
       this.reloadData();
       this.orderService.updateListObservable().subscribe(() => {
         this.reloadData();
       });
   }
  
   reloadData(){
      this.orderService.index().subscribe((data : any) => {
         this.dataItem = data;
      })
   }
}
