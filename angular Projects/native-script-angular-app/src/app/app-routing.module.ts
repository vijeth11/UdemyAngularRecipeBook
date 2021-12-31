import { TodayComponent } from './challenges/today/today.component';
import { AuthComponent } from './auth/auth.component';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {path:'',component: AuthComponent},
    {path:'today', component: TodayComponent},
]
@NgModule({
    imports:[NativeScriptRouterModule.forRoot(routes)],
    exports:[NativeScriptRouterModule]
})
export class AppRoutingModule{}