import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  val = {
    email: "qnguyen@sce.com",
    password: "hellooo"
  }
  constructor() {


  }

  ngOnInit() {

  }

  onHandleLogin(loginForm: NgForm, submit){
    console.log(loginForm.value.email, loginForm.value.password, submit)
    console.log("val", this.val)
  }

  onEmailChange(event){
    console.log(event)
  }

}
