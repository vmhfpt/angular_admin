import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { OrderAttributes } from '../order.interface';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrl: './edit-order.component.css'
})
export class EditOrderComponent {
  public loading : boolean = true;
  public statusOrder : number = 6;
  public dataItem : OrderAttributes | any = {
     name : '',
     email : '',
     createdAt : ''
  }
  public editForm: FormGroup | any;
  constructor(private toastr: ToastrService, private fb: FormBuilder, private route: ActivatedRoute, private orderService : OrderService ){
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, this.validateNumericLength(/^(0[1-9]|84[1-9])(\d{8,9})$/)]],
      address : ['', [Validators.required, Validators.minLength(6)]],
      note : ['', []],
    });
  }
  ngAfterViewInit(): void {
     const id = this.route.snapshot.paramMap.get('id')!;
     //console.log(id)

     this.orderService.getOne(id).subscribe((data : any) => {
      //console.log(data)
        this.statusOrder = data.status;
        //console.log(this.statusOrder)
        this.dataItem = data;
        this.editForm.setValue({
          address : data.address,
          name: data.name,
          email : data.email,
          phone_number: data.phone_number,
          note : data.note
        });
        this.loading = false;
     })
  }
  validateNumericLength(pattern : RegExp) : ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = pattern.test(control.value);
      
      return isValid ? null : { 'vietnamesePhoneNumber': { value: control.value } };
    };
  }

  async onSubmit(){
    
    if (this.editForm.valid) {
      
      const id = this.route.snapshot.paramMap.get('id')!;
      
      
      const payload : OrderAttributes | any = this.editForm.value;
      this.orderService.update(id, payload).subscribe((data : any) => {
        this.toastr.success('Updated information of the order', 'Success !');
        this.orderService.updateListClicked();
      })
     
    }
    
  }
  public changeState(action : number){
    const id = this.route.snapshot.paramMap.get('id')!;
    const payload : OrderAttributes | any = {
      status : action
    }
    this.statusOrder = action;

    this.orderService.updateState(id, payload).subscribe((data :any) => {
      this.toastr.warning('Updated status of the order', 'Success !');
      this.orderService.updateListClicked();
    })
    
  }
}
