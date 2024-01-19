import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserAttributes } from '../user.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit{
  public addForm: FormGroup | any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService : UserService,
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
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


  async onSubmit(){

    if (this.addForm.valid) {
      const payload =  this.addForm.value;
      this.userService.create(payload as UserAttributes).subscribe(
        (res: any) => {
          this.userService.updateListClicked();
          return this.gotoProjects();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    
  }
  cancel() {
    this.gotoProjects();
  }
  gotoProjects(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
