import { Component, ViewEncapsulation } from "@angular/core";
import { Form, NgForm } from "@angular/forms";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    styleUrls:['./auth.component.css']
})
export class AuthComponent {
    isLoginMode = true;
    passwordValid:boolean=true;
    emailValid:boolean=true;
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form:NgForm){
        this.passwordValid = form.controls.password.valid;
        this.emailValid = form.controls.Email.valid;
        if(this.passwordValid && this.emailValid){
            console.log(form.value);
            form.reset();
        }
    }
    setEmailId(){
        console.log("Email focused");
    }
}