import { EventEmitter, Injectable } from '@angular/core';
import { LoggingService } from '../logging.service';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 13),
    new Ingredient('Tomatoes', 6)
  ]

  constructor(private loggingService:LoggingService) {
    this.loggingService.logInBold('ShoppingListService.constructor()', 'blue')
  }

  getIngredients() { return this.ingredients.slice()}

  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  onIngredientsAdded(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }
}
