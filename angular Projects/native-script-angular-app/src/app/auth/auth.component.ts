import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { TextField } from '@nativescript/core/ui/text-field';
import { AuthService } from './auth.service';
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
   public isLoading:boolean = false;

   constructor(private router:RouterExtensions,private authService:AuthService){

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
    this.isLoading=true;
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;
    console.log(email+" "+password);
    if(this.isLogin){
      this.authService.login(email,password).subscribe(resData => {
        this.form.reset(); 
        this.isLoading=false;
        this.navigateToChallenge();
      },
      (err)=>{
        this.isLoading = false;
        console.log(err);
      });
    }else{
      this.authService.signUp(email,password).subscribe(resData => {
        this.form.reset(); 
        this.isLoading=false;
        this.navigateToChallenge();
      },
      (err)=>{
        this.isLoading = false;
        console.log(err);
      });
    }
    
   }

   onDone(){
     this.email.nativeElement.focus();
     this.password.nativeElement.focus();
     this.password.nativeElement.dismissSoftInput();
   }

   onSwitch(){
     this.isLogin = !this.isLogin;
   }

   private navigateToChallenge(){
    this.emailControlIsValid = true;
    this.passwordControlIsValid = true;
    this.router.navigate(['/challenges'], { clearHistory: true });     
   }
}
