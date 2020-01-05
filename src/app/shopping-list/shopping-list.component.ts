import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredients} from '../shared/ingredients.model'
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients:Ingredients[];
  private subscription:Subscription;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.newIngredientChanged.subscribe((newIngredients:Ingredients[])=>{
      this.ingredients= newIngredients;
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }
}
