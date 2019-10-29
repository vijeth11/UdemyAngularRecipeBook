import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[];

  //@Output() recipeWasSelected:EventEmitter<Recipe>=new EventEmitter<Recipe>();
  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }
  /*selectedRecipe(recipe:Recipe){ used to send data from item to recipe component before service implementation
   //this.recipeWasSelected.emit(recipe);
  }*/
}
