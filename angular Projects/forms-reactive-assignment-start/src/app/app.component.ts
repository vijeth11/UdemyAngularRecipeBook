import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  statusOptions=['Stable', 'Critical', 'Finished'];
  signupForm:FormGroup;

  ngOnInit(){
    this.signupForm = new FormGroup({
      'projectName':new FormControl(null,[Validators.required,this.forbiddenProjectName.bind(this)]),
      'email':new FormControl(null,[Validators.required,Validators.email],this.forbiddenEmail),
      'projectStatus':new FormControl(null)
    });
    this.signupForm.patchValue({
      'projectStatus':this.statusOptions[0]
    });
  }

  onSubmit(){
    console.log(this.signupForm);
  }

  forbiddenProjectName(controll:FormControl):{[s:string]:boolean}{
    if(controll.value==='Test'){
      return {'projectNameForbidden':true};
    }
    return null;
  }

  forbiddenEmail(controll:FormControl):Promise<any> | Observable<any>{
    const promise = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        if(controll.value==="test@test"){
          resolve({'emailIsForbidden':true});
        }else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}
