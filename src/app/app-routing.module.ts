import { AuthComponent } from './auth/auth.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipestartComponent } from './recipes/recipestart/recipestart.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthGuard } from './auth/auth-guard';

const appRoutes:Routes =[
    {path:'auth',component:AuthComponent},
    {path:'',redirectTo:'/recipes',pathMatch:"full"},
    
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
 
}