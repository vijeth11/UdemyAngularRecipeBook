import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm:FormGroup;
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }
  forbiddenUserNames = ['Chris','Anna'];


  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData':new FormGroup({
        "username": new FormControl(null, [Validators.required,this.forbiddenNames.bind(this)]),
      "email": new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmails)
      }),      
      "gender": new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.signupForm.valueChanges.subscribe(res=>{
      console.log("value changes");
      console.log(res);
    });

    this.signupForm.statusChanges.subscribe(res=>{
      console.log("status change");
      console.log(res);
    });

    this.signupForm.setValue({
      'userData':{
        'username':'vijeth',
        'email':'vijeth@test.com'
      },
      'gender':'male',
      'hobbies':[]
    });

    this.signupForm.patchValue({
      'userData':{
        'username':'Anna',
      }
    })
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby(){
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required));
  }

  forbiddenNames(control:FormControl):{[s:string]:boolean}{
    if(this.forbiddenUserNames.indexOf(control.value) != -1){
      return {'nameIsForbidden':true};
    }
    return null;
  }

  forbiddenEmails(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='test@test.com'){
          resolve({'emailIsForbidden':true})
        }else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}
