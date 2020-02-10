import { Ingredients } from './ingredients.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private https:HttpClient,private recipeService:RecipeService,private authService:AuthService) {

   }

   storedRecipes(){
    const recipes= this.recipeService.getRecipes();
    this.https.put("https://angularcourserecipebook.firebaseio.com/recipes.json",recipes)
    .subscribe(Response => {
      console.log(Response);
    });
   }

   fetchRecipes()
   {
     // take operator tells angular to take 1 object from behavioursubject and then unsubscribe
     // exhaustMap will return the subscriber whcih is called inside it after executing previous subscriber

     return this.authService.user.pipe(take(1),exhaustMap( user => {
      return this.https.get<Recipe[]>("https://angularcourserecipebook.firebaseio.com/recipes.json",{
        params: new HttpParams().set('auth',user.token)
      });
     }),map(recipes=> {
      return recipes.map(recipe => {
       return {...recipe,ingredients:recipe.ingredients ? recipe.ingredients:[]}
      });
    }),
    tap(recipes=> {
     this.recipeService.setRecipes(recipes);
    }));
   }
}
