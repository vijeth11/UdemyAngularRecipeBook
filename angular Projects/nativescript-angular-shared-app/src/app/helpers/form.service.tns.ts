import { Injectable } from '@angular/core';
import { TextField } from '@nativescript/core/ui/text-field';

@Injectable({providedIn:'root'})
export class FormService{
    dismiss(inputFields:TextField[]){
        inputFields.forEach(inf => inf.focus());
        inputFields[inputFields.length -1 ].dismissSoftInput();
    }
}