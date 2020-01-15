import { Observable } from 'rxjs';
import { Injectable, Component } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanComponentDeactivate{
  canDeactivate: ()=> Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate>{

  constructor() { }

  canDeactivate(component:CanComponentDeactivate,
                currentRoute:ActivatedRouteSnapshot,
                currentState:RouterStateSnapshot,
                nextStage?:RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean
  {
    return component.canDeactivate();
  }
}
