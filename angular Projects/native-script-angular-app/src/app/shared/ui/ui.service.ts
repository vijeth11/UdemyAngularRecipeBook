import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class UIService{
    private drawer_state = new BehaviorSubject<boolean>(false);
    private current_drawer_state:boolean = false;

    get drawerState(){
        return this.drawer_state.asObservable();
    }

    toggleDrawer(){
        this.current_drawer_state = !this.current_drawer_state;
        this.drawer_state.next(this.current_drawer_state);
    }
}