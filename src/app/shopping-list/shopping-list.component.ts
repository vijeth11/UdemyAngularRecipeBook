import { Component, OnInit } from '@angular/core';
import {Ingredients} from '../shared/ingredients.model'
import { from } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredients[];
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.newIngredientChanged.subscribe((newIngredients:Ingredients[])=>{
      this.ingredients= newIngredients;
    });
  }

}
