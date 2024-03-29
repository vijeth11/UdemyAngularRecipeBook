import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './action-types';

@Injectable()
export class AuthEffect{


    login$ =  createEffect(() => this.action$.pipe(
        ofType(AuthActions.login),
        tap( action => {
            localStorage.setItem('user',JSON.stringify(action.user));
        })
    ), {dispatch:false}); // dispatch should be set to false 
    //if there is no action to be returned after side effect call

    logout$ = createEffect(() => this.action$.pipe(
        ofType(AuthActions.logout),
        tap(action => {
            localStorage.removeItem('user');
            this.router.navigateByUrl('/login');
        })
    ), {dispatch:false})
    
    constructor(private action$: Actions, private router:Router){
            
    }

}