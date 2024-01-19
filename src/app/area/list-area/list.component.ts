import {  AfterViewInit, Component,  OnInit } from '@angular/core';
import { AreaService } from '../area.service';
import { AreaAttributes } from '../area.interface';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, AfterViewInit{
  public areas : AreaAttributes[] = [];
  public loading : boolean = true;
  public idDelete : number = 0;
  public nameDelete : string = '';
 


  
  constructor(private router: Router, public areaService: AreaService) {
  }

  ngOnInit()  {
    this.areaService.updateListObservable().subscribe(() => {
      this.reloadData();
    });
  }
  ngAfterViewInit(): void {
    this.reloadData();
  }
  private reloadData() {
    this.areaService.index().subscribe((data: any) => {
      this.areas = data;
      this.loading = false;
      
    });
  }
  public onDelete(id : number, name : string){
    this.idDelete = id;
    this.nameDelete = name;
    $('#myModal').modal('toggle');
  }

  public onConfirmDelete(){
    this.areaService.delete(this.idDelete).subscribe(() => {
      this.areas = this.areas.filter((item) => item.id != this.idDelete);
      $('#myModal').modal('toggle');
    });
    
  }
}
