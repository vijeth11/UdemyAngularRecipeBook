import { PlaceHolderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertCompoenet } from './../shared/alert/alert.component';
import { Observable, Subscription } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { Component, ViewEncapsulation, ComponentFactoryResolver, ViewChild, OnDestroy } from "@angular/core";
import { Form, NgForm } from "@angular/forms";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    styleUrls:['./auth.component.css']
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    passwordValid:boolean=true;
    emailValid:boolean=true;
    isLoading = false;
    error:string=null;
    authObs:Observable<AuthResponseData>;
    closeObserv:Subscription;
    @ViewChild(PlaceHolderDirective,{static:false}) alertHost:PlaceHolderDirective;

    constructor(private authService:AuthService, private componentFactoryResolver:ComponentFactoryResolver){}
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
                    this.showErrorMessage(errorMessage);
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

    onHandleError(){
        this.error = null;
    }

    ngOnDestroy(){
        if(this.closeObserv){
        this.closeObserv.unsubscribe();
        }
    }
    showErrorMessage(message:string){
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertCompoenet);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const alertcomponentInstance = hostViewContainerRef.createComponent(componentFactory).instance;
        alertcomponentInstance.message = message;
        this.closeObserv =  alertcomponentInstance.close.subscribe(()=>{
           this.closeObserv.unsubscribe(); 
           hostViewContainerRef.clear();
        });
    }
}