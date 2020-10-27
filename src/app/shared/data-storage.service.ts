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
        this.logService.logInBold('DataStorageService.storeRecipes()', 'black');
        console.log(response);
      })
  }

  fetchRecipes(){
    return this.authService.user
      .pipe(
        take(1), // take only 1 value from an observable, then unsubscribe
        exhaustMap((user: SimpleUser) => {  // used to return an http get<> observable instead of a user one
          return this.http.get<Recipe[]>(
            this.url,
            {
              params: new HttpParams().set('auth', user.token)
            }
          )          
        }),
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
