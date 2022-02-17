import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map, distinctUntilChanged} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    public isLoggedIn$:Observable<boolean>;
    public isLoggedOut$:Observable<boolean>;

    constructor(private router: Router, private store:Store<AppState>) {

    }

    ngOnInit() {

      /*this.isLoggedIn$ = this.store.pipe(
        map(state => !!state['auth'].user),
        // this stops multiple time trigger of isLoggedIn observable in html 
        //whenever store value changes instead it fires only when above map value changes
        // this has been taken care in select of ngrx
      distinctUntilChanged());
      */
      const userProfile = localStorage.getItem('user');
      if(userProfile){
        this.store.dispatch(login({user: JSON.parse(userProfile)}));
      }
      this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
      this.isLoggedOut$ = this.store.pipe(select(isLoggedOut));
      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

    }

    logout() {
        this.store.dispatch(logout());
    }

}
