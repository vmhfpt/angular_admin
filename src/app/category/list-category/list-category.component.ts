import { Component } from '@angular/core';
declare var $: any;
import { CategoryAttributes } from '../category.interface';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
})
export class ListCategoryComponent {
  public categories : CategoryAttributes[] = [];
  public loading : boolean = true;
  public idDelete : string = '';
  public nameDelete : string = '';
  constructor(private toastr: ToastrService,private router: Router, public categoryService: CategoryService) {
  }
  ngOnInit(): void {
    this.categoryService.updateListObservable().subscribe(() => {
      this.reloadData();
    });
  }
  ngAfterViewInit(): void {
    this.reloadData();
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
  private reloadData() {
    this.categoryService.index().subscribe((data: any) => {
     
      this.categories = this.convertData(data);
      this.loading = false;
    });
  }

  public onDelete(id : string, name : string){
    this.idDelete = id;
    this.nameDelete = name;
    $('#myModal').modal('toggle');
  }
  public onConfirmDelete(){
   
    this.categoryService.delete(this.idDelete).subscribe(() => {
      this.categories = this.categories.filter((item) => item._id != this.idDelete);
      this.toastr.success('Xóa danh mục thành công', 'Thành công');
      $('#myModal').modal('toggle');
    });
  }
}
