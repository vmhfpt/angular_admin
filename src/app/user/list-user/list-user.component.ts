import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserAttributes } from '../user.interface';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
declare var $: any;
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html'
})
export class ListUserComponent implements OnInit, AfterViewInit{
  public users : UserAttributes[] = [];
  public loading : boolean = true;
  public idDelete : string = '';
  public nameDelete : string = '';
  constructor(private router: Router, public userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.updateListObservable().subscribe(() => {
      this.reloadData();
    });
  }
  ngAfterViewInit(): void {
    this.reloadData();
  }
  private reloadData() {
    this.userService.index().subscribe((data: any) => {
      this.users = data;
      this.loading = false;
    });
  }

  public onDelete(id : string, name : string){
    this.idDelete = id;
    this.nameDelete = name;
    $('#myModal').modal('toggle');
  }
  public onConfirmDelete(){
   
    this.userService.delete(this.idDelete).subscribe(() => {
      this.users = this.users.filter((item) => item._id != this.idDelete);
      $('#myModal').modal('toggle');
    });
  }
}
