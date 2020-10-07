import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[] = [
    new Ingredient('Node', 13),
    new Ingredient('npm', 6)
  ]

  constructor() { }

  onIngredientAdded(ingredient: Ingredient){
    this.ingredients.push(ingredient)
  }
}
