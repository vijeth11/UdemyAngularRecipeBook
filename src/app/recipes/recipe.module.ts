import { RecipeRoutingModule } from './recipe-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipestartComponent } from "./recipestart/recipestart.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";

@NgModule({
    declarations:[
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipestartComponent,
    RecipeEditComponent
    ],
    imports:[
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        RecipeRoutingModule
    ],
    exports:[
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipestartComponent,
        RecipeEditComponent]
})
export class RecipeModule{}