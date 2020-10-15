import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel', 
      'A super-tasty Schnitzel - just awesome!', 
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),

    new Recipe(
      'Big Fat Burger', 
      'What else you need to say?', 
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
  ];

  recipesChanged = new Subject<Recipe[]>()
  // recipeSelected = new EventEmitter<Recipe>();
  recipeSelected = new Subject<Recipe>();

  constructor(private loggingService: LoggingService,
    private shoppingListService:ShoppingListService) {
    this.loggingService.logInBold('RecipeService.constructor()', 'red')
  }

  getRecipe(index: number){ return this.recipes[index] }
  getRecipes() { return this.recipes.slice() }

  onAddIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.onIngredientsAdded(ingredients)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
