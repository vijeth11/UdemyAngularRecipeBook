import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('f',{static:true}) signupForm: NgForm;
  subscribe:string="Advanced";
  submitted:boolean=false;
  userData:{email:string,subscription:string,password:string}={
    email:'',
    subscription:'',
    password:''
  };

  onSubmit(){
    console.log(this.signupForm);
    this.userData.email = this.signupForm.value.email;
    this.userData.subscription = this.signupForm.value.secret;
    this.userData.password = this.signupForm.value.password;
    console.log(this.userData);
    this.submitted=true;
    this.signupForm.reset();
  }
}
