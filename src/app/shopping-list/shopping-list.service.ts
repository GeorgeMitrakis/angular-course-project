import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggingService } from '../logging.service';
import { RecipeService } from '../recipes/recipe.service';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientSelectedByIndex = new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 13),
    new Ingredient('Tomatoes', 6)
  ]

  constructor(private loggingService:LoggingService) {
    this.loggingService.log('ShoppingListService.constructor()', 'velvet', 'bold')
  }

  getIngredient(index: number){ return this.ingredients[index] }

  getIngredients() { return this.ingredients.slice()}

  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  onIngredientUpdated(index: number, updatedIngredient: Ingredient){
    this.ingredients[index] = updatedIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  onIngredientDeleted(index: number){
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  onIngredientSelectedByIndex(ingredientIndex: number){
    this.ingredientSelectedByIndex.next(ingredientIndex)
  }

  onIngredientsAdded(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
