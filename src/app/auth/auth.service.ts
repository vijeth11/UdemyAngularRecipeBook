import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';


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

constructor(private http:HttpClient) {}

signup(email:string,password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAU7v4JeOoxNZCTgAY1hKUNHMQ_3AdJ9Yc",{
        email:email,
        password:password,
        returnSecureToken:true
    }
    ).pipe(catchError(errorRes =>{
        let errorMessage = 'An Unknown error occurred';
        if(!errorRes.error || !errorRes.error.error ){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
               errorMessage = "email already exists";
        }
        return throwError(errorMessage);
    }));
}

login(email:string,password:string){
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAU7v4JeOoxNZCTgAY1hKUNHMQ_3AdJ9Yc",{
        email:email,
        password:password,
        returnSecureToken:true
    });
}
}