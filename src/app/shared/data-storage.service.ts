import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoggingService } from '../logging.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  private url = 'https://angular-complete-guide-4167f.firebaseio.com/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private logService: LoggingService
  ) { }

  storeRecipes(){
    this.http
      .put<{name:string}>( // to replace existing recipes with these ones, instead of appending them
        this.url, 
        this.recipeService.getRecipes()
      )
      .subscribe(response => {
        this.logService.logInBold('DataStorageService.storeRecipes()', 'black')
        console.log(response)
      })
  }
}