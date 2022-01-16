import { RouterExtensions } from '@nativescript/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { alert } from '@nativescript/core';
import { User } from './user.model';
import { setString, getString, hasKey, remove } from '@nativescript/core/application-settings';

const FIREBASE_API_KEY= "AIzaSyC0WZL_GW5W_4B_2ykckJFAHqRfrngPxo0";

interface AuthResponseData{
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService {

    private _user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer:any;

    constructor(private http:HttpClient, private router:RouterExtensions){}

    get User(){
        return this._user.asObservable();
    }

    signUp(email:string, password:string):Observable<AuthResponseData>{
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
        {
            email:email,
            password:password,
            returnSecureToken:true    
        }).pipe(
        catchError(errorRes => {
            this.handleError(errorRes.error.error.message);
            return throwError(errorRes);
        }),
        tap(resData => {
            this.handleLogin(email,resData);
        }));
    }

    login(email:string, password:string):Observable<AuthResponseData>{
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
        {
            email:email,
            password:password,
            returnSecureToken:true 
        }).pipe(
        catchError(errorRes => {
            this.handleError(errorRes.error.error.message);
            return throwError(errorRes);
        }),
        tap(resData => {
            this.handleLogin(email,resData);
        }));
    }

    logout(){
        this._user.next(null);
        remove('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.router.navigate(['/'],{clearHistory: true});
    }

    // Store data in the Application settings which are needed by the application when it restarts.
    // Even after the application is closed by user and when it is re-opened we can get data from the 
    // application settings via hasKey, getString, setString, remove methods provided by nativescript
    // It stores data as key value pair and in string format
    // Do not use it to store blob data or large database data for that refer to documentation.
    autoLogin(){
        if(!hasKey('userData')){
            return of(false);
        }
        const userData: {email:string; id:string; _token:string; _tokenExpirationDate: string } = JSON.parse(getString('userData'));
        const user = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(user.isAuth){
            this._user.next(user);
            this.autoLogout(user.timeToExpiry);
            this.router.navigate(['/challenges'], {clearHistory: true});
            return of(true);
        }
        return of(false);
    }

    autoLogout(expiryDuration){
        this.tokenExpirationTimer = setTimeout(this.logout.bind(this), expiryDuration)
    }

    private handleLogin(email,resData:AuthResponseData ){
        if(resData && resData.idToken){
            const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
            const user = new User(email, resData.localId, resData.idToken, expirationDate);
            setString("userData",JSON.stringify(user));
            this.autoLogout(user.timeToExpiry);
            this._user.next(user);
        }
    }

    private handleError(errorMessage:string){
        switch(errorMessage){
            case 'EMAIL_EXISTS':
                alert("This email address exists already!");
                break;
            case 'INVALID_PASSWORD':
                alert("Your password is incorrect!");
                break;
            default:
                alert("Authentication failed, check your credentials");
        }
    }
}