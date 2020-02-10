import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
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
    isLoading = false;
    error:string=null;
    authObs:Observable<AuthResponseData>;

    constructor(private authService:AuthService){}
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form:NgForm){
        this.passwordValid = form.controls.password.valid;
        this.emailValid = form.controls.Email.valid;
        this.error = null;
        if(this.passwordValid && this.emailValid){
            const email = form.value.Email;
            const password = form.value.password;
            this.isLoading = true;
            if(this.isLoginMode){
                this.authObs = this.authService.login(email,password);
            }else{
                this.authObs = this.authService.signup(email,password);
            }
            this.authObs.subscribe(
                resData => {
                    //console.log(resData);
                    this.isLoading = false;
                    if(!this.isLoginMode){
                        this.onSwitchMode();
                    }
                },
                errorMessage => {
                    //console.log(errorMessage);                        
                    this.error = errorMessage;
                    this.isLoading = false;
                }
            )
            form.reset();
        }else{
            return;
        }
    }
    setEmailId(){
        console.log("Email focused");
    }
}