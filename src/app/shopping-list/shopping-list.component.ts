import * as shoppingListAction from "./store/shopping-list.actions";
import { Ingredients } from './../shared/ingredients.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  //ingredients:Ingredients[];
  ingredients:Observable<{ingredients:Ingredients[]}>;
  private subscription:Subscription;
  constructor(
    private shoppingListService:ShoppingListService,
    private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    /*this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.newIngredientChanged.subscribe((newIngredients:Ingredients[])=>{
      this.ingredients= newIngredients;
    });*/
  }
  ngOnDestroy(){
    //this.subscription.unsubscribe();
  }
  onEditItem(index:number){
    this.store.dispatch(new shoppingListAction.StartEdit(index));
    //this.shoppingListService.startedEditing.next(index);
  }
}
