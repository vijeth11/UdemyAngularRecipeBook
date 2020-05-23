import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
@Component({
    selector:'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
    
    private userSub:Subscription;
    public collapsed:boolean = true;
    isAuthenticated:boolean = false;
    // @Output() featureSelected:EventEmitter<String>=new EventEmitter<String>();
    // onSelect(feature:string){
    //     this.featureSelected.emit(feature);
    // }

    constructor(private dataService:DataStorageService,private authService:AuthService, private store:Store<fromApp.AppState>){}

    ngOnInit(){
        this.userSub = this.store.select('auth').pipe(map(authState => {
            return authState.user;
        })).subscribe(user =>{
            this.isAuthenticated = !!user;
        });
    }

    onSaveData(){
        this.dataService.storedRecipes();
    }

    onFetchData(){
        this.dataService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
     }
 
}