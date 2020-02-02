import { Ingredients } from './ingredients.model';
import { map, tap } from 'rxjs/operators';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,private recipeService:RecipeService) {

   }

   storedRecipes(){
    const recipes= this.recipeService.getRecipes();
    this.http.put("https://angularcourserecipebook.firebaseio.com/recipes.json",recipes)
    .subscribe(Response => {
      console.log(Response);
    });
   }

   fetchRecipes()
   {
     return this.http.get<Recipe[]>("https://angularcourserecipebook.firebaseio.com/recipes.json")
     .pipe(map(recipes=> {
       return recipes.map(recipe => {
        return {...recipe,ingredients:recipe.ingredients ? recipe.ingredients:[]}
       });
     }),
     tap(recipes=> {
      this.recipeService.setRecipes(recipes);
     }));
   }
}
