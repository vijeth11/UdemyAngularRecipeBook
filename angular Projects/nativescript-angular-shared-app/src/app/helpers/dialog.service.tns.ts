import { Injectable } from '@angular/core';
import { alert } from '@nativescript/core';

@Injectable({providedIn:'root'})
export class DialogService{
    alert(message:string){
        alert(message);
    }
}