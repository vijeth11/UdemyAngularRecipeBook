import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class UIService{
    private drawer_state = new BehaviorSubject<boolean>(false);
    private current_drawer_state:boolean = false;
    private _rootVcRef:ViewContainerRef;
    
    get drawerState(){
        return this.drawer_state.asObservable();
    }
    
    get rootVcRef(){
        return this._rootVcRef;
    }

    toggleDrawer(){
        this.current_drawer_state = !this.current_drawer_state;
        this.drawer_state.next(this.current_drawer_state);
    }

    setRootVCRef(rootVcRef:ViewContainerRef){
        this._rootVcRef = rootVcRef;
    }
}