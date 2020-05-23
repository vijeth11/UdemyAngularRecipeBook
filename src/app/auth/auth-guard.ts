import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router,private store:Store<fromApp.AppState>){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean|UrlTree|Promise<boolean|UrlTree>|Observable<boolean|UrlTree>{
        return this.store.select('auth').pipe(
            take(1),
            map(authState => {
                return authState.user;
            }),
            map(userData => {
            const isAuth = !!userData;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}