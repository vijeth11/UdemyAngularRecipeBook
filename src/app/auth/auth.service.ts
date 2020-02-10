import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';


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
constructor(private http:HttpClient,private router:Router) {}

signup(email:string,password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAU7v4JeOoxNZCTgAY1hKUNHMQ_3AdJ9Yc",{
        email:email,
        password:password,
        returnSecureToken:true
    }
    ).pipe(catchError(this.handleError),tap(resData => {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    }));
}

login(email:string,password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAU7v4JeOoxNZCTgAY1hKUNHMQ_3AdJ9Yc",{
        email:email,
        password:password,
        returnSecureToken:true
    }).pipe(catchError(this.handleError),tap(resData => {
        this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    }));
}

private handleAuthentication(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate =  new Date(new Date().getTime() + +expiresIn * 1000);
        const user =  new User(email,userId,token,expirationDate);
        this.user.next(user);
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