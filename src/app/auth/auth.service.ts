import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import {environment} from '../../environments/environment';

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    register?:boolean;
}
@Injectable({
    providedIn:'root'
})
export class AuthService{

user = new BehaviorSubject<User>(null);
tokenExpirationTimer:any;
constructor(private http:HttpClient,private router:Router) {}

signup(email:string,password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseAPIKey,{
        email:email,
        password:password,
        returnSecureToken:true
    }
    ).pipe(catchError(this.handleError),tap(resData => {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    }));
}

login(email:string,password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseAPIKey,{
        email:email,
        password:password,
        returnSecureToken:true
    }).pipe(catchError(this.handleError),tap(resData => {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    }));
}

autoLogin(){
    const userData:{email:string,id:string,_token:string,_tokenExpirationDate:string} = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
        return;
    }
    
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
        this.user.next(loadedUser);
        const autoExpirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogOut(autoExpirationDate);
    }
    
}
logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    if(this.tokenExpirationTimer){
        clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
}

autoLogOut(expirationDate:number) {
    this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
    },expirationDate)
}
private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate =  new Date(new Date().getTime() + +expiresIn * 1000);
        const user =  new User(email,userId,token,expirationDate);
        this.user.next(user);
        this.autoLogOut(expiresIn * 1000);
        localStorage.setItem('userData',JSON.stringify(user));
        this.router.navigate(['/recipes']);
}
private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An Unknown error occurred';
        if(!errorRes.error || !errorRes.error.error ){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
               errorMessage = "email already exists";
               break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email does not exist";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "The password not exists";
                break;
        }
        return throwError(errorMessage);
}
}