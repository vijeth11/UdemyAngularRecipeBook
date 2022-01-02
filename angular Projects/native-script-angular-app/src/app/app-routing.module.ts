import { AuthComponent } from './auth/auth.component';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {path:'',component: AuthComponent},   
    {path:'challenges', loadChildren: () => import('./challenges/challenges.module').then(c => c.ChallengesModule)},
    
]
@NgModule({
    imports:[NativeScriptRouterModule.forRoot(routes)],
    exports:[NativeScriptRouterModule]
})
export class AppRoutingModule{}