import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { UserAttributes } from '../user.interface';
import { AfterViewInit,  Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements AfterViewInit  {
  public loading : boolean = true;
  public editForm: FormGroup | any;
  public dataItem : {
    _id : number,
    name : string
  } = {
    _id : 0,
    name : ''
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService : UserService,
  ) {
    
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(140)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, this.validateNumericLength(/^(0[1-9]|84[1-9])(\d{8,9})$/)]],
      password: ['', [this.validatePassword(/^(?=.*[!@#$%^&*(),.?":{}|<>])(.{6,})$/)]],
      role : [1, [Validators.required]],
    });
    
  }



  validateNumericLength(pattern : RegExp) : ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = pattern.test(control.value);
      
      return isValid ? null : { 'vietnamesePhoneNumber': { value: control.value } };
    };
  }

  validatePassword(pattern : RegExp) : ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = pattern.test(control.value);
      return isValid ? null : { 'passwordCheck': { value: control.value } };
    };
  }

  ngAfterViewInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
   
    this.userService.getOne(String(id)).subscribe((data) => {
      this.dataItem  = data ;
      this.loading = false;
      this.editForm.setValue({
        name: data.name,
        address : data.address,
        email : data.email,
        phone_number: data.phone_number,
        password : data.password,
        role : data.role
      });
    });
  }

  async onSubmit(){
    
    if (this.editForm.valid) {
       
      const id = this.route.snapshot.paramMap.get('id')!;
      const payload  = this.editForm.value;

      this.userService.update(id, payload as UserAttributes).subscribe(() => {
        this.userService.updateListClicked();
        this.gotoProjects();

      }, (err) => {
        console.log(err);
      });
    }
    
  }

  cancel() {
    this.gotoProjects();
  }
  gotoProjects(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
