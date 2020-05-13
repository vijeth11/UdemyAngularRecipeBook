import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from "@angular/core";

const appRoutes:Routes =[
    {path:'auth',component:AuthComponent},
    {path:'recipes',loadChildren:'./recipes/recipe.module#RecipeModule'},
    // modern version {path:'recipes',loadChildren:()=>import('./recipes/recipe.module').then(m => m.RecipeModule)},
    {path:'shopping-list',loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'},
    {path:'',redirectTo:'/recipes',pathMatch:"full"},
    
];
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes,{preloadingStrategy : PreloadAllModules})// does lazy loading but it will try to load all modules at a time in the background
                                                                                // while user can browse the page rather than delaying to load when user enters that module
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{
 
}