import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { TextField } from '@nativescript/core/ui/text-field';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit{

  @ViewChild('passwordEl',{static:true}) password:ElementRef<TextField>;
  @ViewChild('emailEl',{static:true}) email:ElementRef<TextField>;
   public form:FormGroup;
   public emailControlIsValid:boolean = true;
   public passwordControlIsValid:boolean = true;
   public isLogin:boolean = true;

   constructor(private router:RouterExtensions){

   }

   ngOnInit(){
     this.form = new FormGroup({
       email: new FormControl(null, {updateOn: 'blur', validators: [Validators.required, Validators.email]}),
       password: new FormControl(null,{updateOn:'blur',validators:[Validators.required,Validators.minLength(6)]}) 
     })

     this.form.get('email').statusChanges.subscribe(status => {
       this.emailControlIsValid = status === 'VALID';
     });

     this.form.get('password').statusChanges.subscribe(status => {
       this.passwordControlIsValid = status === 'VALID';
     })
   }

   onSignIn(){
     this.onDone();

    if(!this.form.valid){
      return;
    }
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    this.form.reset(); 
    console.log(email+" "+password);
    if(this.isLogin){
      console.log("Logging In");
    }else{
      console.log("SignUp");
    }
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
    this.router.navigate(['/challenges'], { clearHistory: true });     
   }

   onDone(){
     this.email.nativeElement.focus();
     this.password.nativeElement.focus();
     this.password.nativeElement.dismissSoftInput();
   }

   onSwitch(){
     this.isLogin = !this.isLogin;
   }
}
