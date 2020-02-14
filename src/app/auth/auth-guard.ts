import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,private router:Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean|UrlTree|Promise<boolean|UrlTree>|Observable<boolean|UrlTree>{
        return this.authService.user.pipe(
            take(1),
            map(userData => {
            const isAuth = !!userData;
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}