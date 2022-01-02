import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ActionBarComponent } from './action-bar/action-bar.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
    imports:[
        NativeScriptCommonModule,
        NativeScriptRouterModule
    ],
    declarations:[ActionBarComponent],
    exports:[ActionBarComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule{}