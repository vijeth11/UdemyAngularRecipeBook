import { Injectable,EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected:EventEmitter<Recipe> = new EventEmitter<Recipe>();
  private recipes:Recipe[]=[
    new Recipe('Tasty Schnitzel',
    'A super-tasty Schnitzel - just awsome!',
    'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    [
      new Ingredients('Meat',1),
      new Ingredients('French Fries',20)
    ]),
    new Recipe('Big Fat Burger',
    'What else you need to say?',
    'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    [
      new Ingredients('Buns',2),
      new Ingredients('Meat',1)
    ]),

  ];
  constructor(private shopingListService:ShoppingListService) { }
  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients:Ingredients[]){
    this.shopingListService.addIngredients(ingredients);
  }
}
