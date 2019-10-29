import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  //@Output() recipeSelected:EventEmitter<void> = new EventEmitter<void>(); used to communicate from recipe item to list and component
  constructor(private recipeService:RecipeService) { }
  @Input() recipe:Recipe;
  ngOnInit() {
  }
  selectedRecipe()
  {
    //this.recipeSelected.emit();
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
