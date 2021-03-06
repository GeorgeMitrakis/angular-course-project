import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggingService } from '../logging.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

import { exhaust, exhaustMap, map, take, tap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';
import { SimpleUser, User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private url = 'https://angular-complete-guide-4167f.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private logService: LoggingService,
    private authService: AuthService
  ) { }

  storeRecipes(){
    this.http
      .put<{name:string}>( // to replace existing recipes with these ones, instead of appending them
        this.url, 
        this.recipeService.getRecipes()
      )
      .subscribe(response => {
        this.logService.log('DataStorageService.storeRecipes()', 'black', 'bold');
        console.log(response);
      })
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>(
      this.url
    )
    .pipe(
      map(recipes => {  // rxjs map
        return recipes.map(recipe => {  // array map
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: [] }
        })
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }
}
