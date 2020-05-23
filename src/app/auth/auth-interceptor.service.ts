import { Params } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';
import { exhaustMap, take, map } from 'rxjs/operators';
import {Store} from '@ngrx/store'
import * as fromApp from '../store/app.reducer';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

    constructor(private authService:AuthService,private store:Store<fromApp.AppState>){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.store.select('auth').pipe(take(1),map(authState => {return authState.user;}),exhaustMap(user => {
            //Below header is to bypass CORS policy
            const modifiedReq = req.clone({params:new HttpParams().set('Access-Control-Allow-Origin','*')});
            if(!user){
                return next.handle(modifiedReq);
            }
            const modifiedReq1 = modifiedReq.clone({params:new HttpParams().set('auth',user.token)});
            return next.handle(modifiedReq1);
        }));
        
    } 
    
}