import { DayModalComponent } from './day-modal/day-modal.component';
import { SharedModule } from './../shared/ui/shared.module';
import { ChallengeActionsModule } from './challenge-actions/challenge-actions.module';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { ChallengeAddedComponent } from './challenge-added/challenge-added.component';
import { ChallengesRoutingModule } from './challenges-routing.module';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TodayComponent } from './today/today.component';
import { BackdropComponent } from './day-modal/backdrop.component';


@NgModule({
    declarations:[
        ChallengeAddedComponent,
        CurrentChallengeComponent,
        TodayComponent,
        DayModalComponent,
        BackdropComponent,
    ],
    imports:[
        ChallengesRoutingModule,
        ChallengeActionsModule,
        ReactiveFormsModule,
        BrowserModule,
        SharedModule
    ]
})
export class ChallengesModule{

}