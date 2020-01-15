import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  loggedIn = false;
  isAuthenticate(){
    const promise = new Promise(
      (resolve,reject)=>{
        setTimeout(()=>{
          resolve(this.loggedIn);
        },800);
      });
    return promise;
  }

  login(){
    this.loggedIn =true;
  }

  logout(){
    this.loggedIn=false;
  }
  constructor() { }
}
