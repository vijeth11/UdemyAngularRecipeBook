import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f',{static:true}) signupForm: NgForm;
  defaultQuestion="pet";
  answer:string;
  genders = ['male','female'];
  user={
    username:'',
    email:'',
    secretQuestion:'',
    answer:'',
    gender:''
  }
  submited:boolean=false;
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData:{
    //     username:suggestedName,
    //     email:''
    //   },
    //   secret:'pet',
    //   questionAnswer:'',
    //   gender:'male'
    // });
    this.signupForm.form.patchValue({
      userData:{
        username:suggestedName
      }
    });
  }

  /*onSubmit(form:HTMLFormElement){ you can use this if you are accessing form by placeholder 
    console.log(form);
  }*/

  /*onSubmit(form:NgForm){
    console.log(form);
  }*/
  onSubmit(){
    this.submited = true;
    console.log(this.signupForm);
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.answer;
    this.user.gender = this.signupForm.value.gender;
    this.signupForm.reset();
  }
}
