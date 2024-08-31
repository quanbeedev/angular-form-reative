import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { createPassWordStrengthValidator } from '../validator/password-stength.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  // email = new FormControl('',
  //    {
  //       validators: 
  //       [
  //         Validators.required, 
  //         Validators.email
  //       ], 
  //       updateOn: 'blur'
  //     });

  // password =  new FormControl('',
  //   {
  //     validators: 
  //     [
  //       Validators.required, 
  //       Validators.minLength(8), 
  //       createPassWordStrengthValidator(),
  //     ]
  // });

  // form = new FormGroup({
  //   email: this.email,
  //   password: this.password
  // });

  form = this.fb.group({
    email: ['', {
      validators: [ Validators.required, Validators.email ],
      updateOn: 'blur'}],
    password: ['', [ Validators.required, Validators.minLength(8), createPassWordStrengthValidator()]]
  });
  

  constructor(private fb: NonNullableFormBuilder) {


  }

  ngOnInit() {

  }

  get email () {
    return this.form.controls['email']
  }

  get password () {
    return this.form.controls['password']
  }

  login(){

  }
}
