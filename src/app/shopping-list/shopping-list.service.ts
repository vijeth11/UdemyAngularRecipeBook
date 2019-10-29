import { Injectable, EventEmitter } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  newIngredientChanged:EventEmitter<Ingredients[]> = new EventEmitter<Ingredients[]>();
  private ingredients:Ingredients[] =[
    new Ingredients('Apples',5),
    new Ingredients('Tomatoes',10),
  ];
  constructor() { }
  getIngredients(){
    return this.ingredients.slice();
  }
  addIngredient(ingredient:Ingredients)
  {
    this.ingredients.push(ingredient);
    this.newIngredientChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredients[]){
    var hasValues = false;
    ingredients.forEach((items)=>{
     hasValues = hasValues || this.ingredients.includes(items);
    });
    if(!hasValues){
    this.ingredients.push(...ingredients);
    }
  }
}
