import { AuthService } from './auth/auth.service';
import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable, switchMap, take, of, tap } from 'rxjs';

@Injectable()
export class AuthGaurd implements CanLoad{
    constructor(
        private authService:AuthService,
        private router:Router
    ){}
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       return this.authService.User.pipe(
           take(1),
           switchMap(currentUser => {
               if(!currentUser || !currentUser.token){
                   return this.authService.autoLogin();
               }
               return of(true);
           }),
           tap(isAuth => {
               if(!isAuth){
                   this.router.navigate(['/auth']);
               }
           })
       )
    }

    
}