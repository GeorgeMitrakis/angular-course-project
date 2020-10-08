import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredients: Ingredient[] = [
    new Ingredient('Node', 13),
    new Ingredient('npm', 6)
  ]

  constructor() { }

  getIngredients() { return this.ingredients.slice()}

  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }
}
