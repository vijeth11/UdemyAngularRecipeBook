import { Injectable, EventEmitter } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  newIngredientChanged:Subject<Ingredients[]> = new Subject<Ingredients[]>();
  startedEditing:Subject<number>=new Subject<number>();
  private ingredients:Ingredients[] =[
    new Ingredients('Apples',5),
    new Ingredients('Tomatoes',10),
  ];
  constructor() { }
  getIngredient(index:number):Ingredients{
    return this.ingredients[index];
  }
  getIngredients(){
    return this.ingredients.slice();
  }
  addIngredient(ingredient:Ingredients)
  {
    this.ingredients.push(ingredient);
    this.newIngredientChanged.next(this.ingredients.slice());
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

  updateIngredient(index: number,newIngredient:Ingredients){
    this.ingredients[index] = newIngredient;
    this.newIngredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.newIngredientChanged.next(this.ingredients.slice());
  }
}
