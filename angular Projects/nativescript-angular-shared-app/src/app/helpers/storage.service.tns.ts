import { Injectable } from '@angular/core';
import { setString, getString, hasKey, remove } from '@nativescript/core/application-settings';

@Injectable({providedIn:'root'})
export class StorageService{

    setString(key:string, value:string){
        setString(key, value);
    }

    hasKey(key:string){
        return hasKey(key);
    }

    getString(key: string){
        return getString(key);
    }

    remove(key:string){
        remove(key);
    }
}