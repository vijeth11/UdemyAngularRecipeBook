import { AuthGaurd } from './../auth.gaurd';
//import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { ChallengeAddedComponent } from './challenge-added/challenge-added.component';
import { TodayComponent } from './today/today.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';

const routes:Routes = [
    {path:'today', component: TodayComponent, canActivate:[AuthGaurd]},
    {path:'current-challenge',component: CurrentChallengeComponent, canActivate:[AuthGaurd]},
    {path:':mode', component: ChallengeAddedComponent,canActivate:[AuthGaurd]},
    {path:'', redirectTo: '/challenges/today', pathMatch:'full'}
];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    providers:[AuthGaurd],
    exports:[RouterModule]
})
export class ChallengesRoutingModule{}