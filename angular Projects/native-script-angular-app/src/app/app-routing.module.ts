import { ChallengeTabsComponent } from './challenges/challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from './challenges/current-challenge/current-challenge.component';
import { ChallengeAddedComponent } from './challenges/challenge-added/challenge-added.component';
import { TodayComponent } from './challenges/today/today.component';
import { AuthComponent } from './auth/auth.component';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {path:'',component: AuthComponent},   
    {path:'challenges', component:ChallengeTabsComponent,
    children:[
        // outlet should be equal to value given in name attriburte of router-outlet tag
        {path:'today', component: TodayComponent, outlet:'today'},
        {path:'current-challenge',component: CurrentChallengeComponent, outlet:'currentChallenge'},
    ]},
    {path:'edit-challenge', component: ChallengeAddedComponent},
]
@NgModule({
    imports:[NativeScriptRouterModule.forRoot(routes)],
    exports:[NativeScriptRouterModule]
})
export class AppRoutingModule{}