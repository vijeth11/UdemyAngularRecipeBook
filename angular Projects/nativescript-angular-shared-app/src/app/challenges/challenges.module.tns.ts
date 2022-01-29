import { ChallengeActionsModule } from './challenge-actions/challenge-actions.module';
import { SharedModule } from './../shared/ui/shared.module';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component';
import { ChallengeAddedComponent } from './challenge-added/challenge-added.component';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { NgModule } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptCommonModule } from '@nativescript/angular';
import { TodayComponent } from './today/today.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


@NgModule({
    declarations:[
        ChallengeAddedComponent,
        ChallengeTabsComponent,
        CurrentChallengeComponent,
        TodayComponent,
    ],
    imports:[
        ChallengesRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        SharedModule,
        ChallengeActionsModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ChallengesModule{

}