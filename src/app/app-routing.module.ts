import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipestartComponent } from './recipes/recipestart/recipestart.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

const appRoutes:Routes =[
    {path:'recipes', component: RecipesComponent,children:[
        {path:'new',component:RecipeEditComponent},
        {path:':id',component:RecipeDetailComponent},
        {path:':id/edit',component:RecipeEditComponent},
        {path:'',component:RecipestartComponent,pathMatch:"full"}
    ]},
    {path:'shopping-list',component:ShoppingListComponent},
    {path:'',redirectTo:'/recipes',pathMatch:"full"},
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{
 
}