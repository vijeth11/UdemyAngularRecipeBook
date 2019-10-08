import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[]=[
    new Recipe('A test Recipe','this is a test recipe','http://www.alaskafit.com/wp-content/uploads/2017/02/Recipes-Banner-300x169.jpg'),
    new Recipe('Another test Recipe','this is another test recipe','http://www.alaskafit.com/wp-content/uploads/2017/02/Recipes-Banner-300x169.jpg'),

  ];

  @Output() recipeWasSelected:EventEmitter<Recipe>=new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }
  selectedRecipe(recipe:Recipe){
   this.recipeWasSelected.emit(recipe);
  }
}
