import * as fromApp from '../store/app.reducer';
import { Ingredients } from './../shared/ingredients.model';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Injectable,EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as shoppingListAction from '../shopping-list/store/shopping-list.actions';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected:EventEmitter<Recipe> = new EventEmitter<Recipe>();
  recipesChanged:Subject<Recipe[]> = new Subject<Recipe[]>()
  // private recipes:Recipe[]=[
  //   new Recipe('Tasty Schnitzel',
  //   'A super-tasty Schnitzel - just awsome!',
  //   'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //   [
  //     new Ingredients('Meat',1),
  //     new Ingredients('French Fries',20)
  //   ]),
  //   new Recipe('Big Fat Burger',
  //   'What else you need to say?',
  //   'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //   [
  //     new Ingredients('Buns',2),
  //     new Ingredients('Meat',1)
  //   ]),

  // ];

  private recipes:Recipe[]=[];
  constructor(
    private shopingListService:ShoppingListService,
    private store:Store<fromApp.AppState>) { }
  getRecipes(){
    return this.recipes.slice();
  }
  getRecipeById(id:number){
    return this.recipes.slice()[id];
  }
  addIngredientsToShoppingList(ingredients:Ingredients[]){
    //this.shopingListService.addIngredients(ingredients);
    this.store.dispatch(new shoppingListAction.AddIngredients(ingredients));
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,recipe:Recipe){
    this.recipes[index]=recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes:Recipe[]){
    this.recipes= recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
