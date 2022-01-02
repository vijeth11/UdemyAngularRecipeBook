import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { ChallengeAddedComponent } from './challenge-added/challenge-added.component';
import { TodayComponent } from './today/today.component';

import { NativeScriptRouterModule } from '@nativescript/angular';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

const routes:Routes = [
    { path:'tabs',component:ChallengeTabsComponent,
        children:[
            // outlet should be equal to value given in name attriburte of router-outlet tag
            {path:'today', component: TodayComponent, outlet:'today'},
            {path:'current-challenge',component: CurrentChallengeComponent, outlet:'currentChallenge'},
        ]},
        {path:':mode', component: ChallengeAddedComponent},
        {path:'', redirectTo: '/challenges/tabs', pathMatch:'full'}
];
@NgModule({
    imports:[NativeScriptRouterModule.forChild(routes)],
    exports:[NativeScriptRouterModule]
})
export class ChallengesRoutingModule{}