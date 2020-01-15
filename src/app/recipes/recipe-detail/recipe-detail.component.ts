import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.routeSubscribe.unsubscribe();
  }

  //@Input() recipe:Recipe;
  recipe:Recipe;
  routeSubscribe:Subscription;
  id:number;
  constructor(private recipeService:RecipeService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
     this.routeSubscribe = this.route.params.subscribe((param:Params)=>{
       this.id = +param['id'];
       this.recipe = this.recipeService.getRecipeById(this.id);
     })
  }
  
  onAddToShoppingList()
  {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe()
  {
    this.router.navigate(['edit'],{relativeTo:this.route});
    //this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route});
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
